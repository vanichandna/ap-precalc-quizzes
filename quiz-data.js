// quiz-data.js

export const masterCurriculum = {
    // UNIT 1.1 DATA
    "1_1_easy": {
        title: "Unit 1.1: Easy Practice",
        subtitle: "Focus: Calculating and identifying Average Rates of Change.",
        themeColor: "#27ae60", // Green
        questions: [
            { q: "1. A function f(x) passes through the points (1, 5) and (4, 17). What is the AROC?", opts: { A: "12", B: "4", C: "3", D: "6" }, ans: "B", sol: "(17 - 5) / (4 - 1) = 4." }
            // Add your other 4 questions here...
        ]
    },
    "1_1_med": {
        title: "Unit 1.1: Medium Practice",
        subtitle: "Focus: Analyzing rates of rates and determining concavity.",
        themeColor: "#f39c12", // Orange
        questions: [
            { q: "1. A function h(x) is strictly increasing on the interval (a, b). If the rate at which h(x) increases is getting smaller as x increases, what must be true?", opts: { A: "Concave up", B: "Concave down", C: "Linear", D: "Undefined" }, ans: "B", sol: "Positive slopes getting less steep means concave down." }
             // Add your other 4 questions here...
        ]
    },
    "1_1_hard": {
        title: "Unit 1.1: Hard Practice",
        subtitle: "Focus: Contextual models and proportional reasoning.",
        themeColor: "#e74c3c", // Red
        questions: [
             { q: "1. A spherical balloon is being inflated at a constant volume rate. How does the radius change?", opts: { A: "Constant", B: "Increasing rate", C: "Decreasing rate", D: "Decreases" }, ans: "C", sol: "As it gets bigger, it takes more volume to push the radius out further." }
             // Add your other 4 questions here...
        ]
    },

    // UNIT 1.2 DATA
    "1_2_easy": {
        title: "Unit 1.2: Easy Practice",
        subtitle: "Focus: Basic Average Rate of Change from equations and points.",
        themeColor: "#27ae60",
        questions: [
            { q: "1. A linear function passes through (2, 7) and (5, -2). What is the constant rate of change?", opts: { A: "3", B: "-3", C: "-1/3", D: "9" }, ans: "B", sol: "Slope formula: (-2 - 7) / (5 - 2) = -9/3 = -3." }
            // ...
        ]
    }
    // You just keep adding blocks for 1_2_med, 1_2_hard, 1_3_easy, etc.!
};
