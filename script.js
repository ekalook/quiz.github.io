const questions = [
    {
        question: "Which of the following is the wateriest river?",
        answers: [
            { text: "Mississippi", correct: false},
            { text: "Congo", correct: true},
            { text: "Madeira", correct: false},
            { text: "Orinoco", correct: false}
        ]
    },
    {
        question: "What is the world's largest lake by area?",
        answers: [
            { text: "Victoria", correct: false},
            { text: "Caspian sea", correct: true},
            { text: "Baikal", correct: false},
            { text: "Tanganyika", correct: false}
        ] 
    },
    {
        question: "Which African country has the largest population?",
        answers: [
            { text: "Egypt", correct: false},
            { text: "Ethiopia", correct: false},
            { text: "South Africa", correct: false},
            { text: "Nigeria", correct: true}
        ]
    },
    {
        question: "In honor of the Queen of Great Britain, which traveler named the famous falls Victoria?",
        answers: [
            { text: "Marco Polo", correct: false},
            { text: "Vasco da Gama", correct: false},
            { text: "James Cook", correct: false},
            { text: "David Livingston", correct: true}
        ]
    },
    {
        question: "Finally, which of the following is the capital city of Brunei?",
        answers: [
            { text: "Jakarta", correct: false},
            { text: "Bandar-Seribegawan", correct: true},
            { text: "Phnom Penh", correct: false},
            { text: "Delhi", correct: false}
        ]
    }
];



const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")
const nextbtn = document.getElementById("next-btn")


let currentQuestInx = 0
let score = 0

function startQuiz() {
    currentQuestInx = 0
    score = 0
    nextbtn.innerHTML = "Next"
    showQuestions()
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestInx];
    let questionNo = currentQuestInx + 1;
    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button  = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtonsEl.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}


function resetState() {
    nextbtn.style.display = "none"
    while(answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtonsEl.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextbtn.style.display = "block"
}

function showScore(){
    resetState()
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextbtn.innerHTML = "Play Again"
    nextbtn.style.display = "block"
}

function handleNextButton() {
    currentQuestInx++
    if(currentQuestInx < questions.length) {
        showQuestions()
    }else{
        showScore()
    }
}

nextbtn.addEventListener("click", () => {
    if(currentQuestInx <questions.length) {
        handleNextButton()
    }else {
        startQuiz()
    }
})
startQuiz()

