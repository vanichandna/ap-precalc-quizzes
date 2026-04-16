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

    // ==========================================
    // UNIT 1.2: Rates of Change (Expanded Practice)
    // ==========================================
    "1_2_easy": {
        title: "Unit 1.2: Easy Practice",
        subtitle: "Focus: Basic Average Rate of Change calculations.",
        themeColor: "#27ae60",
        questions: [
            { q: "1. What is the average rate of change of f(x) = x² - 3x over the interval [1, 4]?", opts: { A: "2", B: "4", C: "-2", D: "6" }, ans: "A", sol: "f(4) = 16 - 12 = 4. f(1) = 1 - 3 = -2. Rate: (4 - (-2)) / (4 - 1) = 6 / 3 = 2." },
            { q: "2. A linear function passes through (2, 7) and (5, -2). What is its constant rate of change?", opts: { A: "3", B: "-3", C: "-1/3", D: "9" }, ans: "B", sol: "Slope formula: (-2 - 7) / (5 - 2) = -9 / 3 = -3." },
            { q: "3. Which of the following functions will have a constant average rate of change over ANY interval?", opts: { A: "f(x) = 2^x", B: "g(x) = x³", C: "h(x) = 4x - 5", D: "k(x) = √x" }, ans: "C", sol: "Only linear functions have a constant rate of change. h(x) = 4x - 5 is a line." },
            { q: "4. What is the average rate of change of the constant function y = 8 over the interval [-10, 10]?", opts: { A: "8", B: "16", C: "0", D: "Undefined" }, ans: "C", sol: "A horizontal line has a slope of 0. The y-value does not change, so the rate of change is 0." },
            { q: "5. Find the average rate of change of g(x) = x³ on the interval [0, 2].", opts: { A: "2", B: "3", C: "4", D: "8" }, ans: "C", sol: "g(2) = 8. g(0) = 0. Rate: (8 - 0) / (2 - 0) = 4." }
        ]
    },
    "1_2_med": {
        title: "Unit 1.2: Medium Practice",
        subtitle: "Focus: Finding AROC from tables and comparing intervals.",
        themeColor: "#f39c12",
        questions: [
            { q: "1. Table: t=(0, 2, 4, 6), T(t)=(90, 75, 65, 58). What is the AROC from t=2 to t=6?", opts: { A: "-4.25", B: "-8.5", C: "-17", D: "-5" }, ans: "A", sol: "(T(6) - T(2)) / (6 - 2) = (58 - 75) / 4 = -17 / 4 = -4.25." },
            { q: "2. If the AROC of a continuous function is positive on [a, b] and negative on [b, c], what MUST be true?", opts: { A: "It has a maximum at x=b", B: "Net change from a to c is 0", C: "g(b) > g(a) and g(c) < g(b)", D: "Concave down" }, ans: "C", sol: "Positive rate means ending value > starting value. Negative rate means ending value < starting value." },
            { q: "3. Let f(x) = 2^x. Compare the AROC on [0, 2] to the AROC on [2, 4].", opts: { A: "They are the same", B: "Rate on [2, 4] is 4 times larger", C: "Rate on [0, 2] is larger", D: "Rate on [2, 4] is 2 times larger" }, ans: "B", sol: "AROC on [0, 2] is 1.5. AROC on [2, 4] is 6. The second rate (6) is 4 times larger than 1.5." },
            { q: "4. If the AROC of f(x) on [-2, 2] is 0, which of the following is definitely true?", opts: { A: "f(x) is a horizontal line", B: "f(-2) = f(2)", C: "f(0) = 0", D: "f(x) is decreasing then increasing" }, ans: "B", sol: "AROC is only concerned with endpoints. If the rate is 0, the y-values at the endpoints must be identical: f(-2) = f(2)." },
            { q: "5. Find the AROC of f(x) = 1/x over the interval [1, 4].", opts: { A: "-1/4", B: "1/4", C: "-3/4", D: "-1/3" }, ans: "A", sol: "f(4) = 1/4. f(1) = 1. Rate: (1/4 - 1) / (4 - 1) = (-3/4) / 3 = -1/4." }
        ]
    },
    "1_2_hard": {
        title: "Unit 1.2: Hard Practice",
        subtitle: "Focus: Contextual word problems and interpreting AROC.",
        themeColor: "#e74c3c",
        questions: [
            { q: "1. The population P(t) of a town (t in years since 2010) has an AROC of 400 on [0, 5]. Interpretation?", opts: { A: "Population was 400 in 2015", B: "Increased exactly 400 each year", C: "Total increase was 400", D: "Increased by an average of 400 per year" }, ans: "D", sol: "AROC is a 'per unit' average. It means growth averaged out to 400 people per year." },
            { q: "2. Distance from destination d(t) has an AROC of -55 on [1, 3]. What does this mean?", opts: { A: "Drove backwards 55 miles", B: "Distance decreased at an average of 55 mph", C: "Car is 55 miles away", D: "Total distance is -55" }, ans: "B", sol: "A negative rate means the distance is dropping by an average of 55 miles every hour." },
            { q: "3. Profit R(x) in thousands of dollars, x in hundreds of items. AROC is 3. Units?", opts: { A: "Dollars/item", B: "Thousands of dollars/item", C: "Thousands of dollars / hundred items", D: "Items / thousand dollars" }, ans: "C", sol: "Units are always Output / Input. Output is 'thousands of dollars', Input is 'hundreds of items'." },
            { q: "4. A tank is draining. Volume V(t) in gallons, t in minutes. If V(t) is concave up, how does the drainage rate change?", opts: { A: "Draining at a constant speed", B: "Draining faster over time", C: "Draining slower over time", D: "Cannot be determined" }, ans: "C", sol: "Concave up means the slopes are increasing (getting less negative). If the negative slopes are getting closer to zero, the water is draining slower and slower." },
            { q: "5. The AROC of a function is 10 on [0, 2] and 10 on [2, 4]. Does this prove the function is linear?", opts: { A: "Yes", B: "No, it could be a curve that happens to hit those specific points", C: "No, it proves it is quadratic", D: "Yes, but only if it passes through the origin" }, ans: "B", sol: "AROC only looks at endpoints. A highly fluctuating curve (like a sine wave) could easily happen to have the same average rate of change over two specific intervals without being a straight line." }
        ]
    },
    // You just keep adding blocks for 1_2_med, 1_2_hard, 1_3_easy, etc.!

    // ==========================================
    // UNIT 1.3: Linear & Quadratic Rates of Change
    // ==========================================
    "1_3_easy": {
        title: "Unit 1.3: Easy Practice",
        subtitle: "Focus: Identifying linear vs. quadratic functions from basic properties.",
        themeColor: "#27ae60",
        questions: [
            { q: "1. Over equal-length intervals, a linear function will always have an average rate of change that is:", opts: { A: "Increasing", B: "Decreasing", C: "Constant", D: "Zero" }, ans: "C", sol: "By definition, a linear function has a constant slope, meaning its average rate of change is the same (constant) over any interval of equal length." },
            { q: "2. If a function is quadratic, its average rates of change over consecutive equal-length intervals will form a sequence of numbers that are:", opts: { A: "All identical", B: "Changing at a constant rate", C: "Changing at an increasing rate", D: "Random" }, ans: "B", sol: "A defining characteristic of quadratic functions is that their rates of change are linear. This means the average rates of change themselves change by a constant amount (a constant rate of a rate)." },
            { q: "3. Analyze the table: x=(1,2,3,4), f(x)=(5,8,11,14). Is the function linear, quadratic, or neither?", opts: { A: "Linear", B: "Quadratic", C: "Neither", D: "Cannot be determined" }, ans: "A", sol: "Check the differences in the f(x) values. 8-5=3. 11-8=3. 14-11=3. Because the function changes by a constant amount (+3) over equal intervals, it is linear." },
            { q: "4. Which equation represents a function whose AROC over ANY interval of length 1 is exactly 5?", opts: { A: "f(x) = 5x²", B: "f(x) = x + 5", C: "f(x) = 5x - 2", D: "f(x) = x² + 5x" }, ans: "C", sol: "A constant average rate of change means the function is linear. f(x) = 5x - 2 is a linear function with a slope of 5." },
            { q: "5. A function g(x) is quadratic. If its graph opens upwards, what must be true about its average rates of change as x increases?", opts: { A: "They are constant", B: "They are decreasing", C: "They are increasing", D: "They are all positive" }, ans: "C", sol: "An upward-opening parabola is concave up. By definition, a function that is concave up has a rate of change that is strictly increasing." }
        ]
    },
    "1_3_med": {
        title: "Unit 1.3: Medium Practice",
        subtitle: "Focus: Analyzing tables to prove a function is quadratic.",
        themeColor: "#f39c12",
        questions: [
            { q: "1. Table: x=(0,1,2,3,4), h(x)=(2,5,10,17,26). What is the rate of change of the rate of change of h(x)?", opts: { A: "2", B: "3", C: "5", D: "1" }, ans: "A", sol: "First differences: 3, 5, 7, 9. Second differences (change between the rates): 5-3=2, 7-5=2, 9-7=2. The rate of the rate is a constant 2." },
            { q: "2. The AROCs of f(x) over consecutive intervals of length 2 are: 12, 8, 4, 0. What type of function could f(x) be?", opts: { A: "Linear", B: "Quadratic", C: "Exponential", D: "Square Root" }, ans: "B", sol: "8-12=-4. 4-8=-4. 0-4=-4. Because the rates of change are decreasing by a constant amount, the function has a constant rate of a rate of change (quadratic)." },
            { q: "3. Let p(x) = 3x² - 4x + 1. Find the AROC on [0, 1] and on [1, 2]. How much did the AROC increase by?", opts: { A: "3", B: "4", C: "6", D: "8" }, ans: "C", sol: "AROC on [0,1] is -1. AROC on [1,2] is 5. The rate changed from -1 to 5. The difference is 5 - (-1) = 6." },
            { q: "4. Table: x=(2,4,6,8), f(x)=(10, m, 26, 34). What value of 'm' makes the function linear?", opts: { A: "14", B: "16", C: "18", D: "20" }, ans: "C", sol: "Look at the last two points: from x=6 to x=8, f(x) goes from 26 to 34 (jump of +8). Working backwards, m must be 26 - 8 = 18." },
            { q: "5. True or False: If the first differences of a table are not constant, the function cannot be a polynomial.", opts: { A: "True", B: "False", C: "Only true if the interval length is 1", D: "Cannot be determined" }, ans: "B", sol: "False. Quadratic functions (polynomials of degree 2) have constant SECOND differences, not first differences." }
        ]
    },
    "1_3_hard": {
        title: "Unit 1.3: Hard Practice",
        subtitle: "Focus: Contextual modeling and real-world quadratic behavior.",
        themeColor: "#e74c3c",
        questions: [
            { q: "1. An object is dropped. Height h(t) = -4.9t² + 100. Which is true about its velocity (rate of change of height)?", opts: { A: "Velocity is constant", B: "Velocity decreases at a constant rate", C: "Velocity increases at a constant rate", D: "Velocity decreases at an increasing rate" }, ans: "B", sol: "The function is quadratic, so its rate of change (velocity) changes at a constant rate. Because it opens downward, the rates become increasingly negative." },
            { q: "2. A company's revenue R(x) is a quadratic function. If AROC is positive on [100, 200] and negative on [200, 300], what does this indicate?", opts: { A: "Revenue drops to zero", B: "There is a maximum possible revenue between x=100 and x=300", C: "The company loses money after 200", D: "Price is constantly increasing" }, ans: "B", sol: "A positive rate transitioning to a negative rate creates a peak, meaning there is a maximum revenue point." },
            { q: "3. A student models data with y = ax² + bx + c. AROCs over consecutive intervals of length 1 are: 10, 6, 2, -2. What is 'a'?", opts: { A: "-2", B: "-4", C: "2", D: "Cannot be determined" }, ans: "A", sol: "Second difference: 6-10 = -4. For a quadratic over intervals of length 1, the second difference equals 2a. 2a = -4, so a = -2." },
            { q: "4. Car A's distance is linear. Car B's distance is quadratic. They are side-by-side at t=5s. Who is further ahead at t=10s?", opts: { A: "Car A", B: "Car B", C: "Tied", D: "Not enough info" }, ans: "B", sol: "Car A has constant velocity. Car B has increasing velocity (accelerating). If they meet at t=5, Car B is moving faster at that moment and will pull ahead." },
            { q: "5. Let f(x) be a quadratic function with a negative leading coefficient. As x increases, the sequence of average rates of change over equal intervals will form:", opts: { A: "An increasing arithmetic sequence", B: "A decreasing arithmetic sequence", C: "A geometric sequence", D: "A constant sequence" }, ans: "B", sol: "Quadratic implies the rates of change form an arithmetic sequence (changing by a constant amount). Negative leading coefficient means concave down, so the slopes (rates) are decreasing." }
        ]
    },

    // ==========================================
    // UNIT 1.4: Polynomial Functions and Rates of Change
    // ==========================================
    "1_4_easy": {
        title: "Unit 1.4: Easy Practice",
        subtitle: "Focus: Understanding degree and successive differences.",
        themeColor: "#27ae60",
        questions: [
            { q: "1. A polynomial function of degree 3 (cubic) will have constant values for its:", opts: { A: "First differences", B: "Second differences", C: "Third differences", D: "Fourth differences" }, ans: "C", sol: "A fundamental property of polynomials is that a polynomial of degree n will have constant nth differences over equal-length intervals." },
            { q: "2. If you are analyzing a table of values over equal x-intervals and the 4th differences are constant (and non-zero), what is the lowest possible degree of the polynomial?", opts: { A: "Degree 2", B: "Degree 3", C: "Degree 4", D: "Degree 5" }, ans: "C", sol: "Because the 4th differences are the first level to become constant, the polynomial must be of degree 4 (quartic)." },
            { q: "3. True or False: If the 3rd differences of a function's table are exactly 0, the function MUST be a cubic polynomial.", opts: { A: "True", B: "False", C: "Only if x>0", D: "Cannot determine" }, ans: "B", sol: "False. If the 3rd differences are 0, it means the 2nd differences are constant. Therefore, the function is quadratic (degree 2) or linear (degree 1), not cubic." },
            { q: "4. Let f(x) = x³. As x increases, how does the average rate of change of f(x) behave?", opts: { A: "It remains constant", B: "It changes at a constant rate", C: "It changes at a non-constant rate", D: "It alternates" }, ans: "C", sol: "Only quadratics have rates of change that change at a constant rate. A cubic function's rate of change will change at a rate that is itself changing." },
            { q: "5. A polynomial has constant 5th differences. What is its degree?", opts: { A: "3", B: "4", C: "5", D: "6" }, ans: "C", sol: "Constant nth differences correspond directly to a polynomial of degree n." }
        ]
    },
    "1_4_med": {
        title: "Unit 1.4: Medium Practice",
        subtitle: "Focus: Calculating higher-order differences from tables.",
        themeColor: "#f39c12",
        questions: [
            { q: "1. Analyze the table for f(x): x=(1,2,3,4,5), f(x)=(1, 8, 27, 64, 125). Which level of differences will be constant?", opts: { A: "First", B: "Second", C: "Third", D: "Fourth" }, ans: "C", sol: "These are perfect cubes (f(x) = x³). Since it is a degree 3 polynomial, the third differences will be constant." },
            { q: "2. A table's 1st differences are: 2, 8, 18, 32. What is the degree of the polynomial?", opts: { A: "Degree 2", B: "Degree 3", C: "Degree 4", D: "Not a polynomial" }, ans: "B", sol: "1st diff: 2, 8, 18, 32. 2nd diff (change in 1st): 6, 10, 14. 3rd diff (change in 2nd): 4, 4. Because the 3rd differences are constant, it is a cubic (Degree 3)." },
            { q: "3. If a cubic function has a positive leading coefficient, what will be true about its third differences over intervals of length 1?", opts: { A: "They will be positive constants", B: "They will be negative constants", C: "They will be zero", D: "They will alternate" }, ans: "A", sol: "For a polynomial of degree n, the constant nth difference is n! * a (where 'a' is the leading coefficient). If 'a' is positive, the constant difference will be positive." },
            { q: "4. You are given a table with 6 data points (x_1 through x_6). What is the highest level of successive differences you can calculate?", opts: { A: "3rd differences", B: "4th differences", C: "5th differences", D: "6th differences" }, ans: "C", sol: "Each level of differences consumes one data point. 6 points yield 5 first differences, 4 second differences, 3 third, 2 fourth, and 1 fifth difference." },
            { q: "5. A polynomial f(x) has a constant 4th difference of 24. What is the leading coefficient of f(x) if the interval length is 1?", opts: { A: "1", B: "4", C: "6", D: "24" }, ans: "A", sol: "The constant nth difference equals n! * a. Here, 4! * a = 24. Since 4! = 4 * 3 * 2 * 1 = 24, we have 24 * a = 24, so a = 1." }
        ]
    },
    "1_4_hard": {
        title: "Unit 1.4: Hard Practice",
        subtitle: "Focus: Reconstructing polynomials and deep rate analysis.",
        themeColor: "#e74c3c",
        questions: [
            { q: "1. The 1st differences of a polynomial function are linear. What is the degree of the original polynomial?", opts: { A: "Degree 1", B: "Degree 2", C: "Degree 3", D: "Degree 4" }, ans: "B", sol: "If the 1st differences are linear, then the 2nd differences (the rate of change of the 1st differences) must be constant. A function with constant 2nd differences is a quadratic (degree 2)." },
            { q: "2. The volume of a cube as a function of its side length s is V(s) = s³. By how much does the AROC of V(s) on [2, 3] exceed the AROC on [1, 2]?", opts: { A: "7", B: "12", C: "19", D: "26" }, ans: "B", sol: "AROC [1,2] = (8-1)/1 = 7. AROC [2,3] = (27-8)/1 = 19. The difference between these rates is 19 - 7 = 12." },
            { q: "3. A data analyst models a trend using a cubic function. They find the 3rd difference over an interval of length 1 is -12. What is the leading coefficient?", opts: { A: "-2", B: "-3", C: "-4", D: "-12" }, ans: "A", sol: "The nth difference is n! * a. For a cubic, n=3, so 3! = 6. We have 6 * a = -12, which means a = -2." },
            { q: "4. Let p(x) be a degree 4 polynomial. How many times can the sign of its average rate of change flip?", opts: { A: "At most 1 time", B: "At most 2 times", C: "At most 3 times", D: "At most 4 times" }, ans: "C", sol: "The rate of change is modeled by the derivative, which is a degree 3 polynomial. A degree 3 polynomial can cross the x-axis (change sign) a maximum of 3 times." },
            { q: "5. A sequence of 1st differences for a function f(x) is: 1, 7, 19, 37, 61. Assuming x increases by 1, find the constant difference.", opts: { A: "6 (2nd diff)", B: "12 (3rd diff)", C: "6 (3rd diff)", D: "12 (4th diff)" }, ans: "C", sol: "1st: 1, 7, 19, 37, 61. 2nd diff: 6, 12, 18, 24. 3rd diff: 6, 6, 6. The constant difference is 6 at the 3rd level." }
        ]
    }
};
