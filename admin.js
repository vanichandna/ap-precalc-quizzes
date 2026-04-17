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
        
        // Dynamically update table headers
        const thead = document.querySelector('thead tr');
        thead.innerHTML = `<th>Student Email</th>`;
        for(let u in curriculum) thead.innerHTML += `<th>Unit ${u} Access</th>`;
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

            for (let unit in curriculum) {
                let unitTotal = 0;
                let unitCompleted = 0;
                
                let subHTML = `<div style="display:flex; flex-wrap:wrap; gap:8px;">`;
                
                for (let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    const hasAccess = student.access && student.access[unitKey]; 
                    
                    unitTotal++; studentTotalTopics++;
                    if (hasAccess) { unitCompleted++; studentCompletedTopics++; }
                    
                    subHTML += `
                        <label style="font-size: 12px; background: #eee; padding: 2px 5px; border-radius: 4px; cursor: pointer;">
                            <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${unitKey}" ${hasAccess ? 'checked' : ''}> 
                            ${unit}.${sub}
                        </label>
                    `;
                }
                
                const finalKey = `unit${unit}_final`;
                const hasFinalAccess = student.access && student.access[finalKey];
                unitTotal++; studentTotalTopics++;
                if (hasFinalAccess) { unitCompleted++; studentCompletedTopics++; }

                subHTML += `
                        <div style="width: 100%; margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px;">
                            <label style="font-size: 12px; background: #f1c40f; color: #000; padding: 4px 6px; border-radius: 4px; cursor: pointer; font-weight: bold; border: 1px solid #d4ac0d; display: inline-block;">
                                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${finalKey}" ${hasFinalAccess ? 'checked' : ''}> 
                                👑 Unit ${unit} Final Exam
                            </label>
                        </div>
                    </div>`;

                const unitAllChecked = (unitTotal === unitCompleted && unitTotal > 0) ? 'checked' : '';
                
                columnsHTML += `<td style="min-width: 175px;">
                    <div style="margin-bottom: 12px; border-bottom: 2px solid #ddd; padding-bottom: 8px;">
                        <label style="font-size: 13px; font-weight: bold; cursor: pointer; color: #2980b9;">
                            <input type="checkbox" class="toggle-unit" data-email="${student.email}" data-unit="${unit}" ${unitAllChecked}> 
                            Select All Unit ${unit}
                        </label>
                    </div>
                    ${subHTML}
                </td>`;
            }

            const studentAllChecked = (studentTotalTopics === studentCompletedTopics && studentTotalTopics > 0) ? 'checked' : '';

            let rowHTML = `
                <td>
                    <strong>${student.email}</strong>
                    <div style="margin-top: 15px;">
                        <label style="font-size: 13px; font-weight: bold; cursor: pointer; color: #27ae60; background: #eafaf1; padding: 5px 8px; border-radius: 5px; border: 1px solid #27ae60; display: inline-block;">
                            <input type="checkbox" class="toggle-all-student" data-email="${student.email}" ${studentAllChecked}>
                            Unlock ALL Curriculum
                        </label>
                    </div>
                </td>
                ${columnsHTML}
                <td style="text-align: center;">
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

// 5. Assign Custom Quiz Logic
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
    } catch (err) {
        alert("Error: Make sure the student exists in the database first.");
    } finally {
        btn.innerText = "Assign Quiz";
        btn.disabled = false;
    }
});
