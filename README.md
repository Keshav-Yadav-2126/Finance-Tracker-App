# 💰 Personal Finance Tracker

A modern and responsive frontend-only **Finance Tracker App** built with **React.js**, designed to help users manage their income and expenses efficiently. This project showcases practical use of authentication, state management, data visualization, and user-friendly forms.

## 🚀 Live Demo

👉 [Check it out on Netlify](https://fabulous-empanada-bcc330.netlify.app/)

---

## 🔥 Features

- 🔐 **User Authentication**  
  Simulated with `localStorage` and route protection.

- 💳 **Transaction Management**  
  Add, edit, and delete **income** and **expense** transactions with real-time balance calculation.

- 📅 **Smart Filters**  
  Filter transactions by:
  - **Month**
  - **Type** (Income / Expense)

- 📊 **Data Visualization**  
  Visual summary with a **Pie Chart** (via Chart.js) to compare income vs expense.

- 🧠 **Global State Management**  
  Built using **Zustand** for a lightweight, fast, and scalable global state.

- ✅ **Form Validation**  
  Handled using **Zod** and **React Hook Form** to ensure secure and reliable input.

- 💾 **Persistent Data**  
  Stored locally using `localStorage` to simulate backend interaction.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Form Validation**: React Hook Form + Zod
- **Charts**: Chart.js
- **Styling**: CSS Modules / Custom Styling
- **Deployment**: Netlify

---

## 📁 Folder Structure

react-finance-tracker/
│
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Login, Register, Dashboard, etc.
│ ├── store/ # Zustand state management
│ ├── utils/ # Utility functions
│ ├── App.jsx
│ ├── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js

---

## 🧑‍💻 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Keshav-Yadav-2126/Finance-Tracker-App.git
cd react-finance-tracker

# Install dependencies
npm install

# Start the dev server
npm run dev

