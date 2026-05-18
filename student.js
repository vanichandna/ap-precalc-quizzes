// student.js

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

const curriculum = { 1: 14, 2: 15, 3: 15, 4: 14 }; 
const unitTitles = {
    1: "Polynomial & Rational Functions",
    2: "Exponential & Logarithmic Functions",
    3: "Trigonometric & Polar Functions",
    4: "Parameters, Vectors & Matrices"
};

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

// Modal Elements
const modal = document.getElementById('details-modal');
const closeBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

closeBtn.addEventListener('click', () => modal.style.display = "none");
window.onclick = function(event) { if (event.target == modal) modal.style.display = "none"; }

signupBtn.addEventListener('click', async () => {
    try { await createUserWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value); } 
    catch (error) { loginMessage.innerText = error.message; }
});

loginBtn.addEventListener('click', async () => {
    try { await signInWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value); } 
    catch (error) { loginMessage.innerText = "Invalid email or password."; }
});

logoutBtn.addEventListener('click', () => signOut(auth));

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
            const detailsObj = studentData.details || {}; // Grab the details object
            
            let totalAssigned = 0;
            let totalCompleted = 0;
            let newAssignmentsHTML = "";
            let coreCurriculumHTML = "";
            let completedCustomHTML = "";

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
                            ${isDone ? `<div style="text-align:center; margin-bottom: 15px;"><span class="score-badge view-details-btn" data-quiz="${key}" style="color:var(--success); border:1px solid var(--success); cursor: pointer;" title="Click to view answers">Score: ${score}%</span></div>` : ''}
                            <a href="quiz.html?customId=${key}" class="master-btn" style="${isDone ? 'background: var(--success);' : ''}">
                                ${isDone ? 'Retake Assignment' : 'Start Assignment'}
                            </a>
                        </div>
                    `;
                    if (!isDone) newAssignmentsHTML += cardHTML;
                    else completedCustomHTML += cardHTML;
                }
            }

            for (let unit = 1; unit <= 4; unit++) {
                let unitCardsHTML = "";
                let unitTotalAssigned = 0;
                let unitTotalCompleted = 0;

                for(let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    
                    if (studentData.access && studentData.access[unitKey]) {
                        totalAssigned += 3; unitTotalAssigned += 3;

                        const isEasyDone = scores[`${unitKey}_easy`] !== undefined;
                        const isMedDone  = scores[`${unitKey}_med`] !== undefined;
                        const isHardDone = scores[`${unitKey}_hard`] !== undefined;
                        
                        if (isEasyDone) { totalCompleted++; unitTotalCompleted++; }
                        if (isMedDone)  { totalCompleted++; unitTotalCompleted++; }
                        if (isHardDone) { totalCompleted++; unitTotalCompleted++; }

                        const topicMasterUnlocked = isEasyDone && isMedDone && isHardDone;
                        const topicMasterScore = scores[`${unitKey}_master`];

                        totalAssigned++; unitTotalAssigned++;
                        if (topicMasterScore !== undefined) { totalCompleted++; unitTotalCompleted++; }

                        const eScore = scores[`${unitKey}_easy`];
                        const mScore = scores[`${unitKey}_med`];
                        const hScore = scores[`${unitKey}_hard`];

                        const linkHTML = (done, score, level, diff) => {
                            const dbKey = `${unitKey}_${diff}`;
                            if (done) return `<div style="display:flex; justify-content:space-between; align-items:center; background-color: #ecfdf5; padding: 12px 15px; border-radius: 8px; border: 1px solid #a7f3d0; margin-bottom: 8px;">
                                <a href="quiz.html?unit=${unit}_${sub}&diff=${diff}" style="color: var(--success); text-decoration: none; font-weight: 600; font-size: 14px;">✅ ${level}</a>
                                <span class="score-badge view-details-btn" data-quiz="${dbKey}" style="cursor: pointer; color: var(--success);" title="View Answers">${score}%</span>
                            </div>`;
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
                                        🏆 Master Quiz
                                       </a>
                                       ${topicMasterScore !== undefined ? `<div class="view-details-btn" data-quiz="${unitKey}_master" style="text-align:center; margin-top: 8px; font-size: 12px; font-weight: bold; color: var(--purple); cursor:pointer;">Highest Score: ${topicMasterScore}% (View Answers)</div>` : ''}`
                                    : `<button class="master-btn locked" disabled>🔒 Master Locked</button>`
                                }
                            </div>
                        `;
                    }
                }

                const finalKey = `unit${unit}_final`;
                if (studentData.access && studentData.access[finalKey]) {
                    totalAssigned++; unitTotalAssigned++;
                    const finalScore = scores[finalKey];
                    if (finalScore !== undefined) { totalCompleted++; unitTotalCompleted++; }

                    unitCardsHTML += `
                        <div class="quiz-card alert-card" style="grid-column: 1 / -1; border-top: 4px solid var(--warning); border-left: none;">
                            <div class="alert-badge" style="background: var(--warning);">HIGH STAKES</div>
                            <h3 style="color: var(--warning);">👑 Unit ${unit} Final Exam</h3>
                            <p>Your teacher has unlocked the comprehensive Final Exam for this unit.</p>
                            <a href="quiz.html?unit=${unit}&diff=final" class="master-btn final-btn">
                                ${finalScore !== undefined ? 'Retake Final Exam' : 'Start Final Exam &rarr;'}
                            </a>
                            ${finalScore !== undefined ? `<div class="view-details-btn" data-quiz="${finalKey}" style="text-align:center; margin-top: 10px; font-size: 14px; font-weight: bold; color: var(--warning); cursor:pointer;">Highest Score: ${finalScore}% (View Answers)</div>` : ''}
                        </div>
                    `;
                }

                if (unitCardsHTML !== "") {
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

            dashboardContent.innerHTML = "";
            if (newAssignmentsHTML !== "") dashboardContent.innerHTML += `<h3 class="section-title" style="color: var(--danger); border-color: var(--danger); cursor: default;">🚨 Action Required: New Assignments</h3><div class="grid">${newAssignmentsHTML}</div>`;
            dashboardContent.innerHTML += coreCurriculumHTML;
            if (completedCustomHTML !== "") dashboardContent.innerHTML += `<h3 class="section-title collapsed" style="color: var(--purple);" onclick="this.classList.toggle('collapsed'); this.nextElementSibling.classList.toggle('hidden');">🌟 Completed Custom Assignments</h3><div class="grid-container hidden"><div class="grid" style="padding-top: 5px;">${completedCustomHTML}</div></div>`;
            if (totalAssigned === 0) dashboardContent.innerHTML = `<div class="quiz-card" style="text-align:center; padding: 40px; grid-column: 1/-1;"><h3>No Active Assignments</h3><p>Your teacher has not unlocked any work for you yet.</p></div>`;

            if (totalAssigned > 0) {
                const progressPercentage = Math.round((totalCompleted / totalAssigned) * 100);
                progressFill.style.width = `${progressPercentage}%`;
                progressText.innerText = `${progressPercentage}% Completed (${totalCompleted}/${totalAssigned})`;
            }

            // Add Modal Listeners for Students
            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // FIX: Changed e.target to e.currentTarget
                    const quizKey = e.currentTarget.getAttribute('data-quiz');
                    modal.style.display = "flex";
                    modalTitle.innerText = `Quiz: ${quizKey.replace(/_/g, ' ').toUpperCase()}`;
                    
                    const detailsArray = detailsObj[quizKey];
                    if (!detailsArray || detailsArray.length === 0) {
                        modalBody.innerHTML = "<p style='color: #64748b;'>Detailed breakdown was not saved for this attempt.</p>";
                        return;
                    }

                    modalBody.innerHTML = "";
                    detailsArray.forEach((qData) => {
                        const statusClass = qData.isCorrect ? 'detail-correct' : 'detail-incorrect';
                        modalBody.innerHTML += `
                            <div class="detail-item ${statusClass}">
                                <p style="font-weight: 600; margin: 0 0 10px 0; color: #1e293b;">${qData.qText}</p>
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>You Marked:</strong> ${qData.selectedOption}</p>
                                ${!qData.isCorrect ? `<p style="margin: 0; font-size: 14px; color: #059669;"><strong>Correct Answer:</strong> ${qData.correctOption}</p>` : ''}
                            </div>
                        `;
                    });
                });
            });
            
        } else {
            signOut(auth);
            loginMessage.innerText = "Access Denied: Your email is not authorized by the teacher.";
        }
    } else {
        loginSection.style.display = 'block';
        quizSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        emailInput.value = ""; passwordInput.value = "";
    }
});
