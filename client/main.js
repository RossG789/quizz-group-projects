const openModal = document.getElementById("open");
const closeModal = document.getElementById("close");
const modalContainer = document.getElementById("modal_container");

openModal.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});
