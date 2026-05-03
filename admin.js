// admin.js

import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

// --- AP PRECALC CURRICULUM DEFINITION ---
const curriculum = {
    1: 14, 
    2: 15, 
    3: 15, 
    4: 14  
};

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const adminEmailInput = document.getElementById('admin-email');
const adminPassInput = document.getElementById('admin-password');
const loginBtn = document.getElementById('admin-login-btn');
const logoutBtn = document.getElementById('admin-logout-btn');
const errorMsg = document.getElementById('admin-error');
const addBtn = document.getElementById('add-student-btn');
const newStudentEmailInput = document.getElementById('new-student-email');
const tableBody = document.getElementById('student-table-body');

// --- AUTH LOGIC ---
loginBtn.addEventListener('click', async () => {
    try {
        errorMsg.innerText = "Logging in...";
        await signInWithEmailAndPassword(auth, adminEmailInput.value.trim(), adminPassInput.value);
    } catch (e) {
        errorMsg.innerText = "Login failed: Invalid email or password.";
    }
});

logoutBtn.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        
        // Dynamically update table headers to match curriculum & add Actions column
        const thead = document.querySelector('thead tr');
        thead.innerHTML = `<th>Student Details & Global Controls</th>`;
        for(let u in curriculum) thead.innerHTML += `<th>Unit ${u} Progress & Access</th>`;
        thead.innerHTML += `<th style="text-align: center;">Actions</th>`;
        
        loadStudents(); 
    } else {
        loginSection.style.display = "block";
        dashboardSection.style.display = "none";
        adminEmailInput.value = ""; adminPassInput.value = ""; errorMsg.innerText = "";
    }
});

// --- DASHBOARD LOGIC ---

// Add a Student
addBtn.addEventListener('click', async () => {
    const email = newStudentEmailInput.value.trim().toLowerCase();
    if (!email) return alert("Please enter an email");

    addBtn.innerText = "Adding...";
    addBtn.disabled = true;

    // Generate blank access and scores
    let newAccess = {};
    let newScores = {};
    for (let unit in curriculum) {
        for (let sub = 1; sub <= curriculum[unit]; sub++) {
            newAccess[`unit${unit}_${sub}`] = false;
            newScores[`unit${unit}_${sub}`] = 0;
        }
        newAccess[`unit${unit}_final`] = false;
        newScores[`unit${unit}_final`] = 0;
    }

    try {
        await setDoc(doc(db, "users", email), {
            email: email,
            access: newAccess,
            scores: newScores
        });
        alert("Student added successfully!");
        newStudentEmailInput.value = '';
        loadStudents(); 
    } catch (e) {
        alert("Error adding student! Check console.");
        console.error(e);
    } finally {
        addBtn.innerText = "Grant Access";
        addBtn.disabled = false;
    }
});

