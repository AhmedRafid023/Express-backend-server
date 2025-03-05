# 🎬 Matrix Backend - Movie Website API

This is the backend server for the **Matrix** movie website, built using **Node.js, Express.js, and MongoDB**.

## 🚀 Live API
🔗 [Express Backend Server](https://express-backend-server-omega.vercel.app/)

## 🛠️ Tech Stack
- **Hosting:** Vercel ☁️
- **Node.js** ⚡
- **Express.js** 🚀
- **MongoDB & Mongoose** 📦
- **JWT Authentication** 🔐
- **CORS & Dotenv** 🌍

## 📦 Installation

Clone the repository:
```sh
git clone https://github.com/AhmedRafid023/Express-backend-server.git
cd matrix-backend
```

Install dependencies:
```sh
npm install
```

Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the development server:
```sh
npm run devStart
```

## 📌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Movies
- `GET /api/movies` - Fetch all movies
- `GET /api/movies/:id` - Get details of a specific movie

### User Watchlist
- `POST /api/watchlist` - Add a movie to watchlist
- `GET /api/watchlist` - Get user’s watchlist
- `DELETE /api/watchlist/:id` - Remove a movie from watchlist

## 🤝 Contributing
Contributions are welcome! Feel free to fork the project and submit a PR.

## 📜 License
MIT License © 2025 Ahmed Rafid



