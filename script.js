const levelButtons = document.querySelectorAll(".levelBtn button");
const nextButton = document.querySelector("#next");
const submitButton = document.querySelector("#submit");
const quizSection = document.querySelector(".quizSection");
const quizLevel = document.querySelector(".quizLevel");
const questionContainer = document.querySelector(".questionContainer");

const questions = {
    beginner: [
        {question: "Who was the first U.S. President?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], answer: 1},
        {question: "Which civilization built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Mayans"], answer: 2},
        {question: "What year did World War II end?",options: ["1918", "1939", "1945", "1950"],answer: 2},
        {
            question: "Which country gifted the Statue of Liberty to the United States?",
            options: ["France", "United Kingdom", "Spain", "Germany"],
            answer: 0
          },
          {
            question: "What was the name of the ship that carried the Pilgrims to America in 1620?",
            options: ["Mayflower", "Santa Maria", "Titanic", "Endeavour"],
            answer: 0
          }
    ],
    intermediate: [
        
            {
              question: "Which treaty ended World War I?",
              options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Tordesillas", "Treaty of Ghent"],
              answer: 1
            },
            {
                question: "Who was the first emperor of China?",
                options: ["Liu Bang", "Qin Shi Huang", "Kublai Khan", "Sun Yat-sen"],
                answer: 1
            },
            {
                question: "What year did the Roman Empire fall?",
                options: ["395 AD", "476 AD", "1066 AD", "1492 AD"],
                answer: 1
            },
            {
              question:"Which empire was ruled by Mansa Musa, known as the richest man in history?",
              options: ["Ottoman Empire", "Mongol Empire", "Mali Empire", "Byzantine Empire"],
              answer: 2
            },
            {
                question: "What was the primary reason for the start of the French Revolution in 1789?",
                options: ["Religious conflicts", "Economic crisis and inequality", "Colonial disputes", "Invasion by foreign powers"],
                answer: 1
            }
          ],

          advanced: [
                {
                  question: "Which ancient civilization developed the first known writing system, cuneiform?",
                  options: ["Egyptians", "Sumerians", "Phoenicians", "Babylonians"],
                  answer: 1
                },
                {
                  question: "The Taiping Rebellion, one of the deadliest conflicts in history, took place in which country?",
                  options: ["China", "India", "Russia", "Japan"],
                  answer: 0
                },
                {
                  question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
                  options: ["Joseph Stalin", "Nikita Khrushchev", "Leonid Brezhnev", "Mikhail Gorbachev"],
                  answer: 1
                },
                {
                  question: "The Treaty of Westphalia in 1648 is credited with establishing the modern concept of what?",
                  options: ["Democracy", "Nation-state sovereignty", "Colonialism", "Communism"],
                  answer: 1
                },
                {
                  question: "Which empire was defeated at the Battle of Lepanto in 1571?",
                  options: ["Ottoman Empire", "Spanish Empire", "Holy Roman Empire", "Byzantine Empire"],
                  answer: 0
                }
              ]       
};

let currentLevel = "";
let currentQuestionIndex = 0;
let score = 0;

levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentLevel = button.dataset.level;
        loadQuiz();
    });
});

function loadQuiz() {
    quizLevel.textContent = `${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Quiz`;
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    quizSection.classList.remove("hidden");
    nextButton.classList.add("hidden");
    submitButton.classList.add("hidden");
}

function showQuestion() {
    const questionData = questions[currentLevel][currentQuestionIndex];
    questionContainer.innerHTML = `
        <p>${currentQuestionIndex + 1}. ${questionData.question}</p>
        <div class="options">
            ${questionData.options.map((option, index) => 
                `<button class="option-btn" data-index="${index}">${option}</button>`
            ).join("")}
        </div>
    `;
    
    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", () => checkAnswer(button));
    });

    nextButton.classList.add("hidden");
    submitButton.classList.toggle("hidden", currentQuestionIndex !== questions[currentLevel].length - 1);
}

function checkAnswer(button) {
    const selectedIndex = parseInt(button.dataset.index);
    const questionData = questions[currentLevel][currentQuestionIndex];

    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true); // Disable all buttons after selection

    if (selectedIndex === questionData.answer) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }

    if (currentQuestionIndex < questions[currentLevel].length - 1) {
        nextButton.classList.remove("hidden");
    } else {
        submitButton.classList.remove("hidden");
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions[currentLevel].length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
});

submitButton.addEventListener("click", showScore);

function showScore() {
    questionContainer.innerHTML = `
        <h2>Your Score</h2>
        <p>You scored <b>${score} / ${questions[currentLevel].length}</b> on the ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} level.</p>
    `;
    nextButton.classList.add("hidden");
    submitButton.classList.add("hidden");
}
