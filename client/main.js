//defult global url
baseUrl = "http://localhost:1212";
//fetch request to route on server.js
async function fetchQuiz() {
  const quiz = await fetch(`${baseUrl}/quiz`);
  let result = await quiz.json();
  console.log(result);
  return result;
}
