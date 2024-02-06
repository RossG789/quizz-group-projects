// import express, cors, dotenv, better sqlite-03
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "better-sqlite3";
//  config
dotenv.config;

const app = express();
app.use(express.json());
app.use(cors());

// Local Port

const PORT = "1212";

app.listen(PORT, () => {
  console.log(`Currently listening on localhost:${PORT}`);
});

// set root route
app.get("/", (req, res) => {
  res.send(`root ROUTE ⊂(◉‿◉)つ`);
});

// Fetch request to QUIZ API

const quizURL =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

async function fetchQuiz() {
  let response = await fetch(`${quizURL}`);
  let quiz = await response.json();

  // Creating objects from the Quiz API's response

  let quizArray = quiz.results.map((quizItem) => {
    let quizObject = {
      question: quizItem.question,
      answers: [...quizItem.incorrect_answers, quizItem.correct_answer],
      correctAnswer: quizItem.correct_answer,
    };
  });
}

fetchQuiz();
