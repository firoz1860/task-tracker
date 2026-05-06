# 20 Minute Demo Video Script

Use this as your spoken script while recording. You can shorten it if your teacher asks for a shorter video.

## 0:00 - 1:00 Introduction

Hello, my name is Firoz, and this is my full-stack Task Tracker project.

This project has two main parts. The frontend is a mobile app built with React Native, Expo, and TypeScript. The backend is built with Node.js, Express.js, TypeScript, MongoDB, and Mongoose.

The app allows a user to sign up, log in, create tasks, edit tasks, mark tasks as completed or pending, filter tasks, view profile statistics, and keep the login session saved even after closing the app.

## 1:00 - 2:30 Project Folder Structure

First, I will show the project structure.

At the root, there are two main folders: `backend` and `mobile`.

The `backend` folder contains the Express API. Inside `backend/src`, I have separate folders for config, controllers, middleware, models, routes, validators, and types.

This keeps the backend organized. Routes define the API paths, controllers contain the business logic, models define MongoDB schemas, middleware protects routes, and validators check user input.

The `mobile` folder contains the Expo React Native app. Inside `mobile/src`, I have folders for API calls, reusable components, hooks, navigation, screens, store, types, and utilities.

This structure makes the project easier to understand and maintain.

## 2:30 - 4:00 Backend Setup

Now I will explain the backend.

The backend uses Express.js and connects to MongoDB using Mongoose. The database connection is handled in the config folder.

The backend has authentication routes for signup and login. When a user signs up, the password is hashed using bcrypt before it is saved in MongoDB. This means the real password is never stored directly.

After signup or login, the backend returns a JWT token. The mobile app uses this token for protected task requests.

The task routes are protected by authentication middleware. A user can only access their own tasks.

## 4:00 - 5:30 Backend API Endpoints

The backend includes these main endpoints.

There is a health check endpoint: `GET /health`.

For authentication, there is `POST /auth/signup` and `POST /auth/login`.

For tasks, there is `GET /tasks` to get all tasks, `POST /tasks` to create a task, `PATCH /tasks/:id` to edit a task or update completion status, and `DELETE /tasks/:id` to delete a task.

There is also backend support for filtering tasks using query parameters. For example, `GET /tasks?status=pending` returns pending tasks, and `GET /tasks?status=completed` returns completed tasks.

## 5:30 - 7:00 Starting Backend And Mobile

To run the backend, I go into the backend folder and run `npm install`, then create a `.env` file from `.env.example`.

The `.env` file contains the port, MongoDB connection string, JWT secret, token expiry, and CORS origin.

Then I start the backend using `npm run dev`.

To run the mobile app, I go into the mobile folder and run `npm install`. I create a `.env` file and set `EXPO_PUBLIC_API_URL`.

For the Android emulator, the API URL is `http://10.0.2.2:5000`, because the emulator uses `10.0.2.2` to access the computer localhost.

Then I run `npx expo start -c` and open the app on the Android emulator.

## 7:00 - 8:30 Signup

Now I will show signup.

On the signup screen, the user enters name, email, and password.

When I press Sign Up, the mobile app sends the details to the backend signup API.

The backend validates the input, checks if the email already exists, hashes the password, creates the user in MongoDB, and returns a JWT token.

The mobile app saves the token securely and moves the user into the task area.

## 8:30 - 10:00 Login And Persisted Session

Now I will show login and session persistence.

The login screen sends email and password to the backend. If the details are correct, the backend returns the user and token.

The mobile app stores the token using Expo SecureStore. This is better than keeping it only in memory because it survives app restarts.

When the app opens again, the auth store checks SecureStore for an existing token and user. If they exist, the app skips the login screen and opens the main task screen.

If the token becomes invalid or expired, the API interceptor handles a 401 response and logs the user out.

## 10:00 - 11:30 Create Task

Now I will create a task.

I open the Add tab or press the floating plus button.

The create task screen has a title field and a description field. The title is required, and the description is optional.

When I press Create Task, the mobile app sends a POST request to the backend.

The backend saves the task with the logged-in user's ID, so each task belongs to the correct user.

After the task is created, the app refreshes the task list and clears the create form, so the next task starts with blank fields.

## 11:30 - 13:00 Edit Task

Now I will show editing a task.

I tap a task from the task list. This opens the task details screen.

On the detail screen, I can see the task title, description, created date, updated date, and completion status.

When I press Edit, the form appears with the current title and description.

I can change the title or description and press Save Changes.

The mobile app sends a PATCH request to the backend, and the backend updates only the logged-in user's task.

After saving, the updated task appears in the list.

## 13:00 - 14:30 Complete And Pending Status

Now I will mark a task as completed.

On the task card, I can tap the circle icon. This sends an update request and changes `isCompleted`.

Completed tasks show a different visual style, including a check icon and crossed-out title.

I can also open the task details screen and press Mark Completed or Mark Pending.

This uses the same backend PATCH endpoint.

## 14:30 - 16:00 Filters

Now I will show filters.

At the top of the task list, there are three filters: All, Pending, and Completed.

All shows every task. Pending shows tasks where `isCompleted` is false. Completed shows tasks where `isCompleted` is true.

Each filter also shows a count, so the user can quickly see how many tasks are in each category.

The backend also supports pending and completed filtering with query parameters, which makes the API complete and ready for larger use cases.

## 16:00 - 17:00 Delete Task

Now I will delete a task.

Each task card has a delete icon. When I press it, the app asks for confirmation.

If I confirm, the mobile app sends a DELETE request to the backend.

The backend checks that the task belongs to the logged-in user and deletes it from MongoDB.

The task list updates after deletion.

## 17:00 - 18:00 Profile Screen

Now I will open the Profile tab.

The profile screen shows the logged-in user's name and email.

It also shows task progress, including total tasks, pending tasks, completed tasks, and completion percentage.

This gives the user a quick summary of their productivity.

There is also a Logout button. When the user logs out, the token and user data are cleared from SecureStore.

## 18:00 - 19:00 Code Quality And TypeScript

This project uses TypeScript in both frontend and backend.

The mobile app has typed navigation, typed API responses, typed task objects, and typed auth data.

The backend has typed Express handlers, typed JWT payloads, typed task and user models, and validation middleware.

I can run `npm run typecheck` from the root to check both mobile and backend.

This helps catch mistakes before running the app.

## 19:00 - 20:00 Conclusion

To summarize, this is a complete full-stack Task Tracker app.

It includes a mobile frontend, backend API, MongoDB database, authentication, persisted login session, full task CRUD, editing, filtering, profile stats, and organized folder structure.

The project is ready to upload to GitHub as a monorepo with both frontend and backend included.

Thank you for watching my demo.
