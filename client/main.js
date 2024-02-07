const startQuiz = document.getElementById("start-quiz");
const quizQuestDiv = document.getElementById("quiz-quest");
const quizAnswerDiv = document.getElementById("quiz-answers");
const quizItemDiv = document.getElementById("quiz-item-div");
let result;
let currentIndex = 0;
//defult global url
let baseUrl = "http://localhost:1212";
//fetch request to route on server.js
async function fetchQuiz() {
  const quiz = await fetch(`${baseUrl}/quiz`);
  let result = await quiz.json();

  return result;
}


startQuiz.addEventListener("click", init);

async function init() {
  resultArray = await fetchQuiz();
  createMain(resultArray[currentIndex]);
}

// intial call

function createMain(quizItem) {
  // console.log(quizItem);
  let quizItemContainer = document.createElement("div");
  let quizQuestion = document.createElement("p");
  quizQuestion.innerHTML = quizItem.question;

  quizItemContainer.appendChild(quizQuestion);
  quizItemDiv.appendChild(quizQuestion);
  quizItem["answers"].forEach((answer) => {
    // console.log(answer);

    let quizAnswerTag = document.createElement("p");
    quizAnswerTag.innerHTML = answer;
    quizItemDiv.appendChild(quizAnswerTag);

    quizAnswerTag.addEventListener("click", () => {
      // check if correct function
      currentIndex++;
      createMain(resultArray[currentIndex]);
    });
  });

  // quizItemDiv.appendChild(quizQuestion);
}

const openModal = document.getElementById("open");
const closeModal = document.getElementById("close");
const modalContainer = document.getElementById("modal_container");

openModal.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});

