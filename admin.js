// admin.js

// 1. Import Firestore functions from Google
import { collection, doc, setDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. IMPORT YOUR CONNECTION FROM YOUR CENTRAL HUB!
import { db } from './firebase-config.js';

// DOM Elements
const addBtn = document.getElementById('add-student-btn');
const emailInput = document.getElementById('new-student-email');
const tableBody = document.getElementById('student-table-body');

// 3. Function to Add a Student
addBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim().toLowerCase();
    if (!email) return alert("Please enter an email");

    // Change button text so you know it's thinking
    addBtn.innerText = "Adding...";
    addBtn.disabled = true;

    try {
        await setDoc(doc(db, "users", email), {
            email: email,
            access: { unit1: false, unit2: false },
            scores: { unit1: 0, unit2: 0 }
        });
        alert("Student added successfully!");
        emailInput.value = '';
        loadStudents(); // Refresh table
    } catch (e) {
        console.error("Full Error: ", e);
        // This stops it from failing silently!
        alert("Error adding student! You might not be logged in as the Admin, or your Security Rules are blocking it.");
    } finally {
        addBtn.innerText = "Grant Access";
        addBtn.disabled = false;
    }
});

// 4. Function to Load and Display Students
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
        tableBody.innerHTML = "<tr><td colspan='4' style='color:red;'>Failed to load students. Are you logged in as Admin?</td></tr>";
    }
}

// 5. Function to Update Access in Database
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
        event.target.checked = !isChecked; // Revert checkbox if it fails
    }
}

// Initial load
loadStudents();
