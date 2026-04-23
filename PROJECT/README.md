# 💼 Job Portal Web Application

A full-stack Job Portal system where users can register, login, view jobs, and apply. Built using HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

---

## 🚀 Features

### 👨‍💻 User Features

* User Registration & Login
* View available jobs
* Apply for jobs (connected to backend)
* Interactive frontend using JavaScript

### ⚙️ Backend Features

* REST API using Express.js
* MongoDB database integration
* Stores application data
* Duplicate application handling

---

## 🛠️ Tech Stack

**Frontend:**

* HTML
* CSS
* JavaScript

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Mongoose)

---

## 📁 Project Structure

```
PROJECT/
│
├── Frontend/
│   ├── apply.html
│   ├── first.html
│   ├── job.html
│   ├── login.html
│   ├── register.html
│   ├── style.css
│   └── script.js
│
├── job-backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---
⚡ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/job-portal.git
cd job-portal
2️⃣ Install Backend Dependencies
cd job-backend
npm install
3️⃣ Setup MongoDB

Update your MongoDB connection string inside server.js (or config file if used):

mongoose.connect("mongodb://127.0.0.1:27017/jobportal")
4️⃣ Run Backend Server
node server.js

Server runs at:

http://localhost:5000
5️⃣ Run Frontend

Open this file in browser:

Frontend/first.html
📡 API Endpoint
Apply Job
POST /apply
Sample Request
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "company": "ABC Pvt Ltd",
  "post": "Frontend Developer"
}
🧠 Key Logic

Prevent duplicate applications:

const alreadyApplied = await Application.findOne({
  email,
  company,
  post
});
📌 Future Improvements
🔐 Authentication with JWT
📊 Admin Dashboard
🔍 Job Search & Filters
📱 Responsive Design
☁️ Deployment (Render / Vercel / MongoDB Atlas)
🤝 Contribution

Feel free to contribute:

Fork the repository
Create a new branch
Commit your changes
Push and open a Pull Request
📜 License

This project is licensed under the MIT License.

👨‍💻 Author

S.V.R. Monish
Project: Job Portal System
Initiative: Agrivikas