// Load Students into Table
async function loadStudents() {
    tableBody.innerHTML = `<tr><td colspan="${Object.keys(curriculum).length + 2}">Loading...</td></tr>`;
    
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        tableBody.innerHTML = "";

        querySnapshot.forEach((docSnapshot) => {
            const student = docSnapshot.data();
            const row = document.createElement('tr');

            let studentTotalTopics = 0;
            let studentCompletedTopics = 0;
            let columnsHTML = "";

            // Loop through each Main Unit to create a column
            for (let unit in curriculum) {
                let unitTotal = 0;
                let unitCompleted = 0;
                
                let subHTML = `<div style="display:flex; flex-wrap:wrap; gap:8px;">`;
                
                // Loop through sub-topics
                for (let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    const hasAccess = student.access && student.access[unitKey]; 
                    
                    // --- GRAB TOPIC MASTER SCORE ---
                    const masterScore = student.scores ? student.scores[`${unitKey}_master`] : undefined;
                    let scoreBadge = "";
                    if (masterScore !== undefined) {
                        const color = masterScore >= 80 ? '#27ae60' : '#e74c3c';
                        scoreBadge = `<div style="font-size: 11px; color: ${color}; font-weight: bold; margin-top: 4px; text-align: center;">🏆 ${masterScore}%</div>`;
                    }
                    
                    unitTotal++; studentTotalTopics++;
                    if (hasAccess) { unitCompleted++; studentCompletedTopics++; }
                    
                    subHTML += `
                        <div style="background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 6px; padding: 6px; display: flex; flex-direction: column; align-items: center; min-width: 55px;">
                            <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; margin: 0;">
                                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${unitKey}" ${hasAccess ? 'checked' : ''}> 
                                ${unit}.${sub}
                            </label>
                            ${scoreBadge}
                        </div>
                    `;
                }
                
                // Final Exam logic
                const finalKey = `unit${unit}_final`;
                const hasFinalAccess = student.access && student.access[finalKey];
                
                // --- GRAB GRAND FINAL SCORE ---
                const finalScore = student.scores ? student.scores[finalKey] : undefined;
                let finalBadge = "";
                if (finalScore !== undefined && finalScore > 0) {
                     const color = finalScore >= 80 ? '#27ae60' : '#e74c3c';
                     finalBadge = `<span style="margin-left: 10px; font-size: 14px; color: ${color};">Score: ${finalScore}%</span>`;
                }

                unitTotal++; studentTotalTopics++;
                if (hasFinalAccess) { unitCompleted++; studentCompletedTopics++; }

                subHTML += `
                        <div style="width: 100%; margin-top: 10px; border-top: 2px solid #ecf0f1; padding-top: 10px;">
                            <label style="font-size: 13px; background: #fffbef; color: #d35400; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-weight: bold; border: 1px solid #f1c40f; display: inline-flex; align-items: center; width: 100%; box-sizing: border-box;">
                                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${finalKey}" ${hasFinalAccess ? 'checked' : ''} style="margin-right: 8px;"> 
                                👑 Unit ${unit} Final Exam ${finalBadge}
                            </label>
                        </div>
                    </div>`;

                // Unit Level "Select All" Checkbox
                const unitAllChecked = (unitTotal === unitCompleted && unitTotal > 0) ? 'checked' : '';
                
                columnsHTML += `<td style="min-width: 250px;">
                    <div style="margin-bottom: 12px; border-bottom: 2px solid #3498db; padding-bottom: 8px;">
                        <label style="font-size: 14px; font-weight: bold; cursor: pointer; color: #2c3e50;">
                            <input type="checkbox" class="toggle-unit" data-email="${student.email}" data-unit="${unit}" ${unitAllChecked}> 
                            Select All Unit ${unit}
                        </label>
                    </div>
                    ${subHTML}
                </td>`;
            }

            // Student Level "Select All" Checkbox
            const studentAllChecked = (studentTotalTopics === studentCompletedTopics && studentTotalTopics > 0) ? 'checked' : '';

            // --- GRAB CUSTOM QUIZ SCORES ---
            let customScoresHTML = "";
            for (const [key, score] of Object.entries(student.scores || {})) {
                if (key.startsWith("custom_") && score !== undefined) {
                    customScoresHTML += `<div style="font-size: 12px; color: #8e44ad; margin-top: 5px;"><strong>${key}:</strong> ${score}%</div>`;
                }
            }
            if (customScoresHTML !== "") {
                customScoresHTML = `<div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;"><strong style="font-size:12px; color:#666;">Custom Scores:</strong>${customScoresHTML}</div>`;
            }

            let rowHTML = `
                <td style="min-width: 200px;">
                    <strong style="font-size: 16px; color: #2c3e50;">${student.email}</strong>
                    <div style="margin-top: 15px;">
                        <label style="font-size: 13px; font-weight: bold; cursor: pointer; color: #27ae60; background: #eafaf1; padding: 8px 10px; border-radius: 5px; border: 1px solid #27ae60; display: inline-block; width: 100%; box-sizing: border-box; text-align: center;">
                            <input type="checkbox" class="toggle-all-student" data-email="${student.email}" ${studentAllChecked}>
                            Unlock ALL Curriculum
                        </label>
                    </div>
                    ${customScoresHTML}
                </td>
                ${columnsHTML}
                <td style="text-align: center; vertical-align: middle;">
                    <button class="btn-remove" data-email="${student.email}">🗑️ Remove User</button>
                </td>
            `;

            row.innerHTML = rowHTML;
            tableBody.appendChild(row);
        });

        attachEventListeners();

    } catch(e) {
        tableBody.innerHTML = `<tr><td colspan="${Object.keys(curriculum).length + 2}" style='color:red;'>Failed to load students.</td></tr>`;
        console.error(e);
    }
}

