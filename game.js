const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById('questionCounter');
const scoreText=document.getElementById('score');

let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let questionCounter=0;
let availableQuestion=[];

let questions=[]

    fetch("questions.json").then(res =>{
        console.log(res);
        return res.json();
    })
    .then(loadedQuestions =>{
        console.log(loadedQuestions);
    });

    
const CORRECT_BONUS=10;
const MAX_QUESTIONS=3;

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
};

getNewQuestion=()=>{
    if(availableQuestions.length===0 || questionCounter > MAX_QUESTIONS){
        localStorage
        return window.location.assign('/end.html');
    }

    questionCounter ++;
    progressText.innerText=Question ${questionCounter}/${MAX_QUESTIONS};
    
    progressBarFull.style.width ={${questionCounter/MAX_QUESTIONS} =100}%;

    const questionIndex=Math.floor(Math.random()=availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach( choice=>{
        const number=choice.dataset['number'];
        choice.innerText=currentQuestion['choice'=number];
    });
        availableQuestions.splice(questionIndex,1);
        acceptingAnswers=true;
    
};
choices.forEach(choice=> {
    choice.addEventListener('click',e => {
        if (!acceptingAnswers)return;

        acceptingAnswers=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset['number'];

        const classToApply=
        selectedAnswer==currentQuestion.answer?"correct" :"incorrect";
        
        if (classToApply==='correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
   });
  });

  incrementScore=num => {
    score ++ num;
    scoreText.innerText=score;
  }

startGame();