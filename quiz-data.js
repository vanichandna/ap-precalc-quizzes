// quiz-data.js

export const masterCurriculum = {
    // UNIT 1.1 DATA
    "1_1_easy": {
        title: "Unit 1.1: Easy Practice",
        subtitle: "Focus: Calculating and identifying Average Rates of Change.",
        themeColor: "#27ae60", // Green
        questions: [
            { {
    q: "1. A function f(x) passes through the points (1, 5) and (4, 17). What is the average rate of change of f(x) on the interval [1, 4]?",
    opts: { A: "12", B: "4", C: "3", D: "6" },
    ans: "B",
    sol: "Use the formula (y2 - y1) / (x2 - x1). Plugging in the points: (17 - 5) / (4 - 1) = 12 / 3 = 4."
  },
  {
    q: `2. Consider the table of values for a continuous function g(x):
        <table style="margin-top:10px;"><tr><th>x</th><td>0</td><td>2</td><td>4</td><td>6</td></tr><tr><th>g(x)</th><td>10</td><td>7</td><td>4</td><td>1</td></tr></table>
        Which of the following describes how g(x) changes in tandem with x?`,
    opts: { 
        A: "As x increases, g(x) increases at a constant rate.", 
        B: "As x increases, g(x) decreases at a decreasing rate.", 
        C: "As x increases, g(x) decreases at a constant rate.", 
        D: "As x increases, g(x) decreases at an increasing rate." 
    },
    ans: "C",
    sol: "Calculate the average rate of change for each interval. From x=0 to 2, ROC is (7-10)/2 = -1.5. From x=2 to 4, ROC is (4-7)/2 = -1.5. Because the rate of change is constant and negative, g(x) decreases at a constant rate."
  },
  {
    q: "3. If the average rate of change of a function h(x) over the interval [2, 5] is negative, which of the following MUST be true?",
    opts: { 
        A: "h(5) is less than h(2)", 
        B: "h(5) is greater than h(2)", 
        C: "The function is decreasing at every single point between x=2 and x=5", 
        D: "The graph of h(x) is concave down" 
    },
    ans: "A",
    sol: "Average rate of change only looks at the endpoints. If the overall rate of change is negative, the y-value at the end of the interval, h(5), must be strictly lower than the y-value at the start of the interval, h(2)."
  },
  {
    q: "4. Let p(x) = x&sup2; + 2x. What is the average rate of change of p(x) over the interval [-1, 3]?",
    opts: { A: "4", B: "8", C: "16", D: "2" },
    ans: "A",
    sol: "Evaluate the endpoints: p(3) = (3)&sup2; + 2(3) = 9 + 6 = 15. Then p(-1) = (-1)&sup2; + 2(-1) = 1 - 2 = -1. The rate is (15 - (-1)) / (3 - (-1)) = 16 / 4 = 4."
  },
  {
    q: "5. A function m(x) has a constant rate of change of 0 over the interval [-5, 5]. Which of the following best describes the graph of m(x) on this interval?",
    opts: { A: "A vertical line", B: "A perfectly flat horizontal line", C: "A line passing through the origin", D: "A parabola opening upwards" },
    ans: "B",
    sol: "A constant rate of change of 0 means the y-values never increase or decrease as x changes. Graphically, this is a horizontal line."
  }
        ]
    },
    "1_1_med": {
        title: "Unit 1.1: Medium Practice",
        subtitle: "Focus: Analyzing rates of rates and determining concavity.",
        themeColor: "#f39c12", // Orange
        questions: [
            {
    q: "1. A function h(x) is strictly increasing on the interval (a, b). If the rate at which h(x) increases is getting smaller as x increases, what must be true about the graph of h(x)?",
    opts: { A: "It is concave up.", B: "It is concave down.", C: "It is linear.", D: "It has a vertical asymptote." },
    ans: "B",
    sol: "When a function is increasing at a decreasing rate, its slopes are positive but getting less steep over time. Graphically, this creates a curve that bends downwards, which is the definition of concave down."
  },
  {
    q: `2. Use the table below to determine the concavity of the function k(x):
        <table style="margin-top:10px;"><tr><th>x</th><td>1</td><td>3</td><td>5</td><td>7</td></tr><tr><th>k(x)</th><td>5</td><td>9</td><td>17</td><td>33</td></tr></table>`,
    opts: { 
        A: "Concave up because the average rates of change are increasing.", 
        B: "Concave down because the average rates of change are decreasing.", 
        C: "Linear because the change in x is constant.", 
        D: "Concave down because the function values are positive." 
    },
    ans: "A",
    sol: "Calculate successive average rates of change over the intervals. [1, 3]: (9-5)/2 = 2. [3, 5]: (17-9)/2 = 4. [5, 7]: (33-17)/2 = 8. Because the rates of change (2, 4, 8) are strictly increasing, the function is concave up."
  },
  {
    q: `3. Analyze the following table for a continuous function w(x):
        <table style="margin-top:10px;"><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>w(x)</th><td>20</td><td>10</td><td>4</td><td>1</td></tr></table>
        Which of the following describes the behavior of w(x)?`,
    opts: {
        A: "Decreasing at a decreasing rate",
        B: "Decreasing at an increasing rate",
        Rates: "Increasing at a decreasing rate",
        D: "Increasing at an increasing rate"
    },
    ans: "B",
    sol: "Calculate the rates of change. [0, 1]: -10. [1, 2]: -6. [2, 3]: -3. The function values are going down (decreasing). However, the rates of change (-10, -6, -3) are becoming strictly larger numbers. Therefore, it is decreasing at an increasing rate (concave up)."
  },
  {
    q: "4. If a secant line connecting the points (a, f(a)) and (b, f(b)) lies entirely ABOVE the graph of f(x) for all x in the interval (a, b), what is the concavity of f(x) on this interval?",
    opts: { A: "Concave up", B: "Concave down", C: "Linear", D: "Cannot be determined" },
    ans: "A",
    sol: "By definition, if a graph is concave up (bending upwards like a cup), any secant line drawn between two points on the curve will pass 'above' the actual curve itself."
  },
  {
    q: "5. Function A and Function B both start at the point (0, 0) and end at (10, 100). Function A increases at a constant rate. Function B increases at an increasing rate. Which function has a lower y-value at x = 5?",
    opts: { A: "Function A", B: "Function B", C: "They have the same y-value", D: "Not enough information" },
    ans: "B",
    sol: "Function A is a straight line. Function B increases at an increasing rate (concave up), meaning it grows slowly at first and very fast at the end. Because it lags behind initially to save its rapid growth for the end, Function B will be lower than Function A at the halfway point."
  }
        ]
    },
    "1_1_hard": {
        title: "Unit 1.1: Hard Practice",
        subtitle: "Focus: Contextual models and proportional reasoning.",
        themeColor: "#e74c3c", // Red
        questions: [
             {
    q: "1. A spherical balloon is being inflated such that its volume V increases at a constant rate with respect to time t. How does the radius r of the balloon change in tandem with time t?",
    opts: { 
        A: "The radius increases at a constant rate.", 
        B: "The radius increases at an increasing rate.", 
        C: "The radius increases at a decreasing rate.", 
        D: "The radius decreases at a decreasing rate." 
    },
    ans: "C",
    sol: "As the balloon gets larger, it requires significantly more volume to add just a tiny bit of length to the radius. Because the volume is entering at a constant speed, the outward growth of the radius must slow down as the balloon expands. Therefore, the radius increases at a decreasing rate (concave down)."
  },
  {
    q: "2. The variables x and y change in tandem such that for every increase of 2 in the value of x, the value of y is multiplied by 3. If y = 4 when x = 0, what is the value of y when x = 6?",
    opts: { A: "36", B: "108", C: "256", D: "324" },
    ans: "B",
    sol: "The x-values increase from 0 to 6 in steps of 2: 0 &rarr; 2 &rarr; 4 &rarr; 6. This is exactly three steps. Since y is multiplied by 3 for each step, we multiply the initial y-value by 3, three times. y = 4 * (3 * 3 * 3) = 4 * 27 = 108."
  },
  {
    q: "3. Water is poured into a conical cup (point facing down) at a constant rate. Let h(t) represent the height of the water in the cup at time t. Which of the following best describes the concavity of h(t)?",
    opts: { A: "Concave up", B: "Concave down", C: "Linear", D: "Cannot be determined" },
    ans: "B",
    sol: "Because the cone is wider at the top than at the bottom, it takes more water to raise the level by 1 inch at the top than it does at the narrow bottom. Since water enters at a constant rate, the height will rise quickly at first, and then slow down as the cup gets wider. An increasing function that is slowing down is concave down."
  },
  {
    q: "4. A car traveling at 60 mph suddenly slams on the brakes. Let d(t) be the total distance the car has traveled since the brakes were applied. Which of the following describes the rate of change of d(t)?",
    opts: { 
        A: "d(t) increases at an increasing rate", 
        B: "d(t) increases at a decreasing rate", 
        C: "d(t) decreases at an increasing rate", 
        D: "d(t) decreases at a decreasing rate" 
    },
    ans: "B",
    sol: "The car is still moving forward, so the total distance traveled, d(t), is increasing. However, because the brakes are applied, the car is slowing down. Therefore, the distance is increasing, but it is increasing at a decreasing rate as the car comes to a stop."
  },
  {
    q: "5. Company A and Company B both produce 500 units of a product per day. Company A decides to increase production by adding exactly 50 units per day. Company B decides to increase production by 10% per day. How do the rates of change compare over the first 5 days?",
    opts: { 
        A: "Both companies increase at a constant rate.", 
        B: "Company A increases at a constant rate, while Company B increases at an increasing rate.", 
        C: "Company A increases at an increasing rate, while Company B increases at a constant rate.", 
        D: "Both companies increase at an increasing rate." 
    },
    ans: "B",
    sol: "Company A adds a fixed amount (+50) every day, which defines a constant rate of change (linear). Company B multiplies its current total by 1.10 every day. As the total gets larger, 10% of that total also becomes a larger number, meaning Company B's growth rate accelerates over time (increasing at an increasing rate)."
  }
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
    },
    // ==========================================
    // UNIT 1.5: Polynomial Functions & Complex Zeros
    // ==========================================
    "1_5_easy": {
        title: "Unit 1.5: Easy Practice",
        subtitle: "Focus: The Fundamental Theorem of Algebra and basic multiplicity.",
        themeColor: "#27ae60",
        questions: [
            { q: "1. According to the Fundamental Theorem of Algebra, a polynomial of degree 4 must have exactly how many complex zeros (including repeated roots)?", opts: { A: "At least 1", B: "Exactly 3", C: "Exactly 4", D: "At most 4" }, ans: "C", sol: "A polynomial of degree n always has exactly n complex zeros, provided you count repeated roots based on their multiplicity." },
            { q: "2. If the graph of a polynomial function touches the x-axis at x = 3 and turns around (bounces) without crossing, what must be true about the zero at x = 3?", opts: { A: "It has an odd multiplicity", B: "It has an even multiplicity", C: "It is an imaginary zero", D: "It has a multiplicity of 1" }, ans: "B", sol: "Roots with an even multiplicity (like 2, 4, 6) will touch the x-axis and turn around. Roots with an odd multiplicity will cross through the x-axis." },
            { q: "3. A polynomial has real coefficients. If x = 2i is a zero of the polynomial, which of the following MUST also be a zero?", opts: { A: "x = 2", B: "x = -2", C: "x = -2i", D: "x = 0" }, ans: "C", sol: "The Conjugate Root Theorem states that if a polynomial has real coefficients, any non-real complex roots must come in conjugate pairs (a + bi and a - bi)." },
            { q: "4. Let f(x) = (x - 4)³(x + 1)². At which x-value will the graph cross straight through the x-axis?", opts: { A: "x = 4", B: "x = -4", C: "x = -1", D: "x = 1" }, ans: "A", sol: "The root x = 4 has an odd multiplicity (3), meaning the graph will cross the axis. The root x = -1 has an even multiplicity (2), meaning it will just touch and bounce." },
            { q: "5. If a polynomial has an odd degree and real coefficients, it MUST have at least:", opts: { A: "One imaginary root", B: "Two real roots", C: "One real root", D: "No real roots" }, ans: "C", sol: "Because complex roots must come in pairs, an odd degree polynomial cannot have ALL complex roots (an odd number can't be divided perfectly into pairs). Therefore, at least one root must be real." }
        ]
    },
    "1_5_med": {
        title: "Unit 1.5: Medium Practice",
        subtitle: "Focus: Factoring and finding complex roots algebraically.",
        themeColor: "#f39c12",
        questions: [
            { q: "1. What are the zeros of the function f(x) = x³ + 9x?", opts: { A: "x = 0, x = 3, x = -3", B: "x = 0, x = 3i, x = -3i", C: "x = 3i, x = -3i", D: "x = 0, x = 9" }, ans: "B", sol: "Factor out an x: x(x² + 9) = 0. The first root is x = 0. Set x² + 9 = 0 to get x² = -9, which gives the imaginary roots x = 3i and x = -3i." },
            { q: "2. A degree 3 polynomial has roots at x = 5 and x = 3 + i. What is the third root?", opts: { A: "x = -5", B: "x = -3 + i", C: "x = 3 - i", D: "x = -3 - i" }, ans: "C", sol: "Complex roots must come in conjugate pairs. If 3 + i is a root, its conjugate, 3 - i, must be the missing third root." },
            { q: "3. Which of the following is a factored form of a polynomial with roots at x = 0, x = 2 (multiplicity 2), and x = -1?", opts: { A: "f(x) = x(x - 2)(x + 1)", B: "f(x) = x²(x - 2)(x + 1)", C: "f(x) = x(x - 2)²(x + 1)", D: "f(x) = x(x + 2)²(x - 1)" }, ans: "C", sol: "A root of 0 gives 'x'. A root of 2 with mult 2 gives '(x - 2)²'. A root of -1 gives '(x + 1)'." },
            { q: "4. What is the minimum degree of a polynomial with real coefficients whose zeros include x = 1 (multiplicity 3) and x = 4i?", opts: { A: "4", B: "5", C: "6", D: "7" }, ans: "B", sol: "We have x=1 three times (3 roots). We have x=4i. Because coefficients are real, we must also have the conjugate x=-4i. 3 + 1 + 1 = 5 total roots, so the minimum degree is 5." },
            { q: "5. Find the zeros of f(x) = x⁴ - 16.", opts: { A: "x = 2, -2", B: "x = 4, -4", C: "x = 2, -2, 2i, -2i", D: "x = 4, -4, 4i, -4i" }, ans: "C", sol: "Factor as a difference of squares: (x² - 4)(x² + 4). The first factor gives x = 2, -2. The second factor gives x² = -4, resulting in x = 2i, -2i." }
        ]
    },
    "1_5_hard": {
        title: "Unit 1.5: Hard Practice",
        subtitle: "Focus: Constructing polynomials from roots and graphical analysis.",
        themeColor: "#e74c3c",
        questions: [
            { q: "1. Construct the least degree polynomial with real coefficients and zeros at x = 0 and x = 1 - i.", opts: { A: "f(x) = x³ - 2x² + 2x", B: "f(x) = x³ + 2x² + 2x", C: "f(x) = x² - (1-i)x", D: "f(x) = x³ - x² + x" }, ans: "A", sol: "Roots are 0, 1-i, and 1+i. Factors are x, (x - (1-i)), and (x - (1+i)). Multiply the complex factors first: ((x-1) + i)((x-1) - i) = (x-1)² - i² = x² - 2x + 1 - (-1) = x² - 2x + 2. Multiply by x to get x³ - 2x² + 2x." },
            { q: "2. A 4th degree polynomial graph only touches the x-axis at x = 3 and x = -2, never crossing it. What is a possible equation for this graph?", opts: { A: "y = (x - 3)³(x + 2)", B: "y = (x + 3)²(x - 2)²", C: "y = (x - 3)²(x + 2)²", D: "y = (x - 3)⁴(x + 2)⁴" }, ans: "C", sol: "If it touches but never crosses, the roots must have even multiplicities. Since it is degree 4 and has two distinct roots, they must both have a multiplicity of 2. Factors: (x-3)² and (x+2)²." },
            { q: "3. The graph of a cubic polynomial has a local maximum at y = 5 and a local minimum at y = 1. How many REAL zeros does this polynomial have?", opts: { A: "0", B: "1", C: "2", D: "3" }, ans: "B", sol: "The entire 'wave' of the cubic happens above the x-axis (between y=1 and y=5). Because the ends of a cubic go to positive and negative infinity, it will only cross the x-axis once on its way down to negative infinity." },
            { q: "4. True or False: A polynomial with real coefficients can have exactly 3 non-real complex roots.", opts: { A: "True", B: "False", C: "Only if the degree is odd", D: "Only if the leading coefficient is negative" }, ans: "B", sol: "False. The Conjugate Root Theorem dictates that non-real complex roots must come in pairs (a ± bi). Therefore, the number of non-real complex roots must always be an even number." },
            { q: "5. Given f(x) = x⁴ + 3x² - 4. How many real and non-real zeros does it have?", opts: { A: "4 real", B: "4 non-real", C: "2 real, 2 non-real", D: "1 real, 3 non-real" }, ans: "C", sol: "Factor it like a quadratic: (x² + 4)(x² - 1) = 0. The first factor gives x² = -4 (two non-real roots: ±2i). The second factor gives x² = 1 (two real roots: ±1)." }
        ]
    },
    // ==========================================
    // THE MASTER EXAMS (Purple Theme)
    // ==========================================
    "1_1_master": {
        title: "Unit 1.1 Master Exam",
        subtitle: "Change in Tandem & Concavity Simulation.",
        themeColor: "#8e44ad",
        questions: [
            { q: "1. Let f(x) = -2x² + 4. What is the average rate of change on the interval [-1, 2]?", opts: { A: "-2", B: "-6", C: "-4", D: "2" }, ans: "A", sol: "f(2) = -8 + 4 = -4. f(-1) = -2 + 4 = 2. AROC = (-4 - 2) / (2 - (-1)) = -6 / 3 = -2." },
            { q: "2. Function g(x) is decreasing at a decreasing rate. What is its concavity?", opts: { A: "Concave Up", B: "Concave Down", C: "Linear", D: "Undefined" }, ans: "B", sol: "Decreasing means negative slopes. Decreasing at a decreasing rate means those negative slopes are getting steeper (more negative). This creates a downward-bending curve: Concave down." },
            { q: "3. If variables x and y change in tandem such that every +3 change in x results in y being multiplied by 1/2. If y=16 at x=0, what is y at x=9?", opts: { A: "8", B: "4", C: "2", D: "1" }, ans: "C", sol: "x goes 0 -> 3 -> 6 -> 9 (three steps). Multiply y by 1/2 three times: 16 * (1/2) * (1/2) * (1/2) = 16 * (1/8) = 2." },
            { q: "4. A secant line connects x=2 and x=5 on f(x). If f(x) is strictly concave down, where is the secant line relative to the graph?", opts: { A: "Above the graph", B: "Below the graph", C: "Intersecting the graph infinitely", D: "It is the same as the graph" }, ans: "B", sol: "For a concave down (downward-bending) curve, any straight line connecting two points on the curve will pass underneath the 'arch' of the curve." },
            { q: "5. A function's values are: (0, 10), (1, 8), (2, 5), (3, 1). This function is:", opts: { A: "Decreasing at an increasing rate", B: "Decreasing at a decreasing rate", C: "Increasing at a decreasing rate", D: "Increasing at an increasing rate" }, ans: "B", sol: "Rates are -2, -3, -4. The function is going down (decreasing), and the slopes are getting more negative (decreasing rate). Concave down." }
        ]
    },
    "1_2_master": {
        title: "Unit 1.2 Master Exam",
        subtitle: "Rates of Change & Contextual Models.",
        themeColor: "#8e44ad",
        questions: [
            { q: "1. The AROC of a continuous function f(x) on [2, 5] is 4. If f(2) = 10, what is f(5)?", opts: { A: "12", B: "14", C: "22", D: "30" }, ans: "C", sol: "Formula: (f(5) - 10) / (5 - 2) = 4.  (f(5) - 10) / 3 = 4.  f(5) - 10 = 12.  f(5) = 22." },
            { q: "2. The depth of snow S(t) in inches is recorded t hours after midnight. If the AROC on [2, 6] is 1.5, what are the units?", opts: { A: "Inches", B: "Hours", C: "Inches per hour", D: "Hours per inch" }, ans: "C", sol: "Rate of change units are Output / Input. Output is inches, input is hours. Inches per hour." },
            { q: "3. If f(x) is an increasing function, which of the following MUST be true?", opts: { A: "AROC on any interval is positive", B: "f(x) is concave up", C: "f(x) has a constant rate of change", D: "The x-intercept is positive" }, ans: "A", sol: "An increasing function always goes up from left to right. Therefore, the right endpoint will always be higher than the left, resulting in a positive AROC on any interval." },
            { q: "4. Compare AROC of g(x) = x² on [1, 3] and [3, 5].", opts: { A: "Equal", B: "Rate on [1, 3] is larger", C: "Rate on [3, 5] is larger", D: "Cannot determine" }, ans: "C", sol: "[1, 3]: (9-1)/2 = 4. [3, 5]: (25-9)/2 = 8. The rate on [3, 5] is larger because the parabola is getting steeper." },
            { q: "5. A runner's distance is concave up. What does this mean about their speed?", opts: { A: "Running at constant speed", B: "Slowing down", C: "Speeding up", D: "Running backwards" }, ans: "C", sol: "Speed is the rate of change of distance. Concave up means the rate of change is increasing. Therefore, the runner is speeding up." }
        ]
    },
    "1_3_master": {
        title: "Unit 1.3 Master Exam",
        subtitle: "Linear & Quadratic Function Identification.",
        themeColor: "#8e44ad",
        questions: [
            { q: "1. A function has consecutive AROCs of: 10, 10, 10. The function is:", opts: { A: "Linear", B: "Quadratic", C: "Cubic", D: "Exponential" }, ans: "A", sol: "Constant first differences (AROCs) perfectly define a linear function." },
            { q: "2. A function has consecutive AROCs of: 3, 7, 11, 15. The function is:", opts: { A: "Linear", B: "Quadratic", C: "Cubic", D: "Exponential" }, ans: "B", sol: "The AROCs are changing by a constant amount (+4). A constant rate of a rate of change defines a quadratic function." },
            { q: "3. Let f(x) = ax² + bx + c. If the parabola opens downward, its sequence of AROCs over equal intervals will:", opts: { A: "Increase", B: "Decrease", C: "Remain constant", D: "Alternate signs" }, ans: "B", sol: "A downward opening parabola is concave down. Its slopes (rates of change) go from positive to negative, meaning they are strictly decreasing." },
            { q: "4. Which equation has an AROC that increases by exactly 6 for every unit interval?", opts: { A: "y = 6x", B: "y = 3x²", C: "y = 6x²", D: "y = x³" }, ans: "B", sol: "For y = ax², the second difference (the change in the AROC) over intervals of length 1 is 2a. If 2a = 6, then a = 3." },
            { q: "5. True or False: All quadratic functions have a constant first difference.", opts: { A: "True", B: "False", C: "Only if vertex is at origin", D: "Cannot determine" }, ans: "B", sol: "False. Linear functions have constant first differences. Quadratics have constant SECOND differences." }
        ]
    },
    "1_4_master": {
        title: "Unit 1.4 Master Exam",
        subtitle: "Polynomial Degrees and Successive Differences.",
        themeColor: "#8e44ad",
        questions: [
            { q: "1. A polynomial function has constant, non-zero 4th differences. What is its degree?", opts: { A: "3", B: "4", C: "5", D: "16" }, ans: "B", sol: "The level of the constant difference corresponds exactly to the degree of the polynomial." },
            { q: "2. If the 3rd differences of a table are constantly 24, what is the leading coefficient 'a' of the cubic model?", opts: { A: "1", B: "2", C: "4", D: "6" }, ans: "C", sol: "The nth difference is n! * a. Here, 3! * a = 24.  6 * a = 24, so a = 4." },
            { q: "3. How many times can the sign of the average rate of change of a cubic function flip?", opts: { A: "0", B: "1", C: "2", D: "3" }, ans: "C", sol: "The AROC of a cubic is modeled by a quadratic (degree 2). A quadratic can cross the x-axis (change sign) a maximum of 2 times." },
            { q: "4. First differences are: 1, 8, 27, 64. What is the lowest possible degree of the polynomial?", opts: { A: "2", B: "3", C: "4", D: "5" }, ans: "C", sol: "These differences are perfect cubes. 2nd diff: 7, 19, 37. 3rd diff: 12, 18. 4th diff: 6. Because the 4th diff is constant, it is degree 4." },
            { q: "5. Why do cubic functions NOT have constant second differences?", opts: { A: "Because they are not polynomials", B: "Because their rates of change are changing at a non-constant rate", C: "Because they have asymptotes", D: "Because they are linear" }, ans: "B", sol: "Constant second differences belong exclusively to quadratics. A cubic's rate of change (first difference) is a parabola, meaning its rate of change (second difference) is a line, which is not constant." }
        ]
    }
    "1_5_master": {
        title: "Unit 1.5 Master Exam",
        subtitle: "Complex Zeros, Multiplicities, and Conjugates.",
        themeColor: "#8e44ad",
        questions: [
            { q: "1. A degree 6 polynomial with real coefficients has roots at x = 2, x = i, and x = 3 - 2i. What are the other roots?", opts: { A: "x = -i, x = 3 + 2i", B: "x = -i, x = 3 + 2i, and one unknown real root", C: "x = -2, x = -i, x = 3 + 2i", D: "It cannot be determined" }, ans: "B", sol: "We have 3 given roots. Complex roots come in pairs, so -i and 3+2i are also roots (making 5 total). Because it is degree 6, the final 6th root must be a real number (or a repeat of x=2)." },
            { q: "2. The polynomial p(x) = (x - 5)³(x² + 16) has how many real and non-real complex roots?", opts: { A: "1 real, 2 non-real", B: "3 real, 2 non-real", C: "3 real, 4 non-real", D: "1 real, 4 non-real" }, ans: "B", sol: "The factor (x - 5)³ provides the real root x = 5 with a multiplicity of 3 (so 3 real roots total). The factor (x² + 16) provides x = ±4i (2 non-real roots)." },
            { q: "3. Write the equation for a cubic function that passes through the origin, is tangent to the x-axis at x = 4, and passes through the point (2, 8).", opts: { A: "y = x(x - 4)²", B: "y = 2x(x - 4)²", C: "y = x²(x - 4)", D: "y = 0.5x(x - 4)²" }, ans: "A", sol: "Passes origin: x is a factor. Tangent at 4: (x-4)² is a factor. Equation is y = a*x*(x-4)². Plug in (2, 8): 8 = a(2)(-2)².  8 = 8a, so a=1. Equation is y = x(x-4)²." },
            { q: "4. A polynomial crosses the x-axis at x = -2 and bounces off the x-axis at x = 1. Which of the following could be its equation?", opts: { A: "y = (x + 2)²(x - 1)", B: "y = (x - 2)(x + 1)²", C: "y = (x + 2)(x - 1)²", D: "y = (x + 2)³(x - 1)³" }, ans: "C", sol: "Crosses at -2 means (x+2) must have an odd power (like 1). Bounces at 1 means (x-1) must have an even power (like 2). This matches (x+2)(x-1)²." },
            { q: "5. Find all roots of f(x) = x³ - x² + x - 1.", opts: { A: "x = 1, i, -i", B: "x = 1, -1", C: "x = 1 (mult 3)", D: "x = -1, i, -i" }, ans: "A", sol: "Factor by grouping: x²(x - 1) + 1(x - 1) = (x² + 1)(x - 1). The roots are x = 1 (real) and x = ±i (non-real)." }
        ]
    }
};
