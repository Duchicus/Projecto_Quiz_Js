const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const results = document.getElementById("results")
const hideresult = document.getElementById("hide-result")

let currentQuestionIndex = -1;
let InfoGeneralApi
let puntos = 0  

//Primera funcion la cual escondera el boton "START" y te mostrara las preguntas
const startGame = infoApi => {
  startButton.classList.add("hide");
  currentQuestionIndex;
  questionContainerElement.classList.remove("hide");
  setNextQuestion(infoApi, currentQuestionIndex)
}

const showQuestion = (question, currentQuestionIndex) => {

    if(currentQuestionIndex < 10){
      questionElement.innerHTML = `<p style="font-size:40px">¿Quien es?</p><img src=${question[currentQuestionIndex].image}></img`;
      
      console.log(question)
      let only4answers = 0
      let arrayknowrepeatanswers = []
      question.forEach(() => {
        if(only4answers < 4){
         const positioncorrect = Math.floor(Math.random() * 4)

          if(positioncorrect === only4answers){

            if(arrayknowrepeatanswers.includes(question[currentQuestionIndex].name) === false){
              const buttoncorrect = document.createElement("button");
              buttoncorrect.innerText = question[currentQuestionIndex].name;
              answerButtonsElement.appendChild(buttoncorrect);
              arrayknowrepeatanswers.push(question[currentQuestionIndex].name)
              buttoncorrect.addEventListener("click",()=>answers(question[currentQuestionIndex].name, buttoncorrect.textContent, buttoncorrect))
            }else{
              only4answers--
            }
            
          }else{
            const randomnumber = Math.floor(Math.random() * 10);
            if(arrayknowrepeatanswers.includes(question[randomnumber].name) === false){
              const buttonincorrect = document.createElement("button");
              buttonincorrect.innerText = question[randomnumber].name;
              answerButtonsElement.appendChild(buttonincorrect);
              arrayknowrepeatanswers.push(question[randomnumber].name)
              buttonincorrect.addEventListener("click",()=>answers(question[currentQuestionIndex].name, buttonincorrect.textContent, buttonincorrect))  
            }else{
              only4answers--
            }
          }
        }
        only4answers++
    });

    }else{
      questionElement.innerText = ""
      hideresult.classList.remove("hide")
      results.innerHTML = `<h5 class="card-title">Resultado del Quiz</h5>
      <p class="card-text">Has obtenido un puntaje de ${puntos}/10 en el quiz.</p>
      <p class="card-text">Sigue mejorando :)</p>`
    }
  }

const setNextQuestion = infoApi => {
    currentQuestionIndex += 1
    answerButtonsElement.innerHTML = ""
    answerButtonsElement.classList.remove("disable")
    showQuestion(infoApi, currentQuestionIndex);
}

const answers = (correct_answer, answer_selected, button) =>{
        if(answer_selected === correct_answer){

            button.classList.add("green")
            button.classList.add("disable")
            answerButtonsElement.classList.add("disable")
            puntos++
            setTimeout(() => {
              setNextQuestion(InfoGeneralApi)
            }, "2000");
        }else{
            button.classList.add("red")
            answerButtonsElement.classList.add("disable")
            setTimeout(() => {
              setNextQuestion(InfoGeneralApi)
            }, "2000");
        }
}
  
  
startButton.addEventListener("click", ()=>startGame(InfoGeneralApi));

let randomlink = Math.floor(Math.random() * 20)
axios.get(`https://rickandmortyapi.com/api/character/?page=${randomlink}`)
  
 .then((res) => {
    InfoGeneralApi = res.data.results
 } )
      
 .catch((err) => console.error(err));
