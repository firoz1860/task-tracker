# Submission Checklist

Use this before submitting the project.

## Required Features

- [x] Backend implementation
- [x] MongoDB database persistence
- [x] Signup API
- [x] Login API
- [x] JWT authentication
- [x] Protected task APIs
- [x] Create task
- [x] Edit task
- [x] Delete task
- [x] Mark task completed or pending
- [x] Filter tasks by All, Pending, and Completed
- [x] Persist login session on mobile
- [x] Profile screen with task stats
- [x] Better frontend and backend folder structure
- [x] README with setup steps
- [x] README with frontend and backend run commands
- [x] Demo video script

## Before Uploading To GitHub

- [ ] Remove real secrets from `.env`
- [ ] Keep `.env.example`
- [ ] Run backend typecheck
- [ ] Run mobile typecheck
- [ ] Test signup and login
- [ ] Test create, edit, complete, filter, and delete tasks
- [ ] Record demo video
- [ ] Add demo video link to README

## Commands

```bash
npm run typecheck
```

```bash
git init
git add .
git commit -m "Complete full-stack task tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/task-tracker.git
git push -u origin main
```
