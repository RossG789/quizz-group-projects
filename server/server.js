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
//database variable
const db = new Database("database.db");

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

//post route
app.post("/leaderboard", (req, res) => {
  // try catch
  // create variables for req
  try {
    // const userName = req.body.username;
    const score = req.body.score;
    // run sql statement
    const newEntry = db
      .prepare(`INSERT INTO leaderboard (score) VALUES ( ? )`)
      .run(score);
    // respond with status
    res.status(200).json(newEntry);
  } catch (err) {
    // catch error
    res.status(500).json({ error: err });
  }
});

app.get("/quiz", async (req, res) => {
  try {
    let response = await fetch(`${quizURL}`);
    let quiz = await response.json();

    // Creating objects from the Quiz API's response
    let quizArray = quiz.results.map((quizItem) => ({
      question: quizItem.question,
      answers: [...quizItem.incorrect_answers, quizItem.correct_answer],
      correctAnswer: quizItem.correct_answer,
    }));
    res.status(200).json(quizArray);
  } catch (err) {
    res.send(err);
  }
});
