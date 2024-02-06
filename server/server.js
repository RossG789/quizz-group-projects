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

//post route
app.post("/leaderboard", (req, res) => {
  // try catch
  // create variables for req
  try {
    const userName = req.body.username;
    const score = req.body.score;
    // run sql statement
    const newEntry = db
      .prepare(`INSERT INTO leaderboard (username , score) VALUES ( ? ,?)`)
      .run(userName, score);
    // respond with status
    res.status(200).json(newEntry);
  } catch (err) {
    // catch error
    res.status(500).json({ error: err });
  }
});
