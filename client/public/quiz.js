const startQuiz = document.getElementById("startButton");

const startDiv = document.getElementById("startBar");

const quizItemDiv = document.getElementById("quiz-item-div");

let userName;

let resultArray;
let currentIndex = 0;
let score = 0;
//defult global url
let baseUrl = "https://quiz-backend-1k5q.onrender.com";
//fetch request to route on server.js
async function fetchQuiz() {
  const quiz = await fetch(`${baseUrl}/quiz`);
  let result = await quiz.json();

  return result;
}

startQuiz.addEventListener("click", init);

async function init() {
  userName = document.getElementById("fullname").value.trim();
  if (userName) {
    quizItemDiv.classList.remove("hidden");
    startDiv.classList.add("hidden");
    resultArray = await fetchQuiz();
    // console.log(resultArray);
    createMain(resultArray[currentIndex]);
  } else {
    alert("Please enter a name to begin");
  }
  // console.log(userName);
}

// intial call

async function createMain(quizItem) {
  // This was lifted to randomise as best as possible
  const shuffledAns = quizItem.answers
    .map((answer) => ({ answer, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ answer }) => answer);

  quizItemDiv.innerHTML = "";
  let quizQuestion = document.createElement("h3");
  quizQuestion.innerHTML = quizItem.question;

  //   quizItemContainer.appendChild(quizQuestion);
  quizItemDiv.appendChild(quizQuestion);
  const rightAnswer = quizItem.correctAnswer;

  shuffledAns.forEach((answer) => {
    let quizAnswerTag = document.createElement("button");
    quizAnswerTag.innerHTML = answer;
    quizItemDiv.appendChild(quizAnswerTag);

    quizAnswerTag.addEventListener("click", async () => {
      currentIndex++;
      // console.log(answer);
      // console.log(rightAnswer);
      if (answer === rightAnswer) {
        score++;
      }
      // console.log(score);

      if (currentIndex > resultArray.length - 1) {
        quizItemDiv.innerHTML = "";
        showScore();

        const response = await fetch(`${baseUrl}/leaderboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: score,
            name: userName,
          }),
        });

        // console.log(response);

        if (!response.ok) {
          // showScoreboard();
          alert("Something went wrong");
        }
        return;
      }

      // console.log(`current index is ${currentIndex}`);
      createMain(resultArray[currentIndex]);
    });
  });
}

function showScore() {
  let finalScore = document.createElement("h2");
  finalScore.innerHTML = `Congratulations ${userName} you got ${score} out of 10!`;
  let leaderBoardBtn = document.createElement("a");
  leaderBoardBtn.innerHTML = "See Leaderboard?";
  leaderBoardBtn.href = "results.html";
  quizItemDiv.appendChild(finalScore);
  quizItemDiv.appendChild(leaderBoardBtn);
}
