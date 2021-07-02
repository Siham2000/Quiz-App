let countSpan =document.querySelector(".count span")
const containerBullets = document.querySelector('.bullets .spans')
const bullets = document.querySelector('.bullets ')
const quizArea = document.querySelector(".quiz-area")
const answerArea = document.querySelector(".answers-area")
const submitBtn = document.querySelector(".submit-button")
const resultContainer = document.querySelector(".results")
const countDownElem = document.querySelector(".countdown")

let currentIndex=0;
let rightAnswers= 0;
let countInterveal ;


function getQuestion(){

        const xhr = new XMLHttpRequest()
        xhr.onload = function(){
        if(this.readyState  === 4 && this.status === 200){
        let jasonText = JSON.parse(this.responseText)  
        let qCount =jasonText.length
        createBullets(qCount)
        addQuestionData(jasonText[currentIndex] , qCount)
        countDown(15 , qCount)
        submitBtn.addEventListener("click", ()=>{
        let rightAnswer = jasonText[currentIndex].right_answer
        currentIndex++

        checkAnswer(rightAnswer, qCount)

        quizArea.innerHTML=""
        answerArea.innerHTML = ""
        addQuestionData(jasonText[currentIndex] , qCount)

        handelBullets()
        clearInterval(countInterveal)
        countDown(15 , qCount)

        showResult(qCount);


        })
        }
        }

        xhr.open("GET" , "question.json")
        xhr.send()

}



getQuestion()

function createBullets(num){
    countSpan.innerHTML =num

    //creatSpans
    for(let i=0 ;i<num; i++){
    let bullets = document.createElement("span")
        if(i === 0 ){
        bullets.classList.add("on")
        }
    containerBullets.append(bullets)

    }

}






function addQuestionData(obj , count){
    if(currentIndex < count){
        //create h2 question
        let qTitle = document.createElement("h2")
        let qText = document.createTextNode(obj.title)
        qTitle.append(qText)
        quizArea.append(qTitle)


        for(let i=1; i<=4 ;i++){

            let mainDiv =document.createElement("div")
            mainDiv.classList.add("answer")

            let radioInput = document.createElement("input")
            radioInput.name = "question"
            radioInput.type = "radio"
            radioInput.id = `answer_${i}` 
            radioInput.dataset.answer = obj[`answer_${i}`]

            if(i === 1){
            radioInput.checked = true
            }



            let lable =document.createElement("lable")
            let answerString =  `answer_${i}`
            lable.setAttribute("for" , answerString)
            let lableText =document.createTextNode(obj[`answer_${i}`])
            lable.append(lableText)

            mainDiv.append(radioInput , lable )

            answerArea.append(mainDiv)

    }



}

}

function checkAnswer(raAnswer , count){

    let answers = document.getElementsByName("question")
    let choeosenAnswe;

    for(let i=0 ; i<answers.length ; i++){
        if(answers[i].checked){
        choeosenAnswe = answers[i].dataset.answer
        }
    }

    if(raAnswer === choeosenAnswe){
    rightAnswers++
    }


}




function handelBullets(){

    let bulletsSpans = document.querySelectorAll(".bullets .spans span")
    let bulletsSpansArry = [...bulletsSpans]

    bulletsSpansArry.forEach((span , index) =>{
        if(currentIndex === index){
        span.classList.add("on")
        }
    })
}



function showResult(count){
    let finalResult ;
    if(currentIndex === count){
        quizArea.remove()
        answerArea.remove()
        submitBtn.remove()
        bullets.remove()

        if (rightAnswers > count / 2 && rightAnswers < count) {
        finalResult = ` ${rightAnswers} from ${count} <br><span class="perfect">Perfect</span>, All Answers Is Good`;

        } else if (rightAnswers === count) {finalResult `${rightAnswers} from ${count} <br><span class="perfect">Perfect 🤩</span>`

        } else {finalResult = ` ${rightAnswers} from ${count} <br> <span class="bad">Bad 😔 you can do more than this try Again</span>`}


        resultContainer.innerHTML = finalResult
        resultContainer.style.padding = "10px"
        resultContainer.style.margin = "10px auto"
        resultContainer.style.textAlign = "center"
        resultContainer.style.backgroundColor = "#fff"




    }
}


function countDown (duraion , count){
    if(currentIndex < count){
        let min,sec ; 
        countInterveal = setInterval(()=>{
            min = parseInt(duraion/60);
            sec =  parseInt(duraion% 60);
            min = min < 10 ?  `0${min}` :min
            sec = sec < 10 ?  `0${sec}` :sec

            countDownElem.innerHTML = `${min}:${sec}`

            if(--duraion < 0){
                clearInterval(countInterveal)
                submitBtn.click()
            } 

        }, 1000)

    }

}