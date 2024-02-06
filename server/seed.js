//seed database with initial data
import Database from "better-sqlite3";
// create variable db to get methods
const db = new Database("database.db");

//create table with id ,username TEXT score INT
db.exec(`CREATE TABLE IF NOT EXISTS leaderboard( id INTEGER PRIMARY KEY  AUTOINCREMENT , 
    username TEXT, 
    score INTEGER)`);

db.exec(`INSERT into leaderboard( username , score)\
    VALUES
    ('Robbietest' , 
    7)`);
