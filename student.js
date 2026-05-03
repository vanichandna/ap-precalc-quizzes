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
const emailDisplay = document.getElementById('student-email-display');
const progressFill = document.getElementById('overall-progress-fill');
const progressText = document.getElementById('overall-progress-text');

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
            emailDisplay.innerText = `Logged in as: ${user.email}`;
            
            const studentData = docSnap.data();
            const scores = studentData.scores || {};
            
            // Progress Tracking Variables
            let totalAssigned = 0;
            let totalCompleted = 0;
            
            // HTML Containers
            let newAssignmentsHTML = "";
            let coreCurriculumHTML = "";
            let completedCustomHTML = "";

            // --- 1. PROCESS CUSTOM/HOMEWORK ASSIGNMENTS ---
            for (const [key, hasAccess] of Object.entries(studentData.access || {})) {
                if (key.startsWith("custom_") && hasAccess) {
                    totalAssigned++;
                    const score = scores[key];
                    const isDone = score !== undefined;
                    
                    if (isDone) totalCompleted++;

                    const cardHTML = `
                        <div class="quiz-card ${!isDone ? 'alert-card' : ''}" style="border-top: 4px solid var(--purple);">
                            ${!isDone ? '<div class="alert-badge">NEW</div>' : ''}
                            <h3 style="color: var(--purple);">Special Assignment</h3>
                            <p><strong>ID:</strong> ${key}</p>
                            ${isDone ? `<div style="text-align:center; margin-bottom: 15px;"><span class="score-badge" style="color:var(--success); border:1px solid var(--success);">Score: ${score}%</span></div>` : ''}
                            <a href="quiz.html?customId=${key}" class="master-btn" style="${isDone ? 'background: var(--success);' : ''}">
                                ${isDone ? 'Review Solutions' : 'Start Assignment'}
                            </a>
                        </div>
                    `;

                    if (!isDone) {
                        newAssignmentsHTML += cardHTML;
                    } else {
                        completedCustomHTML += cardHTML;
                    }
                }
            }

            // --- 2. PROCESS CORE CURRICULUM (UNITS 1-4) ---
            for (let unit = 1; unit <= 4; unit++) {
                let unitCardsHTML = "";
                let unitTotalAssigned = 0;
                let unitTotalCompleted = 0;

                for(let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    
                    if (studentData.access && studentData.access[unitKey]) {
                        // Standard practice quizzes count towards total progress
                        totalAssigned += 3; 
                        unitTotalAssigned += 3;

                        const isEasyDone = scores[`${unitKey}_easy`] !== undefined;
                        const isMedDone  = scores[`${unitKey}_med`] !== undefined;
                        const isHardDone = scores[`${unitKey}_hard`] !== undefined;
                        
                        if (isEasyDone) { totalCompleted++; unitTotalCompleted++; }
                        if (isMedDone)  { totalCompleted++; unitTotalCompleted++; }
                        if (isHardDone) { totalCompleted++; unitTotalCompleted++; }

                        const topicMasterUnlocked = isEasyDone && isMedDone && isHardDone;
                        const topicMasterScore = scores[`${unitKey}_master`];

                        // Master quiz progress tracking
                        totalAssigned++; 
                        unitTotalAssigned++;
                        if (topicMasterScore !== undefined) { totalCompleted++; unitTotalCompleted++; }

                        const eScore = scores[`${unitKey}_easy`];
                        const mScore = scores[`${unitKey}_med`];
                        const hScore = scores[`${unitKey}_hard`];

                        // Build individual practice links
                        const linkHTML = (done, score, level, diff) => {
                            if (done) return `<a href="quiz.html?unit=${unit}_${sub}&diff=${diff}" class="quiz-link done">✅ ${level} <span class="score-badge">${score}%</span></a>`;
                            return `<a href="quiz.html?unit=${unit}_${sub}&diff=${diff}" class="quiz-link">📝 ${level}</a>`;
                        };

                        unitCardsHTML += `
                            <div class="quiz-card" style="border-top: 4px solid var(--accent);">
                                <h3>Topic ${unit}.${sub}</h3>
                                <div style="display: flex; flex-direction: column; margin-bottom: 20px;">
                                    ${linkHTML(isEasyDone, eScore, "Easy", "easy")}
                                    ${linkHTML(isMedDone, mScore, "Medium", "med")}
                                    ${linkHTML(isHardDone, hScore, "Hard", "hard")}
                                </div>
                                ${topicMasterUnlocked 
                                    ? `<a href="quiz.html?unit=${unit}_${sub}&diff=master" class="master-btn">
                                        🏆 Master Quiz ${topicMasterScore !== undefined ? `(${topicMasterScore}%)` : ''}
                                       </a>`
                                    : `<button class="master-btn locked" disabled>🔒 Master Locked</button>`
                                }
                            </div>
                        `;
                    }
                }

                // Final Exam Processing
                const finalKey = `unit${unit}_final`;
                if (studentData.access && studentData.access[finalKey]) {
                    totalAssigned++;
                    unitTotalAssigned++;
                    const finalScore = scores[finalKey];
                    if (finalScore !== undefined) { totalCompleted++; unitTotalCompleted++; }

                    unitCardsHTML += `
                        <div class="quiz-card alert-card" style="grid-column: 1 / -1; border-top: 4px solid var(--warning); border-left: none;">
                            <div class="alert-badge" style="background: var(--warning);">HIGH STAKES</div>
                            <h3 style="color: var(--warning);">👑 Unit ${unit} Final Exam</h3>
                            <p>Your teacher has unlocked the comprehensive Final Exam for this unit. Ensure you have adequate time before starting.</p>
                            <a href="quiz.html?unit=${unit}&diff=final" class="master-btn final-btn">
                                ${finalScore !== undefined ? `Review Final Exam (Score: ${finalScore}%)` : 'Start Final Exam &rarr;'}
                            </a>
                        </div>
                    `;
                }

                // If unit has any cards, render the Accordion Section
                if (unitCardsHTML !== "") {
                    // Logic to auto-collapse units that are 100% finished
                    const isUnitFullyFinished = (unitTotalAssigned === unitTotalCompleted && unitTotalAssigned > 0); 
                    const collapsedClass = isUnitFullyFinished ? 'collapsed' : '';
                    const hiddenClass = isUnitFullyFinished ? 'hidden' : '';

                    coreCurriculumHTML += `
                        <h3 class="section-title ${collapsedClass}" onclick="this.classList.toggle('collapsed'); this.nextElementSibling.classList.toggle('hidden');">
                            📚 Unit ${unit}: ${unitTitles[unit]}
                        </h3>
                        <div class="grid-container ${hiddenClass}">
                            <div class="grid" style="padding-top: 5px;">${unitCardsHTML}</div>
                        </div>
                    `;
                }
            }

            // --- 3. RENDER EVERYTHING ---
            dashboardContent.innerHTML = "";

            if (newAssignmentsHTML !== "") {
                dashboardContent.innerHTML += `
                    <h3 class="section-title" style="color: var(--danger); border-color: var(--danger); cursor: default;">
                        🚨 Action Required: New Assignments
                    </h3>
                    <div class="grid">${newAssignmentsHTML}</div>
                `;
            }

            dashboardContent.innerHTML += coreCurriculumHTML;

            if (completedCustomHTML !== "") {
                dashboardContent.innerHTML += `
                    <h3 class="section-title collapsed" style="color: var(--purple);" onclick="this.classList.toggle('collapsed'); this.nextElementSibling.classList.toggle('hidden');">
                        🌟 Completed Custom Assignments
                    </h3>
                    <div class="grid-container hidden">
                        <div class="grid" style="padding-top: 5px;">${completedCustomHTML}</div>
                    </div>
                `;
            }

            if (totalAssigned === 0) {
                dashboardContent.innerHTML = `<div class="quiz-card" style="text-align:center; padding: 40px; grid-column: 1/-1;"><h3>No Active Assignments</h3><p>Your teacher has not unlocked any work for you yet.</p></div>`;
            }

            // --- 4. UPDATE PROGRESS BAR ---
            if (totalAssigned > 0) {
                const progressPercentage = Math.round((totalCompleted / totalAssigned) * 100);
                progressFill.style.width = `${progressPercentage}%`;
                progressText.innerText = `${progressPercentage}% Completed (${totalCompleted}/${totalAssigned})`;
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
