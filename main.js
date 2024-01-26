//questions array
const questions = [
    {
        question : ' who discovered sea route to india?',
        answers: [
            {text: 'vasco de gama', correct: true},
            {text:  'columbus', correct: false},
            {text: 'Amerigo Vespucci', correct: false},
            {text: 'Marco Polo', correct: false},
        ],
    },
    {
        question : ' Who is also known as the Iron Man of India?',
        answers:[
            {text:'Lal Bahadur Shastri', correct: false},
            {text:'Murli Manohar Joshi', correct: false},
            {text:'Sardar Vallabhbhai Patel', correct: true},
            {text:'Subhas Chandra Bose', correct: false}
        ]
    },
    {
        question : ' Who wrote Vande Mataram?',
        answers:[
            {text:  'Rabindranath Tagore', correct: false},
            {text:  'Bankim Chandra Chattopadhyay', correct: true},
            {text:  'Sharat Chandra Chattopadhyay', correct: false},
            {text:  'Mahatma Gandhi', correct: false}
        ]
    },
]

const questionElement = document.getElementById('question')
const answerBtns = document.getElementById('answer-btns')
const nextBtn = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'next'
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerBtns.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click', selectAnswer)
    })
}

function resetState(){
    nextBtn.style.display = 'none'
    //we can use this to reset answer btns inner child instead of while loop
    //answerBtns.innerHTML = ''
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target 
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++
    }else{
        selectedBtn.classList.add('incorrect')
    }


    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true
    })

    nextBtn.style.display = 'block'
}

function showScore(){
    resetState()
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`
    nextBtn.innerHTML = 'restart'
    nextBtn.style.display = 'block'
}

function handleNextBtn(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextBtn.addEventListener('click', function(){
    if(currentQuestionIndex < questions.length){
        handleNextBtn()
    }else{
        startQuiz()
    }
})


startQuiz()
