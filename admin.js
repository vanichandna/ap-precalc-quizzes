// admin.js

import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

const curriculum = { 1: 14, 2: 15, 3: 15, 4: 14 };

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
        logoutBtn.style.display = "block";
        
        const thead = document.querySelector('thead tr');
        thead.innerHTML = `<th class="student-email-cell">Student Details & Controls</th>`;
        for(let u in curriculum) thead.innerHTML += `<th>Unit ${u} Progress & Access</th>`;
        thead.innerHTML += `<th style="text-align: center;">Actions</th>`;
        
        loadStudents(); 
    } else {
        loginSection.style.display = "block";
        dashboardSection.style.display = "none";
        logoutBtn.style.display = "none";
        adminEmailInput.value = ""; adminPassInput.value = ""; errorMsg.innerText = "";
    }
});

addBtn.addEventListener('click', async () => {
    const email = newStudentEmailInput.value.trim().toLowerCase();
    if (!email) return alert("Please enter an email");

    addBtn.innerText = "Adding...";
    addBtn.disabled = true;

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
        await setDoc(doc(db, "users", email), { email: email, access: newAccess, scores: newScores });
        alert("Student added successfully!");
        newStudentEmailInput.value = '';
        loadStudents(); 
    } catch (e) {
        alert("Error adding student! Check console.");
    } finally {
        addBtn.innerText = "Add to Database";
        addBtn.disabled = false;
    }
});

async function loadStudents() {
    tableBody.innerHTML = `<tr><td colspan="${Object.keys(curriculum).length + 2}" style="text-align:center; padding: 40px; color: #64748b;">Fetching student data...</td></tr>`;
    
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        tableBody.innerHTML = "";

        querySnapshot.forEach((docSnapshot) => {
            const student = docSnapshot.data();
            const row = document.createElement('tr');

            let studentTotalTopics = 0;
            let studentCompletedTopics = 0;
            let columnsHTML = "";

            for (let unit in curriculum) {
                let unitTotal = 0;
                let unitCompleted = 0;
                let subHTML = `<div style="display:flex; flex-wrap:wrap; gap:10px;">`;
                
                for (let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    const hasAccess = student.access && student.access[unitKey]; 
                    
                    const masterScore = student.scores ? student.scores[`${unitKey}_master`] : undefined;
                    let scoreBadge = "";
                    if (masterScore !== undefined) {
                        const color = masterScore >= 80 ? '#10b981' : '#ef4444';
                        scoreBadge = `<div style="font-size: 11px; color: ${color}; font-weight: 700; margin-top: 5px; background: white; padding: 2px 6px; border-radius: 10px; border: 1px solid #e2e8f0; text-align: center;">🏆 ${masterScore}%</div>`;
                    }
                    
                    unitTotal++; studentTotalTopics++;
                    if (hasAccess) { unitCompleted++; studentCompletedTopics++; }
                    
                    subHTML += `
                        <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px; display: flex; flex-direction: column; align-items: center; min-width: 60px; transition: 0.2s;">
                            <label style="font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; margin: 0; color: #334155;">
                                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${unitKey}" ${hasAccess ? 'checked' : ''} style="margin:0; cursor:pointer;"> 
                                ${unit}.${sub}
                            </label>
                            ${scoreBadge}
                        </div>
                    `;
                }
                
                const finalKey = `unit${unit}_final`;
                const hasFinalAccess = student.access && student.access[finalKey];
                const finalScore = student.scores ? student.scores[finalKey] : undefined;
                
                let finalBadge = "";
                if (finalScore !== undefined && finalScore > 0) {
                     const color = finalScore >= 80 ? '#10b981' : '#ef4444';
                     finalBadge = `<span style="margin-left: auto; font-size: 13px; color: ${color}; background: white; padding: 2px 8px; border-radius: 12px;">Score: ${finalScore}%</span>`;
                }

                unitTotal++; studentTotalTopics++;
                if (hasFinalAccess) { unitCompleted++; studentCompletedTopics++; }

                subHTML += `
                        <div style="width: 100%; margin-top: 12px; border-top: 2px dashed #cbd5e1; padding-top: 12px;">
                            <label style="font-size: 13px; background: #fef3c7; color: #b45309; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 700; border: 1px solid #fcd34d; display: flex; align-items: center; width: 100%; box-sizing: border-box; transition: 0.2s;">
                                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${finalKey}" ${hasFinalAccess ? 'checked' : ''} style="margin-right: 10px; cursor:pointer;"> 
                                👑 Unit ${unit} Final Exam ${finalBadge}
                            </label>
                        </div>
                    </div>`;

                const unitAllChecked = (unitTotal === unitCompleted && unitTotal > 0) ? 'checked' : '';
                columnsHTML += `<td style="min-width: 320px;">
                    <div style="margin-bottom: 15px; padding-bottom: 10px;">
                        <label style="font-size: 13px; font-weight: 700; cursor: pointer; color: #3b82f6; display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" class="toggle-unit" data-email="${student.email}" data-unit="${unit}" ${unitAllChecked} style="cursor:pointer;"> 
                            Select All Unit ${unit}
                        </label>
                    </div>
                    ${subHTML}
                </td>`;
            }

            const studentAllChecked = (studentTotalTopics === studentCompletedTopics && studentTotalTopics > 0) ? 'checked' : '';

            let customScoresHTML = "";
            for (const [key, score] of Object.entries(student.scores || {})) {
                if (key.startsWith("custom_") && score !== undefined) {
                    customScoresHTML += `<div style="font-size: 13px; color: #6d28d9; margin-top: 6px; background: #f3e8ff; padding: 4px 8px; border-radius: 4px; border: 1px solid #d8b4fe;"><strong>${key}:</strong> ${score}%</div>`;
                }
            }
            if (customScoresHTML !== "") {
                customScoresHTML = `<div style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 12px;"><strong style="font-size:12px; color:#64748b; text-transform: uppercase; letter-spacing: 0.5px;">Custom Assignments:</strong>${customScoresHTML}</div>`;
            }

            let rowHTML = `
                <td class="student-email-cell" style="min-width: 220px;">
                    <strong style="font-size: 15px; color: #0f172a; word-break: break-all;">${student.email}</strong>
                    <div style="margin-top: 15px;">
                        <label style="font-size: 12px; font-weight: 700; cursor: pointer; color: #059669; background: #ecfdf5; padding: 8px 12px; border-radius: 6px; border: 1px solid #a7f3d0; display: flex; align-items: center; gap: 6px; transition: 0.2s;">
                            <input type="checkbox" class="toggle-all-student" data-email="${student.email}" ${studentAllChecked} style="cursor:pointer;">
                            Unlock Curriculum
                        </label>
                    </div>
                    ${customScoresHTML}
                </td>
                ${columnsHTML}
                <td style="text-align: center; vertical-align: middle;">
                    <button class="btn-remove" data-email="${student.email}">Remove User</button>
                </td>
            `;

            row.innerHTML = rowHTML;
            tableBody.appendChild(row);
        });

        attachEventListeners();

    } catch(e) {
        tableBody.innerHTML = `<tr><td colspan="${Object.keys(curriculum).length + 2}" style='color:var(--danger); padding: 20px;'>Failed to load students.</td></tr>`;
    }
}

