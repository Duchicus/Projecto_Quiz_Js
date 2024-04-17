const start = document.getElementById("controls");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const hideresult = document.getElementById("hide-result")
const nameUser = document.getElementById("username")
const imgBegin = document.querySelector(".rick_morty")
const calify = document.getElementById("calify")
const resultscalify = document.getElementById("results-calify")


let users = JSON.parse(localStorage.getItem("users")) || []
let currentQuestionIndex = -1;
let InfoGeneralApi
let puntos = 0
let audio = document.getElementById("audio");

//Primera funcion la cual escondera el boton "START" y te mostrara las preguntas
const startGame = infoApi => {
  audio.play();
  if(nameUser.value !== ""){
    start.classList.add("hide");
    currentQuestionIndex;
    questionContainerElement.classList.remove("hide");
    
    setNextQuestion(infoApi, currentQuestionIndex)
  }else{
    imgBegin.setAttribute("src", "img/forgotname.png");
  }
}
const setNextQuestion = infoApi => {
  currentQuestionIndex += 1
  answerButtonsElement.innerHTML = ""
  answerButtonsElement.classList.remove("disable")
  showQuestion(infoApi, currentQuestionIndex);
}
const showQuestion = (question, currentQuestionIndex) => {

    if(currentQuestionIndex < 10){
      questionElement.innerHTML = `<p style="font-size:40px">¿Who is this?</p><img src=${question[currentQuestionIndex].image}></img`;
      let only4answers = 0
      let arrayknowrepeatanswers = []
      const positioncorrect = Math.floor(Math.random() * 4)
      question.forEach(() => {
      let unique = 0
        while(only4answers < 4){
          if(positioncorrect === only4answers && unique === 0){
            unique++
            if(arrayknowrepeatanswers.includes(question[currentQuestionIndex].name) === false){
              const buttoncorrect = document.createElement("button");
              buttoncorrect.innerText = question[currentQuestionIndex].name;
              answerButtonsElement.appendChild(buttoncorrect);
              console.log(question[currentQuestionIndex].name);
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
          only4answers++
        }
    });
    }else{
      if(users.length === 0){
        let user = {
          name : nameUser.value,
          puntos : puntos
        }
        users.push(user)
        localStorage.setItem( "users", JSON.stringify(users))
      }else{
        let user = {
          name : nameUser.value,
          puntos : puntos
        }
        let arrayUsers = JSON.parse(localStorage.getItem("users"))
        let userNames = arrayUsers.map(user => user.name)
        let iter=0
        console.log(userNames);
        for (let index = 0; index < arrayUsers.length; index++) {
          if(userNames.indexOf(user.name) !== -1){
            if(user.puntos > arrayUsers[userNames.indexOf(user.name)].puntos){
              while (iter < 1){
                iter++
                users.splice((userNames.indexOf(user.name)), 1)
                users.push(user)
                localStorage.setItem( "users", JSON.stringify(users))
                }
            }
          }else{
            while (iter < 1){
              iter ++
              console.log(users)
              users.push(user)
              localStorage.setItem( "users", JSON.stringify(users))
            }   
          }
        }
      } 
      questionElement.innerText = ""
      hideresult.classList.remove("hide")
      localStorage.setItem
      if(puntos >= 5){
        hideresult.innerHTML = ` <div class="card">
          <div id="results-calify" class="card-body">
          <p style="font-size:40px">YOU WIN!!</p>
          <img src ="img/rick_morty_celebrate.webp" class="rick_morty"></img>
          <p style="font-size:40px">${puntos}/10</p>
          <button id="podium" onclick="podium()" class="btn btn-dark mt-2">Podium</button>
          <button id="restart" onclick="restart()" class="btn btn-dark mt-2">Reload</button>
          </div>
          </div>`
      }else{
        hideresult.innerHTML = ` <div class="card">
        <div id="results-calify" class="card-body">
        <p style="font-size:40px">YOU FAIL!!</p>
        <img src ="img/rick_morty_dead.jpg" class="rick_morty"></img>
        <p style="font-size:40px">${puntos}/10</p>
        <button id="podium" onclick="podium()" class="btn btn-dark mt-2">Podium</button>
        <button id="restart" onclick="restart()" class="btn btn-dark mt-2">Reload</button>
        </div>
        </div>`
      }
    } 
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

const podium = () => {

  users.sort((a, b) => b.puntos - a.puntos);
  hideresult.innerHTML = ` <div class="card">
  <div id="results-calify" class="card-body">
    <p style="font-size:40px">PODIUM</p>
  </div>
  </div>`
  const resultsDiv = document.getElementById("results-calify")
  for (let index = 0; index < 3; index++) {
    const user = users[index];
    let first = document.createElement("div");
    first.classList.add("card", "mb-2");
    if(index === 0){
      first.style.backgroundColor = "gold";
    }else if(index === 1){
      first.style.backgroundColor = "silver";
    }else if(index === 2){
      first.style.backgroundColor = "#cd7f32";
    }
    first.innerHTML = `
      <p style="font-size:30px">${user.name}</p>
      <p>${user.puntos} points</p>
    `;
    resultsDiv.appendChild(first);
  }
}

const restart = () =>{
  window.location.href = "index.html"
}
  
startButton.addEventListener("click", ()=>startGame(InfoGeneralApi));

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


