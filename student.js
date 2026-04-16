// student.js

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

// DOM Elements
const loginSection = document.getElementById('login-section');
const quizSection = document.getElementById('quiz-section');
const dashboardContent = document.getElementById('dashboard-content');
const emailInput = document.getElementById('student-email');
const passwordInput = document.getElementById('student-password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginMessage = document.getElementById('login-message');

// Naming guide for the cards (You can customize these later!)
const unitTitles = {
    1: "Polynomial & Rational Functions",
    2: "Exponential & Logarithmic Functions",
    3: "Trigonometric & Polar Functions",
    4: "Parameters, Vectors & Matrices"
};

// Handle Sign Up
signupBtn.addEventListener('click', async () => {
    try {
        await createUserWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
    } catch (error) { loginMessage.innerText = error.message; }
});

// Handle Log In
loginBtn.addEventListener('click', async () => {
    try {
        await signInWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
    } catch (error) { loginMessage.innerText = "Invalid email or password."; }
});

// Handle Log Out
logoutBtn.addEventListener('click', () => signOut(auth));

// Monitor Login State & Build the Beautiful Dashboard
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // SUCCESS! Let them in.
            loginSection.style.display = 'none';
            quizSection.style.display = 'block';
            logoutBtn.style.display = 'block';
            
            const studentData = docSnap.data();
            dashboardContent.innerHTML = ""; 
            let hasAnyQuizzes = false;

            // Loop through Units 1 to 4
            for (let unit = 1; unit <= 4; unit++) {
                let unitCardsHTML = "";
                
                // Loop through all possible sub-units (up to 15)
                for(let sub = 1; sub <= 15; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    
                    // If the student has access to this specific sub-unit, generate a card!
                    if (studentData.access && studentData.access[unitKey]) {
                        hasAnyQuizzes = true;
                        unitCardsHTML += `
                            <div class="quiz-card">
                                <h3>Unit ${unit}.${sub}</h3>
                                <p>Test your knowledge on Topic ${unit}.${sub}.</p>
                                <a href="unit${unit}-${sub}-quiz.html">Start Quiz &rarr;</a> 
                            </div>
                        `;
                    }
                }

                // If they had access to any quizzes in this Unit, draw the Grid for it
                if (unitCardsHTML !== "") {
                    dashboardContent.innerHTML += `
                        <h3 class="unit-header">Unit ${unit}: ${unitTitles[unit]}</h3>
                        <div class="grid">
                            ${unitCardsHTML}
                        </div>
                    `;
                }
            }

            if(!hasAnyQuizzes) {
                dashboardContent.innerHTML = `<div class="quiz-card" style="border-top-color:#e74c3c;"><h3>No Active Quizzes</h3><p>Your teacher has not unlocked any quizzes for you yet. Check back soon!</p></div>`;
            }

        } else {
            // FAILED: Not on the Admin list.
            signOut(auth);
            loginMessage.innerText = "Access Denied: Your email is not authorized by the teacher.";
        }
    } else {
        // Logged out state
        loginSection.style.display = 'block';
        quizSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        emailInput.value = ""; passwordInput.value = "";
    }
});
