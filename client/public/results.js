let baseUrl = "https://quiz-backend-1k5q.onrender.com";

const leaderBoard = document.getElementById("leader-board");

async function getResults() {
  const response = await fetch(`${baseUrl}/leaderboard`);
  let scores = await response.json();
  let i = 0;

  scores.forEach((score) => {
    i++;
    let ranking = document.createElement("h4");
    ranking.innerText = `${i}: ${score.username} --- ${score.score}`;

    leaderBoard.appendChild(ranking);
  });
}

getResults();
