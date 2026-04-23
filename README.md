# Employee Management App

I built this while learning full-stack development as part of my Coursera course. It's a basic CRUD app where you can manage employee records — add, edit, delete, and view them.

## Features

- add employees
- edit employees
- delete employees
- view all employees

## Tech Used

- Node.js + Express
- MongoDB Atlas + Mongoose
- EJS templates
- Bootstrap 5

## Run Locally

Create a `.env` file first:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Then:

```
npm install
npm run dev
```

Open: http://localhost:3000/employees

## Run with Docker

```
docker build -t employee-app .
docker run -p 3000:3000 -e MONGO_URI="your_mongodb_connection_string" employee-app
```

Docker was new to me but I got it working. The `.env` file isn't copied into the image so you pass the URI directly when running the container.

## What I Learned

I ran into some issues with the MongoDB connection and understanding how Mongoose schemas work. Routing also took a bit to get right. The other tricky part was PUT and DELETE — HTML forms don't support those methods so I had to use a package called `method-override` to work around it.

---

Made by Juan Carlos Concepcion Ametller
