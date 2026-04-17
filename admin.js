// admin.js

import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, setDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
        
        // Dynamically update table headers to match curriculum
        const thead = document.querySelector('thead tr');
        thead.innerHTML = `<th>Student Email</th>`;
        for(let u in curriculum) thead.innerHTML += `<th>Unit ${u} Access</th>`;
        
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

    // Generate blank access and scores for every single unit AND the Final Exams
    let newAccess = {};
    let newScores = {};
    for (let unit in curriculum) {
        for (let sub = 1; sub <= curriculum[unit]; sub++) {
            newAccess[`unit${unit}_${sub}`] = false;
            newScores[`unit${unit}_${sub}`] = 0;
        }
        // Add database slots for the Grand Final Exams
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
    tableBody.innerHTML = `<tr><td colspan="${Object.keys(curriculum).length + 1}">Loading...</td></tr>`;
    
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        tableBody.innerHTML = "";

        querySnapshot.forEach((docSnapshot) => {
            const student = docSnapshot.data();
            const row = document.createElement('tr');

            let rowHTML = `<td><strong>${student.email}</strong></td>`;
            
            // Loop through each Main Unit to create a column
            for (let unit in curriculum) {
                rowHTML += `<td style="min-width: 150px;">
                                <div style="display:flex; flex-wrap:wrap; gap:8px;">`;
                
                // Loop through sub-units to create checkboxes
                for (let sub = 1; sub <= curriculum[unit]; sub++) {
                    const unitKey = `unit${unit}_${sub}`;
                    const hasAccess = student.access && student.access[unitKey] ? 'checked' : ''; 
                    
                    rowHTML += `
                        <label style="font-size: 12px; background: #eee; padding: 2px 5px; border-radius: 4px; cursor: pointer;">
                            <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${unitKey}" ${hasAccess}> 
                            ${unit}.${sub}
                        </label>
                    `;
                }
                
                // --- NEW: Add the Grand Final Exam Checkbox at the bottom of each column ---
                const finalKey = `unit${unit}_final`;
                const hasFinalAccess = student.access && student.access[finalKey] ? 'checked' : '';
                rowHTML += `
                        <div style="width: 100%; margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px;">
                            <label style="font-size: 12px; background: #f1c40f; color: #000; padding: 4px 6px; border-radius: 4px; cursor: pointer; font-weight: bold; border: 1px solid #d4ac0d; display: inline-block;">
                                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="${finalKey}" ${hasFinalAccess}> 
                                👑 Unit ${unit} Final Exam
                            </label>
                        </div>
                    </div></td>`;
            }

            row.innerHTML = rowHTML;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.access-toggle').forEach(checkbox => {
            checkbox.addEventListener('change', handleAccessToggle);
        });
    } catch(e) {
        tableBody.innerHTML = `<tr><td colspan="${Object.keys(curriculum).length + 1}" style='color:red;'>Failed to load students.</td></tr>`;
        console.error(e);
    }
}

// Update Access Checkboxes
async function handleAccessToggle(event) {
    const email = event.target.getAttribute('data-email');
    const unit = event.target.getAttribute('data-unit');
    const isChecked = event.target.checked;

    try {
        const studentRef = doc(db, "users", email);
        await updateDoc(studentRef, {
            [`access.${unit}`]: isChecked
        });
    } catch (e) {
        alert("Error updating access!");
        event.target.checked = !isChecked;
    }
}
