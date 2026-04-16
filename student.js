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

// Monitor Login State & Build the Advanced Dashboard
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            loginSection.style.display = 'none';
            quizSection.style.display = 'block';
            logoutBtn.style.display = 'block';
            
            const studentData = docSnap.data();
            dashboardContent.innerHTML = ""; 
            let hasAnyQuizzes = false;

            // Loop through Units 1 to 4
            for (let unit = 1; unit <= 4; unit++) {
                let unitCardsHTML = "";
                let masterUnlock = true; // Assume they have 80% until proven otherwise
                
                // Loop through all sub-units for this unit
                for(let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    
                    // Check if they scored at least 80%
                    const score = studentData.scores[unitKey] || 0;
                    if (score < 80) {
                        masterUnlock = false; // They failed to get 80% on this sub-unit
                    }
                    
                    if (studentData.access && studentData.access[unitKey]) {
                        hasAnyQuizzes = true;
                        unitCardsHTML += `
                            <div class="quiz-card">
                                <h3>Topic ${unit}.${sub}</h3>
                                <p style="color: #27ae60; font-weight: bold;">Current Score: ${score}%</p>
                                
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    <a href="unit${unit}-${sub}-easy.html" style="background-color: #2ecc71;">Easy Practice</a>
                                    <a href="unit${unit}-${sub}-med.html" style="background-color: #f39c12;">Medium Practice</a>
                                    <a href="unit${unit}-${sub}-hard.html" style="background-color: #e74c3c;">Hard Practice</a>
                                </div>
                            </div>
                        `;
                    }
                }

                // If they have quizzes, draw the grid AND the Master Exam Card
                if (unitCardsHTML !== "") {
                    // Generate the Master Exam Card based on the 80% rule
                    let masterCardHTML = "";
                    if (masterUnlock) {
                        masterCardHTML = `
                            <div class="quiz-card" style="border: 2px solid #9b59b6; background-color: #fdfaef;">
                                <h3 style="color: #8e44ad;">🏆 Unit ${unit} Master Exam</h3>
                                <p>You have mastered the fundamentals! Take the timed AP simulator.</p>
                                <a href="unit${unit}-master-exam.html" style="background-color: #8e44ad;">Start Timed Exam &rarr;</a>
                            </div>
                        `;
                    } else {
                        masterCardHTML = `
                            <div class="quiz-card" style="border: 2px dashed #bdc3c7; opacity: 0.7;">
                                <h3 style="color: #7f8c8d;">🔒 Unit ${unit} Master Exam</h3>
                                <p>Score at least 80% on all Unit ${unit} sub-topics to unlock this exam.</p>
                                <button disabled style="background-color: #bdc3c7; border: none; padding: 10px 20px; border-radius: 20px; color: white;">Locked</button>
                            </div>
                        `;
                    }

                    dashboardContent.innerHTML += `
                        <h3 class="unit-header">Unit ${unit}: ${unitTitles[unit]}</h3>
                        <div class="grid">
                            ${unitCardsHTML}
                            ${masterCardHTML}
                        </div>
                    `;
                }
            }

            if(!hasAnyQuizzes) {
                dashboardContent.innerHTML = `<div class="quiz-card" style="border-top-color:#e74c3c;"><h3>No Active Quizzes</h3><p>Your teacher has not unlocked any quizzes for you yet.</p></div>`;
            }

        } else {
            signOut(auth);
            loginMessage.innerText = "Access Denied: Your email is not authorized.";
        }
    }
});
