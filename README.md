# Employee Management App

A simple CRUD app I built for my Coursera full-stack course. You can add, edit, and delete employee records stored in MongoDB.

## Features

- add new employees
- edit existing employees
- delete employees
- view the full employee list

## Tech Used

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- EJS
- Bootstrap 5

## Run Locally

```
npm install
npm run dev
```

Then open: http://localhost:3000/employees

You'll need a `.env` file with your own MongoDB connection string:

```
PORT=3000
MONGO_URI=your_connection_string_here
```

## What I Learned

This was my first time connecting a Node app to a real cloud database. Setting up Mongoose and getting the schema right took some trial and error. I also learned how middleware works in Express and why the order you add it matters.

## Run with Docker

Build the image:

```
docker build -t employee-app .
```

Run the container (you need to pass your MongoDB URI since `.env` isn't included in the image):

```
docker run -p 3000:3000 -e MONGO_URI="your_connection_string_here" employee-app
```

Then open: http://localhost:3000/employees

## What I Learned

This was my first time connecting a Node app to a real cloud database. Setting up Mongoose and getting the schema right took some trial and error. I also learned how middleware works in Express and why the order you add it matters.

## Notes

The trickiest part was handling PUT and DELETE requests since HTML forms only support GET and POST. I used the `method-override` package to get around that — you pass `?_method=PUT` in the form action and it works.

---

Made by Juan Carlos Concepcion Ametller
