# 📧 AI Email Sender

AI Email Sender is a full-stack application that generates professional emails using AI and sends them to multiple recipients via Gmail SMTP.
It has a **React + Vite** frontend and a **Node.js** backend.

---

## 🚀 Features

* ✨ AI-powered email content generation
* 📩 Send emails to multiple recipients
* 🔑 Secure API key management using `.env`
* 🌐 Full-stack deployment support on **Render**
* 🔒 SMTP authentication using Gmail App Password
* 🛠️ Modern UI built with React and Tailwind

---

## 📂 Project Structure

```
insta-ai-mail/
│── server/                # Backend service
│   ├── email.js           # Express server for sending emails
│   ├── package.json       # Backend dependencies
│── src/                   # React frontend source
│── public/                # Static assets
│── .env                   # Environment variables
│── package.json           # Frontend dependencies
│── vite.config.ts         # Vite config
│── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **root directory**:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME=AI Mailer

# AI Service Key
VITE_GROQ_API_KEY=your_groq_api_key
```

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/AI_EMAIL_SENDER.git
cd insta-ai-mail
```

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

---

## 🏃‍♂️ Running Locally

### Start Backend Server

```bash
cd server
node email.js
```

Runs on **[http://localhost:5000](http://localhost:5000)**

### Start Frontend

```bash
npm run dev
```

Runs on **[http://localhost:5173](http://localhost:5173)**

---

## 🚀 Deployment (Render)

### Deploy Backend

1. Go to [Render](https://render.com)
2. Create a new **Web Service**
3. Select the `server/` folder
4. Set **Start Command:**

   ```bash
   node email.js
   ```
5. Add environment variables from `.env`

### Deploy Frontend

1. Create another **Static Site** on Render
2. Set **Build Command:**

   ```bash
   npm install && npm run build
   ```
3. Set **Publish Directory:**

   ```
   dist
   ```
4. Add only `VITE_GROQ_API_KEY` in environment variables

---

## 📝 Scripts

### Frontend

```bash
npm run dev      # Development
npm run build    # Production build
npm run preview  # Preview production build
```

### Backend

```bash
node email.js    # Start email server
```

---

## 📌 Notes

* Ensure `.env` is **not committed** to GitHub
* Use a **Gmail App Password** (not your main password)
* The app automatically fetches the API key from `.env` (no manual input required)

---

Would you like me to also add **backend URL auto-switching** (localhost vs Render) in `src/services/emailService.ts` so you don’t have to manually change it during deployment?
