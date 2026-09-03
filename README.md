# Campus Lost & Found — Backend (Server)

REST API for the Campus Lost & Found platform, built with a **feature-based architecture** using Node.js, Express, and MongoDB.

---

## 🚀 How to Download & Run

### 1. Clone the repository
```bash
git clone https://github.com/Coder-Stark/campus-lost-found-backend.git
cd campus-lost-found/server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root of the `server` folder (see `.env.sample` for reference) and add the following:

```dotenv
PORT=5000
CLIENT_URLS=http://localhost:5173,https://campusfindhub.netlify.app
MONGODB_URI=mongodb+srv://shivamkumar:lms@cluster0.x8a1c.mongodb.net/campus_lost_found?retryWrites=true&w=majority&appName=Cluster0
```

> ⚠️ **Note:** This project requires a live MongoDB connection to run, so instead of pushing a real `.env` file to the repo (it's gitignored), the working values are documented here for convenience. If this repo is ever made public, rotate the MongoDB password first.

### 4. Run the server
```bash
# Development (auto-restarts with nodemon)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`.

### Test endpoints
```
GET  http://localhost:5000/api/items
POST http://localhost:5000/api/items
```

A Postman collection was extracted into `campusLostFound_API.md` for testing.

---

## 📁 Directory Structure

```
node_modules
src
 ┣ config
 ┃ ┗ database.js
 ┣ features
 ┃ ┣ additionalFeatures
 ┃ ┗ items
 ┃ ┃ ┣ item.controller.js
 ┃ ┃ ┣ item.model.js
 ┃ ┃ ┣ item.routes.js
 ┃ ┃ ┣ item.service.js
 ┃ ┃ ┗ item.validation.js
 ┣ middleware
 ┃ ┣ errorHandler.js
 ┃ ┣ notFound.js
 ┃ ┗ validate.js
 ┣ app.js
 ┗ server.js
.env
.env.sample
.gitignore
directoryTree.js
howIDoIt-Backend.txt
package-lock.json
package.json
```

## 📦 `package.json`

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mongoose": "^9.9.4",
    "zod": "^4.5.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

---

## 🛠️ How I Built It (Process)

### 1. Project Setup
- Created the main `campus-lost-found` folder with two sub-folders: `client` and `server`.
- Decided to build the backend first, then the frontend.

### 2. Backend Initialization
- `cd server` and ran `npm init -y`.
- Installed dependencies:
  - `express` — API framework
  - `mongoose` — for defining models
  - `cors` — for connecting frontend and backend
  - `dotenv` — for keeping env variables secure
  - `zod` — for input validation
- Installed as a dev dependency:
  - `nodemon` — auto-restarts the server on changes (not needed in production)

### 3. Architecture Decision
- Chose **feature-based architecture** over the conventional (MVC-style) layout, so all logic for a feature (e.g. `items`) lives together in one folder.
- Updated `package.json` scripts:
  ```json
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
  ```
- Scaffolded the initial folders: `src/config`, `src/features/items`, `src/middleware`, `src/app.js`, `src/server.js`.

### 4. Server Setup
- Set up `.env` with the required environment variables.
- Updated `package.json` with `"type": "module"` to use ES module `import`/`export` syntax (chosen for consistency with the frontend and modern JS conventions).
- Created `app.js` — defines what the application does (root endpoints).
- Created `server.js` — defines how the application starts.
- Created a new MongoDB Atlas cluster and connected using the existing connection string with a new database name.

### 5. Items Feature Implementation
Built out the `items` feature end-to-end:
1. `item.model.js` — Mongoose schema definition.
2. `item.validation.js` — Zod schemas for API-level input validation.
3. `item.service.js` — core business logic.
4. `item.controller.js` — handles HTTP requests.
5. `item.routes.js` — maps URLs to controller actions.
6. Wired the feature into `app.js`.
7. Verified via Postman on two endpoints:
   - `GET /api/items`
   - `POST /api/items`
8. Confirmed data was persisting correctly in MongoDB and responses were valid in Postman.

### 6. Validation Middleware + Centralized Error Handling
- Created `middleware/validate.js` and wired it into the `items` create route (`validate(createItemSchema)`).
- Tested:
  - ❌ Invalid input → proper `400` response
  - ❌ Invalid type → proper `400` response
  - ❌ Empty strings → proper `400` response
  - ✅ Valid data → proper `201 Created` response
- Added centralized error handling for unexpected errors:
  - `middleware/errorHandler.js` — wired into `app.js`.
  - `middleware/notFound.js` — handles unknown routes with a valid response, wired into `app.js`.

With this, the backend was considered feature-complete and stable.

---

## ☁️ Deployment

### Render (Backend)
1. Connected the GitHub repository to Render.
2. Added the required environment variables in the Render dashboard.
3. Updated the start command path from `node index.js` → `node src/server.js`.

### Betterstack
- Configured to hit the `/health` endpoint periodically, keeping the Render server awake (avoiding cold starts on the free tier).