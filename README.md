# Blog Post API

A RESTful backend API for a blog platform built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. Users can register, log in, create posts, and interact through comments.

---

## Features

- JWT Authentication & Authorization
- User registration & login
- Blog post CRUD (owner-only modifications)
- Comment system (owner-only modifications)
- Public Postman API documentation
- Centralized error handling
- Production-ready project structure

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Docs | Postman |

---

## Project Structure

```
server/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── commentController.js   # Comment logic
│   ├── postController.js      # Post logic
│   └── userController.js      # User logic
├── middleware/
│   ├── authorize.js           # Ownership authorization
│   ├── errorHandler.js        # Centralized error handling
│   └── protect.js             # JWT authentication guard
├── models/
│   ├── Comment.js             # Comment schema
│   ├── Post.js                # Post schema
│   └── User.js                # User schema
├── routes/
│   ├── postRoutes.js          # Post & comment routes
│   └── userRoutes.js          # User routes
├── utils/
│   └── generateToken.js       # JWT token utility
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── server.js                  # App entry point
```

---

## API Documentation

Full documentation with example requests, responses, authentication setup, and environment variables is available on Postman:

*[View Postman Docs](https://documenter.getpostman.com/view/51751420/2sBXcHieYs)**

---

## Authentication

Protected routes require a valid JWT token passed in the request header:

```http
Authorization: Bearer <your_token>
```

Obtain a token by logging in via `POST /users/login`.

---

## API Endpoints

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/users/register` | Register a new user | ❌ |
| `POST` | `/users/login` | Login and receive JWT | ❌ |
| `GET` | `/users/profile` | Get current user profile | ✅ |

### Posts

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/posts` | Get all posts | ❌ |
| `POST` | `/posts` | Create a new post | ✅ |
| `PATCH` | `/posts/:postId` | Update a post | ✅ Owner only |
| `DELETE` | `/posts/:postId` | Delete a post | ✅ Owner / Adminonly |

### Comments

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/posts/:postId/comments` | Get all comments on a post | ❌ |
| `POST` | `/posts/:postId/comments` | Add a comment | ✅ |
| `PATCH` | `/posts/:postId/comments/:commentId` | Update a comment | ✅ Owner only |
| `DELETE` | `/posts/:postId/comments/:commentId` | Delete a comment | ✅ Owner / Admin only |

---

## Authorization Rules

| Resource | Public Read | Modify |
|---|---|---|
| Posts | ✅ | Owner only |
| Comments | ✅ | Owner only |
| User profile | 🔒 Auth required | Owner only |

---

## Error Response Format

All errors return a consistent JSON structure:

```json
{
  "success": false,
  "message": "Descriptive error message here"
}
```
