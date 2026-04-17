// student.js

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

// --- CURRICULUM DEFINITION ---
const curriculum = { 1: 14, 2: 15, 3: 15, 4: 14 }; // Note: Updated Unit 2 to 15 topics based on your curriculum!
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
            // Student is authorized by Admin. Show Dashboard.
            loginSection.style.display = 'none';
            quizSection.style.display = 'block';
            logoutBtn.style.display = 'block';
            
            const studentData = docSnap.data();
            
            // Failsafe: Ensure scores object exists
            const scores = studentData.scores || {};
            
            dashboardContent.innerHTML = ""; 
            let hasAnyQuizzes = false;

            // Loop through Main Units 1 to 4
            for (let unit = 1; unit <= 4; unit++) {
                let unitCardsHTML = "";
                let entireUnitMastered = true; 
                let totalTopicsInUnit = 0;

                // Loop through Sub-topics for the current unit
                for(let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    
                    // Only render if the Admin checked the box for this specific topic
                    if (studentData.access && studentData.access[unitKey]) {
                        hasAnyQuizzes = true;
                        totalTopicsInUnit++;

                        // Check completion status in the database
                        const isEasyDone = scores[`${unitKey}_easy`] !== undefined;
                        const isMedDone  = scores[`${unitKey}_med`] !== undefined;
                        const isHardDone = scores[`${unitKey}_hard`] !== undefined;
                        
                        // Check if they took this specific sub-topic's timed master quiz (Look in scores, not exams!)
                        const isTopicMasterDone = scores[`${unitKey}_master`] !== undefined;
                        if (!isTopicMasterDone) entireUnitMastered = false;

                        // Unlocks the Sub-Topic Master only if Easy, Med, and Hard are done
                        const topicMasterUnlocked = isEasyDone && isMedDone && isHardDone;

                        // UI helpers for checkmarks
                        const eIcon = isEasyDone ? "✅" : "📝";
                        const mIcon = isMedDone ? "✅" : "📝";
                        const hIcon = isHardDone ? "✅" : "📝";

                        // Build the Card
                        unitCardsHTML += `
                            <div class="quiz-card">
                                <h3>Topic ${unit}.${sub}</h3>
                                
                                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
                                    <a href="quiz.html?unit=${unit}_${sub}&diff=easy" style="background-color: ${isEasyDone ? '#27ae60' : '#3498db'};">${eIcon} Easy Practice</a>
                                    <a href="quiz.html?unit=${unit}_${sub}&diff=med" style="background-color: ${isMedDone ? '#27ae60' : '#f39c12'};">${mIcon} Medium Practice</a>
                                    <a href="quiz.html?unit=${unit}_${sub}&diff=hard" style="background-color: ${isHardDone ? '#27ae60' : '#e74c3c'};">${hIcon} Hard Practice</a>
                                </div>

                                ${topicMasterUnlocked 
                                    ? `<a href="quiz.html?unit=${unit}_${sub}&diff=master" style="background-color: #8e44ad; width: 85%; display: block; margin: auto;">🏆 Take ${unit}.${sub} Master Quiz</a>` 
                                    : `<button disabled style="background-color: #bdc3c7; color: white; border: none; padding: 10px; border-radius: 20px; width: 100%;">🔒 ${unit}.${sub} Master Locked</button>`
                                }
                            </div>
                        `;
                    }
                }

                // If they have access to this unit, render the cards AND the Grand Unit Exam at the bottom
                if (unitCardsHTML !== "") {
                    
                    let grandMasterHTML = "";
                    
                    // Only unlock if they have access to at least 1 topic, AND they mastered all topics they have access to
                    if (entireUnitMastered && totalTopicsInUnit > 0) {
                        grandMasterHTML = `
                            <div class="quiz-card" style="border: 2px solid #f1c40f; background-color: #fffbef; grid-column: 1 / -1;">
                                <h2 style="color: #f39c12; margin-top:0;">👑 Unit ${unit} Final Exam</h2>
                                <p>You have mastered every topic in Unit ${unit}. Take the final timed simulator.</p>
                                <a href="quiz.html?unit=${unit}&diff=final" style="background-color: #f39c12; font-size: 18px; padding: 15px 30px;">Start Final Exam &rarr;</a>
                            </div>
                        `;
                    } else {
                        grandMasterHTML = `
                            <div class="quiz-card" style="border: 2px dashed #bdc3c7; opacity: 0.7; grid-column: 1 / -1;">
                                <h2 style="color: #7f8c8d; margin-top:0;">🔒 Unit ${unit} Final Exam</h2>
                                <p>Complete the Master Quiz for every individual topic above to unlock this final exam.</p>
                            </div>
                        `;
                    }

                    dashboardContent.innerHTML += `
                        <h3 class="unit-header">Unit ${unit}: ${unitTitles[unit]}</h3>
                        <div class="grid">
                            ${unitCardsHTML}
                            ${grandMasterHTML}
                        </div>
                    `;
                }
            }

            // Fallback if the Admin hasn't checked any boxes for this student yet
            if(!hasAnyQuizzes) {
                dashboardContent.innerHTML = `<div class="quiz-card" style="border-top-color:#e74c3c;"><h3>No Active Quizzes</h3><p>Your teacher has not unlocked any quizzes for you yet.</p></div>`;
            }

        } else {
            // Student is logged into Firebase, but their email is NOT in the Admin's Firestore database
            signOut(auth);
            loginMessage.innerText = "Access Denied: Your email is not authorized by the teacher.";
        }
    } else {
        // Not logged in at all. Show login screen.
        loginSection.style.display = 'block';
        quizSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        emailInput.value = ""; 
        passwordInput.value = "";
    }
});
