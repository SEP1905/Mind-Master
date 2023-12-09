const questions = [
    {
        question: "Which is the largest Ocean on Earth?",
        answers: [
            { text: "Southern" , correct: false},
            { text: "Atlantic", correct: false},
            { text: "Pacific", correct: true},
            { text: "Indian", correct: false},
        ]
    },
     {
        question: "Who is the king of the gods in Greek mythology?",
        answers: [
            {text:"Apollo", correct: false},
            {text:"Ares", correct: false},
            {text:"Jesus", correct: false},
            {text:"Zeus", correct: true},
        ]
    },
     {
    question: "How many colours in a Rainbow?",
        answers: [
            {text:"7", correct: true},
            {text:"4", correct: false},
            {text:"5" , correct: false},
            {text:"8", correct: false},
        ]
    },
     {
        question: "What country is the birthplace of Sushi?",
        answers: [
            {text:"South Korea", correct: false},
            {text:"New Zealand", correct: false},
            {text:"Japan", correct: true},
            {text:"USA", correct: false},
        ]
    },
     {
        question: "A human body has how many bones?",
        answers: [
            {text:"165", correct: false},
            {text:"206", correct: true},
            {text:"111 ", correct: false},
            {text:"314", correct: false},
        ]
    },

     { 
        question: "Which planet is the closest to Earth?",
        answers: [
            {text:"Venus", correct: true},
            {text:"Satturn", correct: false},
            {text:"Moon ", correct: false},
            {text:"Mars", correct: false},
        ]
    },
     {
        question: "What year did Neil Armstrong walk on the Moon?",
        answers: [
            {text:"1969", correct: true},
            {text:"2003", correct: false},
            {text:"1996", correct: false},
            {text:"1988", correct: false},
        ]
    },
    {
        question: "How many Continents are there?",
        answers: [
            {text:"7", correct: true},
            {text:"6", correct: false},
            {text:"11 ", correct: false},
            {text:"4", correct: false},
        ]
    },
    {
        question: "Value of Pi?",
        answers: [
            {text:"3.41", correct: false},
            {text:"4.31", correct: false},
            {text:"1.43", correct: false},
            {text:"3.14", correct: true},
        ]
    },
    {
        question: "What is the name of our Galaxy?",
        answers: [
            {text: "Cigar", correct: false},
            {text: "The Milky Way", correct: true},
            {text: "Whirlpool", correct: false},
            {text: "Fireworks", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

   currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
   });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}  

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();