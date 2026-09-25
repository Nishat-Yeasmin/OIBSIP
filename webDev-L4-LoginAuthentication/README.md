# 🔐 Login Authentication System

A simple client-side authentication system built using **HTML, CSS, and Vanilla JavaScript**. The application supports user registration, password validation, secure password hashing, login authentication, protected dashboard access, and logout functionality.

## 🚀 Live Demo

**Live Demo:** Add your deployed Vercel/GitHub Pages link here

## 📌 Features

* User registration with username, email, and password
* Password validation

  * Minimum 8 characters
  * At least 1 number
* Duplicate username/email detection
* User login with username or email
* Secure SHA-256 password hashing
* Clear error message for invalid credentials
* Protected dashboard page
* Automatic redirect to login when accessing the dashboard without authentication
* Logout functionality
* Session management using `localStorage`
* Empty form validation
* Responsive design for desktop and mobile devices

## 🛠️ Technologies Used

* **HTML5** — Page structure
* **CSS3** — Styling and responsive design
* **JavaScript (Vanilla JS)** — Authentication logic and form validation
* **Web Crypto API** — SHA-256 password hashing
* **localStorage** — Client-side user and session storage

## 📂 Project Structure

```text
login-authentication-system/
│
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── script.js
└── README.md
```

## 🔑 How It Works

### 1. Registration

Users can create an account by providing:

* Username
* Email
* Password

The password must contain at least 8 characters and one number.

Before creating the account, the system checks whether the username or email already exists.

The password is hashed using **SHA-256** before being stored in `localStorage`.

### 2. Login

Users can log in using either their:

* Username
* Email

The entered password is hashed and compared with the stored hash.

If the credentials are incorrect, the system displays:

> Invalid username/email or password.

### 3. Protected Dashboard

After successful login, the user is redirected to the dashboard.

The dashboard checks whether a valid login session exists. If no session is found, the user is automatically redirected to the login page.

### 4. Logout

Clicking the **Logout** button removes the active login session from `localStorage` and redirects the user to the login page.

## 💾 Local Storage

The application uses browser `localStorage` to store registered users and the current login session.

Example user data:

```json
{
  "username": "example",
  "email": "example@gmail.com",
  "password": "hashed-password"
}
```

Passwords are not stored as plain text.

## ▶️ How to Run Locally

### Step 1

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2

Open the project folder in VS Code.

### Step 3

Open `index.html` using **Live Server**.

Or simply open `index.html` directly in a browser.

### Step 4

Create an account from the registration page and test the login system.

## 🧪 Testing Checklist

* [x] Register with valid information
* [x] Reject empty registration fields
* [x] Reject passwords shorter than 8 characters
* [x] Reject passwords without a number
* [x] Detect duplicate username/email
* [x] Login with username
* [x] Login with email
* [x] Reject incorrect credentials
* [x] Protect dashboard from unauthorized access
* [x] Logout successfully
* [x] Clear login session after logout

## ⚠️ Note

This project is designed as a **client-side authentication demonstration** for learning and internship purposes.

Since it uses `localStorage`, it is **not suitable for production authentication**. A real-world authentication system should use a secure backend, database, password hashing such as bcrypt/Argon2, and secure HTTP-only cookies or server-side sessions.

## 👩‍💻 Author

**Nishat Yeasmin**

CSE Student | Junior Frontend Developer

GitHub: [Nishat-Yeasmin](https://github.com/Nishat-Yeasmin)
