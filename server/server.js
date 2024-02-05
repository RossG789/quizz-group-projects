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
