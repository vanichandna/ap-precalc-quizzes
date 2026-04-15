// 1. Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. PASTE YOUR CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyCjpG0uEfQOhnBoTD80cE--KInyg7rh6vQ",
    authDomain: "ap-precalc.firebaseapp.com",
    projectId: "ap-precalc",
    storageBucket: "ap-precalc.firebasestorage.app",
    messagingSenderId: "50281949647",
    appId: "1:50281949647:web:c2c0eff68b2d0fa5d24aba",
    measurementId: "G-Z5YBDNR3NZ"
  };

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const addBtn = document.getElementById('add-student-btn');
const emailInput = document.getElementById('new-student-email');
const tableBody = document.getElementById('student-table-body');

// 4. Function to Add a Student
addBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim().toLowerCase();
    if (!email) return alert("Please enter an email");

    try {
        // Create a document using the email as the Document ID
        await setDoc(doc(db, "users", email), {
            email: email,
            access: { unit1: false, unit2: false },
            scores: { unit1: 0, unit2: 0 }
        });
        alert("Student added successfully!");
        emailInput.value = '';
        loadStudents(); // Refresh table
    } catch (e) {
        console.error("Error adding student: ", e);
    }
});

// 5. Function to Load and Display Students
async function loadStudents() {
    tableBody.innerHTML = "Loading...";
    const querySnapshot = await getDocs(collection(db, "users"));
    tableBody.innerHTML = "";

    querySnapshot.forEach((document) => {
        const student = document.data();
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.email}</td>
            <td>
                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="unit1" ${student.access.unit1 ? 'checked' : ''}>
            </td>
            <td>
                <input type="checkbox" class="access-toggle" data-email="${student.email}" data-unit="unit2" ${student.access.unit2 ? 'checked' : ''}>
            </td>
            <td>U1: ${student.scores.unit1}% | U2: ${student.scores.unit2}%</td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners to the new checkboxes
    document.querySelectorAll('.access-toggle').forEach(checkbox => {
        checkbox.addEventListener('change', handleAccessToggle);
    });
}

// 6. Function to Update Access in Database
async function handleAccessToggle(event) {
    const email = event.target.getAttribute('data-email');
    const unit = event.target.getAttribute('data-unit');
    const isChecked = event.target.checked;

    try {
        const studentRef = doc(db, "users", email);
        // Dynamically update the specific unit access
        await updateDoc(studentRef, {
            [`access.${unit}`]: isChecked
        });
        console.log(`Updated ${email} ${unit} access to ${isChecked}`);
    } catch (e) {
        console.error("Error updating access: ", e);
        event.target.checked = !isChecked; // Revert checkbox if it fails
    }
}

// Initial load
loadStudents();
