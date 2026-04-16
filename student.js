import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1. PASTE YOUR CONFIG HERE
 const firebaseConfig = {
    apiKey: "AIzaSyCjpG0uEfQOhnBoTD80cE--KInyg7rh6vQ",
    authDomain: "ap-precalc.firebaseapp.com",
    projectId: "ap-precalc",
    storageBucket: "ap-precalc.firebasestorage.app",
    messagingSenderId: "50281949647",
    appId: "1:50281949647:web:c2c0eff68b2d0fa5d24aba",
    measurementId: "G-Z5YBDNR3NZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginSection = document.getElementById('login-section');
const quizSection = document.getElementById('quiz-section');
const quizContainer = document.getElementById('quiz-container');
const emailInput = document.getElementById('student-email');
const passwordInput = document.getElementById('student-password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginMessage = document.getElementById('login-message');

// 2. Handle First-Time Sign Up
signupBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || password.length < 6) {
        return loginMessage.innerText = "Please enter an email and a password (at least 6 characters).";
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        loginMessage.style.color = "green";
        loginMessage.innerText = "Account created successfully!";
    } catch (error) {
        loginMessage.style.color = "red";
        loginMessage.innerText = error.message; // Shows if email is already in use, etc.
    }
});

// 3. Handle Returning User Log In
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        return loginMessage.innerText = "Please enter both email and password.";
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginMessage.innerText = ""; // Clear errors on success
    } catch (error) {
        loginMessage.style.color = "red";
        loginMessage.innerText = "Invalid email or password.";
    }
});

// 4. Monitor Login State & Fetch Access (This remains exactly the same!)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // SUCCESS: They are on your Admin list!
            loginSection.style.display = 'none';
            quizSection.style.display = 'block';
            
            const studentData = docSnap.data();
            quizContainer.innerHTML = ""; 

            if (studentData.access.unit1) {
                quizContainer.innerHTML += `<a href="unit1-quiz.html"><button>Take Unit 1 Quiz</button></a>`;
            }
            if (studentData.access.unit2) {
                quizContainer.innerHTML += `<a href="unit2-quiz.html"><button>Take Unit 2 Quiz</button></a>`;
            }
            if(quizContainer.innerHTML === "") {
                quizContainer.innerHTML = "<p>You do not currently have access to any quizzes. Please ask your teacher.</p>";
            }
        } else {
            // FAILED: They logged in, but are NOT on your Admin list.
            signOut(auth);
            loginMessage.style.color = "red";
            loginMessage.innerText = "Access Denied: Your email is not authorized by the teacher.";
            loginSection.style.display = 'block';
            quizSection.style.display = 'none';
        }
    } else {
        loginSection.style.display = 'block';
        quizSection.style.display = 'none';
    }
});

// 5. Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth);
    emailInput.value = "";
    passwordInput.value = "";
});
