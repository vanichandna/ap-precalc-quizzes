// student.js

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

// --- CURRICULUM DEFINITION ---
const curriculum = { 1: 14, 2: 15, 3: 15, 4: 14 }; 
const unitTitles = {
    1: "Polynomial & Rational Functions",
    2: "Exponential & Logarithmic Functions",
    3: "Trigonometric & Polar Functions",
    4: "Parameters, Vectors & Matrices"
};

// --- DOM ELEMENTS ---
const loginSection = document.getElementById('login-section');
const quizSection = document.getElementById('quiz-section');
const dashboardContent = document.getElementById('dashboard-content');
const emailInput = document.getElementById('student-email');
const passwordInput = document.getElementById('student-password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginMessage = document.getElementById('login-message');

// --- AUTHENTICATION HANDLERS ---
signupBtn.addEventListener('click', async () => {
    try { 
        await createUserWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value); 
    } catch (error) { 
        loginMessage.innerText = error.message; 
    }
});

loginBtn.addEventListener('click', async () => {
    try { 
        await signInWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value); 
    } catch (error) { 
        loginMessage.innerText = "Invalid email or password."; 
    }
});

logoutBtn.addEventListener('click', () => signOut(auth));

// --- DASHBOARD GENERATION & LOGIC ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            loginSection.style.display = 'none';
            quizSection.style.display = 'block';
            logoutBtn.style.display = 'block';
            
            const studentData = docSnap.data();
            const scores = studentData.scores || {};
            
            dashboardContent.innerHTML = ""; 
            let hasAnyQuizzes = false;

            // Loop through Main Units 1 to 4
            for (let unit = 1; unit <= 4; unit++) {
                let unitCardsHTML = "";

                for(let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    
                    if (studentData.access && studentData.access[unitKey]) {
                        hasAnyQuizzes = true;

                        const isEasyDone = scores[`${unitKey}_easy`] !== undefined;
                        const isMedDone  = scores[`${unitKey}_med`] !== undefined;
                        const isHardDone = scores[`${unitKey}_hard`] !== undefined;
                        
                        const topicMasterUnlocked = isEasyDone && isMedDone && isHardDone;
                        const topicMasterScore = scores[`${unitKey}_master`];

                        const eIcon = isEasyDone ? "✅" : "📝";
                        const mIcon = isMedDone ? "✅" : "📝";
                        const hIcon = isHardDone ? "✅" : "📝";

                        unitCardsHTML += `
                            <div class="quiz-card">
                                <h3>Topic ${unit}.${sub}</h3>
                                
                                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
                                    <a href="quiz.html?unit=${unit}_${sub}&diff=easy" style="background-color: ${isEasyDone ? '#27ae60' : '#3498db'};">${eIcon} Easy Practice</a>
                                    <a href="quiz.html?unit=${unit}_${sub}&diff=med" style="background-color: ${isMedDone ? '#27ae60' : '#f39c12'};">${mIcon} Medium Practice</a>
                                    <a href="quiz.html?unit=${unit}_${sub}&diff=hard" style="background-color: ${isHardDone ? '#27ae60' : '#e74c3c'};">${hIcon} Hard Practice</a>
                                </div>

                                ${topicMasterUnlocked 
                                    ? `<a href="quiz.html?unit=${unit}_${sub}&diff=master" style="background-color: #8e44ad; width: 85%; display: block; margin: auto;">🏆 Take Master Quiz</a>
                                       ${topicMasterScore !== undefined ? `<p style="color:#8e44ad; font-weight:bold; margin-top:10px; margin-bottom:0;">Score: ${topicMasterScore}%</p>` : ''}`
                                    : `<button disabled style="background-color: #bdc3c7; color: white; border: none; padding: 10px; border-radius: 20px; width: 100%;">🔒 Master Locked</button>`
                                }
                            </div>
                        `;
                    }
                }

                // Final Exam Check
                const finalKey = `unit${unit}_final`;
                const hasFinalAccess = studentData.access && studentData.access[finalKey];
                let grandMasterHTML = "";

                if (hasFinalAccess) {
                    hasAnyQuizzes = true;
                    const finalScore = scores[finalKey];
                    grandMasterHTML = `
                        <div class="quiz-card" style="border: 2px solid #f1c40f; background-color: #fffbef; grid-column: 1 / -1;">
                            <h2 style="color: #f39c12; margin-top:0;">👑 Unit ${unit} Final Exam</h2>
                            <p>Your teacher has unlocked the Final Exam for this unit. Good luck!</p>
                            ${finalScore !== undefined && finalScore > 0 ? `<p style="color: #27ae60; font-weight: bold; font-size: 18px;">Final Score: ${finalScore}%</p>` : ''}
                            <a href="quiz.html?unit=${unit}&diff=final" style="background-color: #f39c12; font-size: 18px; padding: 15px 30px; margin-top: 10px;">Start Final Exam &rarr;</a>
                        </div>
                    `;
                } else if (unitCardsHTML !== "") {
                    grandMasterHTML = `
                        <div class="quiz-card" style="border: 2px dashed #bdc3c7; opacity: 0.7; grid-column: 1 / -1;">
                            <h2 style="color: #7f8c8d; margin-top:0;">🔒 Unit ${unit} Final Exam</h2>
                            <p>This exam is locked. Your teacher will grant access when you are ready.</p>
                        </div>
                    `;
                }

                if (unitCardsHTML !== "" || hasFinalAccess) {
                    dashboardContent.innerHTML += `
                        <h3 class="unit-header">Unit ${unit}: ${unitTitles[unit]}</h3>
                        <div class="grid">
                            ${unitCardsHTML}
                            ${grandMasterHTML}
                        </div>
                    `;
                }
            }

            // --- NEW: Custom Assignments Rendering ---
            let customCardsHTML = "";
            for (const [key, hasAccess] of Object.entries(studentData.access || {})) {
                if (key.startsWith("custom_") && hasAccess) {
                    hasAnyQuizzes = true;
                    const score = scores[key];
                    const isDone = score !== undefined;

                    customCardsHTML += `
                        <div class="quiz-card" style="border-top-color: #9b59b6;">
                            <h3 style="color: #9b59b6;">Special Assignment</h3>
                            <p style="font-family: monospace; background: #f0f0f0; padding: 5px; border-radius: 4px;">ID: ${key}</p>
                            ${isDone ? `<p style="color: #27ae60; font-weight: bold; margin-bottom: 10px;">Score: ${score}%</p>` : ''}
                            <a href="quiz.html?customId=${key}" style="background-color: ${isDone ? '#27ae60' : '#9b59b6'}; width: 85%; display: block; margin: auto;">
                                ${isDone ? '✅ Review Solutions' : '📝 Take Assignment'}
                            </a>
                        </div>
                    `;
                }
            }

            if (customCardsHTML !== "") {
                dashboardContent.innerHTML += `
                    <h3 class="unit-header" style="color: #9b59b6;">🌟 Custom Assignments</h3>
                    <div class="grid">${customCardsHTML}</div>
                `;
            }
            // --- END CUSTOM ASSIGNMENTS ---

            if(!hasAnyQuizzes) {
                dashboardContent.innerHTML = `<div class="quiz-card" style="border-top-color:#e74c3c;"><h3>No Active Quizzes</h3><p>Your teacher has not unlocked any quizzes for you yet.</p></div>`;
            }

        } else {
            signOut(auth);
            loginMessage.innerText = "Access Denied: Your email is not authorized by the teacher.";
        }
    } else {
        loginSection.style.display = 'block';
        quizSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        emailInput.value = ""; 
        passwordInput.value = "";
    }
});
