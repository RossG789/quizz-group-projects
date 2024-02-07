const startQuiz = document.getElementById("start-quiz");
const quizQuestDiv = document.getElementById("quiz-quest");
const quizAnswerDiv = document.getElementById("quiz-answers");
const quizItemForReal = document.getElementById("quizItem");
let currentIndex = 0;
//defult global url
let baseUrl = "http://localhost:1212";
let resultArray;
//fetch request to route on server.js
async function fetchQuiz() {
  const quiz = await fetch(`${baseUrl}/quiz`);
  let result = await quiz.json();

  return result;
}

init();

async function init() {
  resultArray = await fetchQuiz();
  createMain(resultArray[currentIndex]);
}
// when they click on an answer,

// startQuiz.addEventListener("click", displayQuiz);

// async function displayQuiz() {
//   let quizObjects = await fetchQuiz();

//   console.log(quizObjects);

//   quizObjects.forEach((object) => {
//     let quizItemContainer = document.createElement("div");
//     let quizQuestion = document.createElement("p");
//     quizQuestion.innerHTML = object.question;

//     quizItemContainer.appendChild(quizQuestion);
//     object.answers.forEach((answer) => {
//       let quizAnswerTag = document.createElement("p");
//       quizAnswerTag.innerHTML = answer;
//       quizItemContainer.appendChild(quizAnswerTag);
//     });

//     quizItem.appendChild(quizItemContainer);
//   });
// }

// intial call

function createMain(quizItem) {
  console.log(quizItem);
  let quizItemContainer = document.createElement("div");
  let quizQuestion = document.createElement("p");
  quizQuestion.innerHTML = quizItem.question;

  quizItemContainer.appendChild(quizQuestion);
  quizItem["answers"].forEach((answer) => {
    console.log(answer);
    let quizAnswerTag = document.createElement("p");
    quizAnswerTag.innerHTML = answer;
    quizItemForReal.appendChild(quizAnswerTag);

    quizAnswerTag.addEventListener("click", () => {
      // check if correct function
      currentIndex++;
      createMain(resultArray[currentIndex]);
    });
  });

  quizItemForReal.appendChild(quizQuestion);
}