// Attach all interactive event listeners
function attachEventListeners() {
    
    // Single Topic Toggle
    document.querySelectorAll('.access-toggle').forEach(checkbox => {
        checkbox.addEventListener('change', async (e) => {
            const email = e.target.getAttribute('data-email');
            const unit = e.target.getAttribute('data-unit');
            const isChecked = e.target.checked;
            try {
                await updateDoc(doc(db, "users", email), { [`access.${unit}`]: isChecked });
            } catch (err) {
                alert("Error updating access!");
                e.target.checked = !isChecked;
            }
        });
    });

    // Unit "Select All" Toggle
    document.querySelectorAll('.toggle-unit').forEach(box => {
        box.addEventListener('change', async (e) => {
            const email = e.target.getAttribute('data-email');
            const unitNum = e.target.getAttribute('data-unit');
            const isChecked = e.target.checked;
            
            const checkboxes = document.querySelectorAll(`.access-toggle[data-email="${email}"][data-unit^="unit${unitNum}_"]`);
            let updates = {};
            checkboxes.forEach(cb => {
                cb.checked = isChecked;
                updates[`access.${cb.getAttribute('data-unit')}`] = isChecked;
            });

            try {
                await updateDoc(doc(db, "users", email), updates);
            } catch (err) {
                alert("Error updating unit access!");
                loadStudents(); 
            }
        });
    });

    // Master "Unlock ALL" Toggle
    document.querySelectorAll('.toggle-all-student').forEach(box => {
        box.addEventListener('change', async (e) => {
            const email = e.target.getAttribute('data-email');
            const isChecked = e.target.checked;

            const checkboxes = document.querySelectorAll(`.access-toggle[data-email="${email}"]`);
            const unitBoxes = document.querySelectorAll(`.toggle-unit[data-email="${email}"]`);
            
            let updates = {};
            checkboxes.forEach(cb => {
                cb.checked = isChecked;
                updates[`access.${cb.getAttribute('data-unit')}`] = isChecked;
            });
            unitBoxes.forEach(cb => cb.checked = isChecked);

            try {
                await updateDoc(doc(db, "users", email), updates);
            } catch (err) {
                alert("Error updating all access!");
                loadStudents();
            }
        });
    });

    // Remove Student Button
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const email = e.target.getAttribute('data-email');
            if(confirm(`WARNING: Are you sure you want to permanently delete ${email}?\n\nThis will revoke all access and erase all of their quiz scores.`)) {
                e.target.innerText = "Deleting...";
                e.target.disabled = true;
                
                try {
                    await deleteDoc(doc(db, "users", email));
                    loadStudents(); 
                } catch(err) {
                    alert("Error removing student. Please check your connection.");
                    e.target.innerText = "🗑️ Remove User";
                    e.target.disabled = false;
                }
            }
        });
    });
}

// Assign Custom Quiz Logic
document.getElementById('assign-custom-btn').addEventListener('click', async () => {
    const email = document.getElementById('custom-email').value.trim().toLowerCase();
    const quizId = document.getElementById('custom-quiz-id').value.trim();
    const btn = document.getElementById('assign-custom-btn');
    
    if(!email || !quizId) return alert("Please enter both the student's email and the Custom Quiz ID.");
    if(!quizId.startsWith("custom_")) return alert("Custom Quiz IDs must start with 'custom_' (e.g., custom_makeup_1).");

    btn.innerText = "Assigning...";
    btn.disabled = true;

    try {
        await updateDoc(doc(db, "users", email), {
            [`access.${quizId}`]: true
        });
        alert(`Successfully assigned ${quizId} to ${email}!`);
        document.getElementById('custom-quiz-id').value = ""; // Clear input
        loadStudents(); // Refresh to show the new custom quiz in their list
    } catch (err) {
        alert("Error: Make sure the student exists in the database first.");
    } finally {
        btn.innerText = "Assign Quiz";
        btn.disabled = false;
    }
});
