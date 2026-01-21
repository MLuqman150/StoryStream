# StoryStream

StoryStream is a **full‑stack blogging platform** built using the **MERN stack**. It allows users to write, publish, and engage with articles through a modern, interactive experience inspired by real‑world content platforms.

The project focuses on scalability, user engagement, and clean API design, making it a solid demonstration of full‑stack development skills.

---

## 🚀 Tech Stack

* **Frontend:** React, JavaScript, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)

---

## ✨ Features

* Infinite scroll on **Home** and **Following** feeds
* Rich text editor for creating articles
* User authentication (Login & Signup)
* Follow / Unfollow users
* Like, Dislike, Comment on articles
* Share articles
* Author profile pages
* Personalized feed based on following

> ⚠️ Comments are currently **non‑nested** (flat structure).

---

## 📄 Pages

* Login
* Signup
* Home
* Following
* Settings
* Article Details
* Create Article
* Author Details

---

## 🔮 Future Enhancements

* Nested comments
* Performance optimizations
* UI/UX improvements
* Admin portal
* Analytics dashboard for authors

---

## 🛠️ Installation & Setup

Follow the steps below to run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MLuqman150/StoryStream.git
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start in development mode.

---

### 3️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

## 🔐 Environment Variables (Backend)

Create a `.env` file inside the **backend** directory and add the following:

```env
DB_CONNECTION=<your_mongodb_connection_url>
JWT_SECRET=<your_jwt_secret>
ADMIN_EMAIL=<admin_email>
ADMIN_PASSWORD=<admin_password>
```

* The **admin account** will be automatically created when the server starts (if it does not already exist).

---

## 📌 Notes

* Ensure MongoDB is running or accessible via the provided connection URL.
* Both frontend and backend must be running simultaneously for the app to work correctly.

---

## 👨‍💻 Author

**Muhammad Luqman**
Software Engineer | MERN Stack Developer

---

## ⭐ Feedback

If you find this project useful or have suggestions for improvement, feel free to open an issue or give the repository a star.
