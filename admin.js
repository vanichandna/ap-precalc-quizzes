// admin.js

// 1. Import Auth and Firestore functions
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, setDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. Import your central connection!
import { auth, db } from './firebase-config.js';

// DOM Elements - Login
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const adminEmailInput = document.getElementById('admin-email');
const adminPassInput = document.getElementById('admin-password');
const loginBtn = document.getElementById('admin-login-btn');
const logoutBtn = document.getElementById('admin-logout-btn');
const errorMsg = document.getElementById('admin-error');

// DOM Elements - Dashboard
const addBtn = document.getElementById('add-student-btn');
const newStudentEmailInput = document.getElementById('new-student-email');
const tableBody = document.getElementById('student-table-body');

// --- AUTHENTICATION LOGIC ---

// Log In Button
loginBtn.addEventListener('click', async () => {
    try {
        errorMsg.innerText = "Logging in...";
        await signInWithEmailAndPassword(auth, adminEmailInput.value.trim(), adminPassInput.value);
    } catch (e) {
        errorMsg.innerText = "Login failed: Invalid email or password.";
    }
});

// Log Out Button
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// Monitor Login State (Hides/Shows the Dashboard)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // You are logged in! Hide login box, show dashboard.
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        loadStudents(); // Fetch the database now that we have permission
    } else {
        // You are logged out.
        loginSection.style.display = "block";
        dashboardSection.style.display = "none";
        adminEmailInput.value = "";
        adminPassInput.value = "";
        errorMsg.innerText = "";
    }
});


// --- DASHBOARD LOGIC ---

// Add a Student
addBtn.addEventListener('click', async () => {
    const email = newStudentEmailInput.value.trim().toLowerCase();
    if (!email) return alert("Please enter an email");

    addBtn.innerText = "Adding...";
    addBtn.disabled = true;

    try {
        await setDoc(doc(db, "users", email), {
            email: email,
            access: { unit1: false, unit2: false },
            scores: { unit1: 0, unit2: 0 }
        });
        alert("Student added successfully!");
        newStudentEmailInput.value = '';
        loadStudents(); // Refresh table
    } catch (e) {
        alert("Error adding student! Check your console for details.");
        console.error(e);
    } finally {
        addBtn.innerText = "Grant Access";
        addBtn.disabled = false;
    }
});

// Load Students into Table
async function loadStudents() {
    tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";
    
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        tableBody.innerHTML = "";

        querySnapshot.forEach((document) => {
            const student = document.data();
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.email}</td>
                <td><input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="unit1" ${student.access.unit1 ? 'checked' : ''}></td>
                <td><input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="unit2" ${student.access.unit2 ? 'checked' : ''}></td>
                <td>U1: ${student.scores.unit1}% | U2: ${student.scores.unit2}%</td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to the new checkboxes
        document.querySelectorAll('.access-toggle').forEach(checkbox => {
            checkbox.addEventListener('change', handleAccessToggle);
        });
    } catch(e) {
        tableBody.innerHTML = "<tr><td colspan='4' style='color:red;'>Failed to load students. Check console.</td></tr>";
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
        alert("Error updating access! Reverting checkbox.");
        event.target.checked = !isChecked;
    }
}
