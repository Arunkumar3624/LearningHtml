// Predefined list of users (in memory)
let users = [
  { username: "arun", email: "arun@example.com", password: "1234" },
  { username: "gokul", email: "gokul@example.com", password: "abcd" },
  { username: "kumar", email: "kumar@example.com", password: "pass" },
  { username: "guru", email: "guru@example.com", password: "1111" },
];

// Try to load existing users from localStorage (persistent)
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

// ----- TAB SWITCH -----
const loginTab = document.getElementById("login-Tab");
const signupTab = document.getElementById("Signin-Tab");
const loginForm = document.getElementById("login-page");
const signupForm = document.getElementById("signup-form");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
});

// ----- LOGIN FORM -----
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const loginObj = Object.fromEntries(formData.entries());

  console.log("🟢 Login Attempt:", loginObj);

  const userFound = users.find(
    (u) =>
      u.email.toLowerCase() === loginObj.email.toLowerCase() &&
      u.password === loginObj.password
  );

  if (userFound) {
    console.log(`✅ Login successful! Welcome, ${userFound.username}!`);
  } else {
    console.log("❌ Invalid email or password. Please try again.");
  }

  console.log("📘 Current users list:", JSON.stringify(users, null, 2));
  loginForm.reset();
});

// ----- SIGNUP FORM -----
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newUser = Object.fromEntries(formData.entries());

  console.log("🟡 Signup Attempt:", newUser);

  const usernameExists = users.some(
    (u) => u.username.toLowerCase() === newUser.username.toLowerCase()
  );

  if (usernameExists) {
    console.log("⚠️ Username already exists. Please login instead.");
  } else {
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("✅ Registration successful!");
    console.log("📗 Updated users list:", JSON.stringify(users, null, 2));
  }

  signupForm.reset();
});
