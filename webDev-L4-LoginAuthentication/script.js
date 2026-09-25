// Get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


// SHA-256 password hashing
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


// =========================
// Registration
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("registerUsername").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const errorMessage =
            document.getElementById("registerError");

        const successMessage =
            document.getElementById("registerSuccess");

        errorMessage.textContent = "";
        successMessage.textContent = "";


        // Empty field validation
        if (!username || !email || !password) {
            errorMessage.textContent =
                "Please fill in all fields.";
            return;
        }


        // Password validation
        if (password.length < 8) {
            errorMessage.textContent =
                "Password must be at least 8 characters long.";
            return;
        }

        if (!/\d/.test(password)) {
            errorMessage.textContent =
                "Password must contain at least one number.";
            return;
        }


        // Get existing users
        const users = getUsers();


        // Duplicate username/email check
        const userExists = users.some(user =>
            user.username.toLowerCase() === username.toLowerCase() ||
            user.email.toLowerCase() === email.toLowerCase()
        );

        if (userExists) {
            errorMessage.textContent =
                "Username or email already exists.";
            return;
        }


        // Hash password
        const hashedPassword = await hashPassword(password);


        // Create user
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword
        };


        // Save user
        users.push(newUser);
        saveUsers(users);


        successMessage.textContent =
            "Registration successful! Redirecting to login...";


        // Clear form
        registerForm.reset();


        // Redirect
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}


// =========================
// Login
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const identifier =
            document.getElementById("loginIdentifier").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const errorMessage =
            document.getElementById("loginError");

        errorMessage.textContent = "";


        // Empty field validation
        if (!identifier || !password) {
            errorMessage.textContent =
                "Please fill in all fields.";
            return;
        }


        // Get users
        const users = getUsers();


        // Hash entered password
        const hashedPassword = await hashPassword(password);


        // Find matching user
        const user = users.find(user =>
            (
                user.username.toLowerCase() ===
                identifier.toLowerCase() ||
                user.email.toLowerCase() ===
                identifier.toLowerCase()
            ) &&
            user.password === hashedPassword
        );


        // Incorrect credentials
        if (!user) {
            errorMessage.textContent =
                "Invalid username/email or password.";
            return;
        }


        // Create login session
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                username: user.username,
                email: user.email
            })
        );


        // Redirect to dashboard
        window.location.href = "dashboard.html";
    });
}


// =========================
// Dashboard Protection
// =========================

if (window.location.pathname.endsWith("dashboard.html")) {

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));


    // Redirect if not logged in
    if (!loggedInUser) {
        window.location.href = "index.html";
    } else {

        const usernameElement =
            document.getElementById("username");

        if (usernameElement) {
            usernameElement.textContent =
                loggedInUser.username;
        }
    }
}


// =========================
// Logout
// =========================

const logoutButton =
    document.getElementById("logoutBtn");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        // Remove login session
        localStorage.removeItem("loggedInUser");

        // Redirect to login
        window.location.href = "index.html";
    });
}