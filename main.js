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

let minutes
let seconds
let time = 0
let users = JSON.parse(localStorage.getItem("users")) || []
let currentQuestionIndex = 10
let InfoGeneralApi
let points = 5
let music = document.getElementById("music");
let audio = document.getElementById("audio");


//Primera funcion la cual escondera el boton "START" y te mostrara las preguntas
const startGame = infoApi => {
  minutes = new Date().getMinutes()
  seconds = new Date().getSeconds()
  music.volume = 0.5
  music.play();
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
      let minutesfinals = new Date().getMinutes()
      let secondsfinals = new Date().getSeconds()
      let resulttime = (minutes * 60) + seconds
      let resulttime2 = (minutesfinals * 60) + secondsfinals
      time = resulttime2 - resulttime
      if(users.length === 0){
        let user = {
          name : nameUser.value,
          points : points,
          time : time
        }
        users.push(user)
        localStorage.setItem( "users", JSON.stringify(users))
      }else{
        let user = {
          name : nameUser.value,
          points : points,
          time : time
        }
        let arrayUsers = JSON.parse(localStorage.getItem("users"))
        let userNames = arrayUsers.map(user => user.name)
        let iter=0
        for (let index = 0; index < arrayUsers.length; index++) {
          if(userNames.indexOf(user.name) !== -1){
            if(user.points > arrayUsers[userNames.indexOf(user.name)].points){
              while (iter < 1){
                iter++
                users.splice((userNames.indexOf(user.name)), 1)
                users.push(user)
                localStorage.setItem( "users", JSON.stringify(users))
                }
            }else if(user.points === arrayUsers[userNames.indexOf(user.name)].points){
              if(user.time < arrayUsers[userNames.indexOf(user.name)].time){
                while (iter < 1){
                  iter++
                  users.splice((userNames.indexOf(user.name)), 1)
                  users.push(user)
                  localStorage.setItem( "users", JSON.stringify(users))
                  }
              }
            }
          }else{
            while (iter < 1){
              iter ++
              users.push(user)
              localStorage.setItem( "users", JSON.stringify(users))
            }   
          }
        }
      } 
      questionElement.innerText = ""
      hideresult.classList.remove("hide")
      localStorage.setItem
      music.pause()
      music.currentTime = 0;
      if(points >= 5){
        hideresult.innerHTML = ` <div class="card">
        <div id="results-calify" class="card-body">
        <p style="font-size:40px">YOU WIN!!</p>
        <img src ="img/rick_morty_celebrate.webp" class="rick_morty"></img>
        <p style="font-size:40px">${points}/10</p>
        <button id="podium" onclick="podiumload()" class="btn btn-dark mt-2">Podium</button>
        <button id="restart" onclick="restartload()" class="btn btn-dark mt-2">Reload</button>
        </div>
        </div>`
      }else{
        hideresult.innerHTML = ` <div class="card">
        <div id="results-calify" class="card-body">
        <p style="font-size:40px">YOU FAIL!!</p>
        <img src ="img/rick_morty_dead.jpg" class="rick_morty"></img>
        <p style="font-size:40px">${points}/10</p>
        <button id="podium" onclick="podiumload()" class="btn btn-dark mt-2">Podium</button>
        <button id="restart" onclick="restartload()" class="btn btn-dark mt-2">Reload</button>
        </div>
        </div>`
      }
    } 
  }
const podiumload = () =>{
  audio.play()
  setTimeout(() => {
      podium()
  }, "4000");
}
const restartload = () =>{
  audio.play()
  setTimeout(() => {
      restart()
  }, "4000");
}
const answers = (correct_answer, answer_selected, button) =>{
    if(answer_selected === correct_answer){

        button.classList.add("green")
        button.classList.add("disable")
        answerButtonsElement.classList.add("disable")
        
        points++
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

  users.sort(function (a,b){
    if (b.points > a.points) return 1;
    if (b.points < a.points) return -1;

    if (b.time < a.time) return 1;
    if (b.time > a.time) return -1;
  })

  hideresult.innerHTML = ` <div class="card">
  <div id="results-calify" class="card-body">
    <p style="font-size:40px">PODIUM</p>
  </div>
  <div><button id="restart" onclick="restart()" class="btn btn-dark" style="width:100px;">Reload</button></div>
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
      <p>${user.points} points  - ${user.time} seconds</p>
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



