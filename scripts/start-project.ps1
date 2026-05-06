param(
  [string]$AvdName = "Pixel_3a_XL_API_28",
  [int]$BackendPort = 5000,
  [int]$MetroPort = 8081
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$BackendDir = Join-Path $Root "backend"
$MobileDir = Join-Path $Root "mobile"
$BackendHealthUrl = "http://localhost:$BackendPort/health"

function Test-Backend {
  try {
    $response = Invoke-RestMethod -Uri $BackendHealthUrl -TimeoutSec 3
    return $response.success -eq $true
  } catch {
    return $false
  }
}

function Wait-Backend {
  $deadline = (Get-Date).AddSeconds(60)
  while ((Get-Date) -lt $deadline) {
    if (Test-Backend) {
      Write-Host "Backend is ready at $BackendHealthUrl"
      return
    }
    Start-Sleep -Seconds 2
  }
  throw "Backend did not become ready at $BackendHealthUrl"
}

function Get-AdbDevices {
  adb devices | Select-Object -Skip 1 | Where-Object { $_.Trim() }
}

function Wait-Android {
  Write-Host "Waiting for Android emulator..."
  adb wait-for-device

  $deadline = (Get-Date).AddSeconds(180)
  while ((Get-Date) -lt $deadline) {
    $bootCompleted = (adb shell getprop sys.boot_completed 2>$null).Trim()
    $packageService = adb shell service check package 2>$null

    if ($bootCompleted -eq "1" -and $packageService -match "found") {
      Write-Host "Android is fully booted."
      return
    }

    Start-Sleep -Seconds 3
  }

  throw "Android booted too slowly. Wait for the home screen, then run this script again."
}

Write-Host "Starting Task Tracker..."

adb start-server | Out-Null
$devices = Get-AdbDevices
$hasReadyDevice = $devices -match "\sdevice$"
$hasOfflineDevice = $devices -match "\soffline$"

if ($hasOfflineDevice) {
  Write-Host "Found an offline emulator. Restarting Android emulator state..."
  Get-Process | Where-Object { $_.ProcessName -match "emulator|qemu" } | Stop-Process -Force
  adb kill-server | Out-Null
  Start-Sleep -Seconds 3
  adb start-server | Out-Null
  $hasReadyDevice = $false
}

if (-not $hasReadyDevice) {
  Write-Host "Launching Android emulator: $AvdName"
  Start-Process -FilePath "emulator" -ArgumentList "-avd", $AvdName, "-no-snapshot-load" -WindowStyle Hidden
}

Wait-Android

if (-not (Test-Backend)) {
  Write-Host "Starting backend server..."
  Start-Process -FilePath "powershell" -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "cd `"$BackendDir`"; npm run dev" -WindowStyle Hidden
}

Wait-Backend

adb reverse "tcp:$MetroPort" "tcp:$MetroPort" | Out-Null
Write-Host "ADB reverse set: tcp:$MetroPort -> tcp:$MetroPort"

Set-Location $MobileDir
Write-Host "Starting Expo..."
npx expo start -c --android
