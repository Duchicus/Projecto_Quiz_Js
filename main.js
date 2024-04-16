const start = document.getElementById("controls");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const results = document.getElementById("results")
const hideresult = document.getElementById("hide-result")
const nameUser = document.getElementById("username")
const imgBegin = document.querySelector(".rick_morty")

let users = JSON.parse(localStorage.getItem("users")) || []
let currentQuestionIndex = 10;
let InfoGeneralApi
let puntos = 7
let audio = document.getElementById("audio");
audio.play();

//Primera funcion la cual escondera el boton "START" y te mostrara las preguntas
const startGame = infoApi => {
  if(nameUser.value !== ""){
    start.classList.add("hide");
    currentQuestionIndex;
    questionContainerElement.classList.remove("hide");
    
    setNextQuestion(infoApi, currentQuestionIndex)
  }else{
    imgBegin.setAttribute("src", "img/forgotname.png");
  }
}

const showQuestion = (question, currentQuestionIndex) => {

    if(currentQuestionIndex < 10){

      questionElement.innerHTML = `<p style="font-size:40px">¿Who is this?</p><img src=${question[currentQuestionIndex].image}></img`;
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
      let user = {
        name : nameUser.value,
        puntos : puntos
      }
      users.push(user)
      localStorage.setItem( "users", JSON.stringify(users))

      let arrayUsers = JSON.parse(localStorage.getItem("users"))
      console.log(arrayUsers);

      questionElement.innerText = ""
      hideresult.classList.remove("hide")
      localStorage.setItem
      if(puntos >= 5){
        hideresult.innerHTML = ` <div class="card">
          <div id="results" class="card-body">
          <p style="font-size:40px">YOU WIN!!</p>
          <img src ="img/rick_morty_celebrate.webp" class="rick_morty"></img>
          <p style="font-size:40px">${puntos}/10</p>
          <button id="podium" onclick="podium()" class="btn btn-dark mt-2">Podium</button>
          </div>
          </div>`
      }else{
        hideresult.innerHTML = ` <div class="card">
        <div id="results" class="card-body">
        <p style="font-size:40px">YOU FAIL!!</p>
        <img src ="img/rick_morty_dead.jpg" class="rick_morty"></img>
        <p style="font-size:40px">${puntos}/10</p>
        <button id="podium" onclick="podium()" class="btn btn-dark mt-2">Podium</button>
        </div>
        </div>`
      }
    } 
  }

// Funcion "setNextQuestion" creada para darle un valor al bucle que haremos
// vaciaremos las botones de respuestas y los activaremos
const setNextQuestion = infoApi => {
    currentQuestionIndex += 1
    answerButtonsElement.innerHTML = ""
    answerButtonsElement.classList.remove("disable")
    showQuestion(infoApi, currentQuestionIndex);
}

// Funcion "answers" creada para verificar el estado de los botones, si es correcta o no la respuesta
// Y llevar un conteo de los puntos recolectados
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

const podium = () => {



  hideresult.innerHTML = ` <div class="card">
  <div id="results" class="card-body">
  <p style="font-size:40px">PODIUM</p>
  <div>
    <p></p>
    <p></p>
    <p></p>
  </div>
  </div>
  </div>`
}
  
startButton.addEventListener("click", ()=>startGame(InfoGeneralApi));

// Axio que usaremos con .get para recolectar la informacion de la api
let randomlink = Math.floor(Math.random() * 20)

const getElements = async()=>{
  try {
    res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${randomlink}`)
    InfoGeneralApi = res.data.results
  } catch (error) {
    console.error(error);
  }
}

getElements()

