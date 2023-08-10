import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import Chance from 'chance';

dotenv.config();
const CHANCE = new Chance();

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}

const connection = mysql.createConnection(config)

const app: Express = express();
const port = process.env.PORT;

const insertRandomName = () => {
  const name: string = CHANCE.name(); 
  connection.query(`INSERT INTO people (name) VALUES ('${name}')`)
}

app.get('/', (req: Request, res: Response) => {
  insertRandomName();

  connection.query(`SELECT name FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map((el: any) => `<li>${el.name}</li>`).join('') : ''}
      </ol>
    `)
  })
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});