const startQuiz = document.getElementById("startButton");

console.log(startQuiz);
const quizQuestDiv = document.getElementById("quiz-quest");
const quizAnswerDiv = document.getElementById("quiz-answers");
const quizItemDiv = document.getElementById("quiz-item-div");
let resultArray;
let currentIndex = 0;

let score = 0;
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
  //   alert("hello world");
  resultArray = await fetchQuiz();
  console.log(resultArray);
  createMain(resultArray[currentIndex]);
}

// intial call

function createMain(quizItem) {
  // console.log(quizItem);
  //   let quizItemContainer = document.createElement("div");
  quizItemDiv.innerHTML = "";
  let quizQuestion = document.createElement("p");
  quizQuestion.innerHTML = quizItem.question;

  //   quizItemContainer.appendChild(quizQuestion);
  quizItemDiv.appendChild(quizQuestion);
  const rightAnswer = quizItem.correctAnswer;

  quizItem["answers"].forEach((answer) => {
    // console.log(answer);

    let quizAnswerTag = document.createElement("p");
    quizAnswerTag.innerHTML = answer;
    quizItemDiv.appendChild(quizAnswerTag);

    quizAnswerTag.addEventListener("click", () => {
      currentIndex++;
      console.log(answer);
      console.log(rightAnswer);
      if (answer === rightAnswer) {
        score++;
      }
      console.log(score);

      if (currentIndex > resultArray.length - 1) {
        quizItemDiv.innerHTML = "";
        let submitQuiz = document.createElement("button");
        submitQuiz.innerHTML = "See Your results";
        submitQuiz.addEventListener("click", () => console.log("submitted"));
        // post request score -> database
        const finalScore = fetch(`${baseUrl}/leaderboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: score }),
        });

        quizItemDiv.appendChild(submitQuiz);
        return;
      }

      console.log(`current index is ${currentIndex}`);
      createMain(resultArray[currentIndex]);
    });
  });
  // quizItemDiv.appendChild(quizQuestion);
}