function attachEventListeners() {
    document.querySelectorAll('.access-toggle').forEach(checkbox => {
        checkbox.addEventListener('change', async (e) => {
            const email = e.target.getAttribute('data-email');
            const unit = e.target.getAttribute('data-unit');
            const isChecked = e.target.checked;
            try { await updateDoc(doc(db, "users", email), { [`access.${unit}`]: isChecked }); } 
            catch (err) { alert("Error updating access!"); e.target.checked = !isChecked; }
        });
    });

    document.querySelectorAll('.toggle-unit').forEach(box => {
        box.addEventListener('change', async (e) => {
            const email = e.target.getAttribute('data-email');
            const unitNum = e.target.getAttribute('data-unit');
            const isChecked = e.target.checked;
            
            const checkboxes = document.querySelectorAll(`.access-toggle[data-email="${email}"][data-unit^="unit${unitNum}_"]`);
            let updates = {};
            checkboxes.forEach(cb => { cb.checked = isChecked; updates[`access.${cb.getAttribute('data-unit')}`] = isChecked; });

            try { await updateDoc(doc(db, "users", email), updates); } 
            catch (err) { alert("Error updating unit!"); loadStudents(); }
        });
    });

    document.querySelectorAll('.toggle-all-student').forEach(box => {
        box.addEventListener('change', async (e) => {
            const email = e.target.getAttribute('data-email');
            const isChecked = e.target.checked;

            const checkboxes = document.querySelectorAll(`.access-toggle[data-email="${email}"]`);
            const unitBoxes = document.querySelectorAll(`.toggle-unit[data-email="${email}"]`);
            
            let updates = {};
            checkboxes.forEach(cb => { cb.checked = isChecked; updates[`access.${cb.getAttribute('data-unit')}`] = isChecked; });
            unitBoxes.forEach(cb => cb.checked = isChecked);

            try { await updateDoc(doc(db, "users", email), updates); } 
            catch (err) { alert("Error updating access!"); loadStudents(); }
        });
    });

    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const email = e.target.getAttribute('data-email');
            if(confirm(`WARNING: Are you sure you want to permanently delete ${email}?`)) {
                e.target.innerText = "Deleting..."; e.target.disabled = true; e.target.style.opacity = "0.5";
                try { await deleteDoc(doc(db, "users", email)); loadStudents(); } 
                catch(err) { alert("Error removing student."); e.target.innerText = "Remove User"; e.target.disabled = false; e.target.style.opacity = "1"; }
            }
        });
    });
}

document.getElementById('assign-custom-btn').addEventListener('click', async () => {
    const email = document.getElementById('custom-email').value.trim().toLowerCase();
    const quizId = document.getElementById('custom-quiz-id').value.trim();
    const btn = document.getElementById('assign-custom-btn');
    
    if(!email || !quizId) return alert("Please enter both the student's email and the Custom Quiz ID.");
    if(!quizId.startsWith("custom_")) return alert("Custom Quiz IDs must start with 'custom_' (e.g., custom_makeup).");

    btn.innerText = "Assigning..."; btn.disabled = true;
    try {
        await updateDoc(doc(db, "users", email), { [`access.${quizId}`]: true });
        alert(`Successfully assigned ${quizId}!`);
        document.getElementById('custom-quiz-id').value = ""; 
        loadStudents(); 
    } catch (err) { alert("Error: Make sure the student exists in the database first."); } 
    finally { btn.innerText = "Assign"; btn.disabled = false; }
});
