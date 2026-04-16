import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1. PASTE YOUR CONFIG HERE
 const firebaseConfig = {
    apiKey: "AIzaSyCjpG0uEfQOhnBoTD80cE--KInyg7rh6vQ",
    authDomain: "ap-precalc.firebaseapp.com",
    projectId: "ap-precalc",
    storageBucket: "ap-precalc.firebasestorage.app",
    messagingSenderId: "50281949647",
    appId: "1:50281949647:web:c2c0eff68b2d0fa5d24aba",
    measurementId: "G-Z5YBDNR3NZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 2. The Quiz Questions (You can add as many as you want here)
const questions = [
    {
        id: "q1",
        text: "Which of the following describes the end behavior of the polynomial function f(x) = -3x^4 + 2x^2 - x + 5?",
        options: [
            { value: "a", text: "As x -> infinity, f(x) -> infinity, and as x -> -infinity, f(x) -> infinity" },
            { value: "b", text: "As x -> infinity, f(x) -> -infinity, and as x -> -infinity, f(x) -> -infinity" },
            { value: "c", text: "As x -> infinity, f(x) -> infinity, and as x -> -infinity, f(x) -> -infinity" },
            { value: "d", text: "As x -> infinity, f(x) -> -infinity, and as x -> -infinity, f(x) -> infinity" }
        ],
        correctAnswer: "b"
    },
    {
        id: "q2",
        text: "What is the maximum number of distinct real zeros for a polynomial of degree 5?",
        options: [
            { value: "a", text: "4" },
            { value: "b", text: "5" },
            { value: "c", text: "6" },
            { value: "d", text: "Infinite" }
        ],
        correctAnswer: "b"
    }
];

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-quiz-btn');
const resultMessage = document.getElementById('result-message');
let currentUser = null;

// 3. Ensure the student is logged in before showing the quiz
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        renderQuiz();
    } else {
        alert("You must be logged in to take this quiz.");
        window.location.href = "index.html"; // Redirect to login
    }
});

// 4. Function to render the quiz HTML
function renderQuiz() {
    quizContainer.innerHTML = "";
    questions.forEach((q, index) => {
        let optionsHtml = "";
        q.options.forEach(opt => {
            optionsHtml += `
                <label>
                    <input type="radio" name="${q.id}" value="${opt.value}">
                    ${opt.text}
                </label>
            `;
        });

        quizContainer.innerHTML += `
            <div class="question">
                <p><strong>Question ${index + 1}:</strong> ${q.text}</p>
                <div class="options">
                    ${optionsHtml}
                </div>
            </div>
        `;
    });
}

// 5. Grade the quiz and save to database
submitBtn.addEventListener('click', async () => {
    let score = 0;
    
    // Check answers
    questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        if (selected && selected.value === q.correctAnswer) {
            score++;
        }
    });

    // Calculate percentage
    const percentage = Math.round((score / questions.length) * 100);

    // Disable button while saving
    submitBtn.disabled = true;
    submitBtn.innerText = "Saving Score...";

    try {
        // Save the score to the student's Firestore document
        const studentRef = doc(db, "users", currentUser.email);
        await updateDoc(studentRef, {
            "scores.unit1": percentage // Updates JUST the unit 1 score
        });
        
        resultMessage.style.color = "green";
        resultMessage.innerText = `Quiz submitted! You scored ${percentage}%.`;
        submitBtn.style.display = "none"; // Hide button after successful submission
        
    } catch (error) {
        console.error("Error saving score:", error);
        resultMessage.style.color = "red";
        resultMessage.innerText = "Error saving score. Please try again.";
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Quiz & Save Score";
    }
});
