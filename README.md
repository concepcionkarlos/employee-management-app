# Employee Management App

This is a CRUD web app I built as part of my Coursera full-stack course. It lets you add, view, edit, and delete employee records. Nothing too fancy, but it covers the full stack from the database to the UI.

---

## What it does

- Add new employees
- See a list of all employees
- Edit their info
- Delete them

---

## Tech I used

- Node.js + Express for the backend
- MongoDB Atlas as the database
- Mongoose to connect and work with MongoDB
- EJS to render the HTML pages
- Bootstrap 5 for basic styling
- method-override so forms can send PUT and DELETE requests

---

## How to run it locally

1. Clone the repo:
   ```
   git clone https://github.com/concepcionkarlos/employee-management-app.git
   cd employee-management-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root with your MongoDB connection string:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_atlas_connection_string_here
   ```

4. Start the dev server:
   ```
   npm run dev
   ```

5. Open `http://localhost:3000/employees` in your browser.

---

## Things I learned

- How to set up an Express server from scratch
- Connecting to MongoDB Atlas with Mongoose
- Using EJS templates to render dynamic content
- How method-override works (browsers only support GET and POST in forms)
- Basic server-side validation before saving to the database
- Keeping secrets out of Git with `.env` and `.gitignore`

---

## Challenges

The trickiest part was getting PUT and DELETE to work through HTML forms since browsers don't support those methods natively. `method-override` solved that.

Also took me a while to understand how Mongoose schemas work and when to add `{ timestamps: true }`.

---

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | /employees | List all employees |
| GET | /employees/new | Show the add form |
| POST | /employees | Save a new employee |
| GET | /employees/:id/edit | Show the edit form |
| PUT | /employees/:id | Update an employee |
| DELETE | /employees/:id | Delete an employee |

---

Made by Juan Carlos Concepcion Ametller
