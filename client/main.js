//defult global url
baseUrl = "http://localhost:1212";
//fetch request to route on server.js
async function fetchQuiz() {
  const quiz = await fetch(`${baseUrl}/quiz`);
  let result = await quiz.json();
  console.log(result);
  return result;
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
