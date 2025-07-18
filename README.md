
# 🩺 Serenaid – Smart Hospital Alarm Management System

Serenaid is a modern, full-stack hospital alarm system that ensures safe, rapid, and intelligent communication between **patients, nurses, and doctors**. Designed to minimize alarm fatigue and maximize care, Serenaid brings clarity and calmness to hospital alert systems.

---

## 🚀 Features

 - **Real-Time Alarms** – Trigger and track alerts instantly across user roles
 - **Care-Focused Design** – Prioritizes meaningful alerts and patient well-being
 - **Role-Based Dashboards** – Separate panels for **Doctor**, **Nurse**, and **Admin**
 - **Secure Access** – Authenticated user flows for patient data protection
 - **Responsive UI** – Optimized for mobile and desktop with modern design
 - **Live Notifications** – New alarms update dashboards in real-time

---

## 🛠️ Tech Stack

### Frontend
- **React.js + Vite**
- **Framer Motion** for animations
- **Tailwind CSS** with **DaisyUI**
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js + Express.js**
- **MongoDB** with **Mongoose**
- **SupaBase** for authentication

---

## 📦 Installation

### Prerequisites
- Node.js v18+
- MongoDB installed locally or cloud URI

### Clone the repo
```bash
git clone https://github.com/Parvesh2005/serenaid.git
cd serenaid
```

### Install dependencies

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Backend**
```bash
cd backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_PORT=5000
```

---

## 📁 Folder Structure

```
serenaid/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── index.html
└── README.md
```
