import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginMessage = document.getElementById('login-message');

// 2. Settings for the Email Link
const actionCodeSettings = {
  // Replace this URL with your actual GitHub Pages URL once published!
  // For now, if testing locally, use your local live server URL.
  url: 'https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/index.html',
  handleCodeInApp: true,
};

// 3. Send the Magic Link
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    if (!email) return alert("Please enter your email.");

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email); // Save email for the return trip
        loginMessage.innerText = "Check your email! A login link has been sent.";
    } catch (error) {
        console.error("Error sending email: ", error);
        alert(error.message);
    }
});

// 4. Handle the return from the Magic Link
if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        email = window.prompt('Please provide your email for confirmation');
    }

    signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
        window.localStorage.removeItem('emailForSignIn');
        // Clear the URL to remove the ugly verification code
        window.history.replaceState(null, null, window.location.pathname);
    })
    .catch((error) => console.error("Error signing in: ", error));
}

// 5. Monitor Login State & Fetch Access
onAuthStateChanged(auth, async (user) => {
    if (user) {
        loginSection.style.display = 'none';
        quizSection.style.display = 'block';
        
        // Fetch their access rules from Firestore
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const studentData = docSnap.data();
            quizContainer.innerHTML = ""; // Clear existing buttons

            // Check Unit 1
            if (studentData.access.unit1) {
                quizContainer.innerHTML += `<a href="unit1-quiz.html"><button>Take Unit 1 Quiz</button></a>`;
            }
            // Check Unit 2
            if (studentData.access.unit2) {
                quizContainer.innerHTML += `<a href="unit2-quiz.html"><button>Take Unit 2 Quiz</button></a>`;
            }

            if(quizContainer.innerHTML === "") {
                quizContainer.innerHTML = "<p>You do not currently have access to any quizzes. Please ask your teacher.</p>";
            }

        } else {
            quizContainer.innerHTML = "<p>Your email is not in the student database. Contact your teacher.</p>";
        }
    } else {
        loginSection.style.display = 'block';
        quizSection.style.display = 'none';
    }
});

// 6. Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});
