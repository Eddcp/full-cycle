"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
const chance_1 = __importDefault(require("chance"));
dotenv_1.default.config();
const CHANCE = new chance_1.default();
const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};
const connection = mysql_1.default.createConnection(config);
const app = (0, express_1.default)();
const port = process.env.PORT;
const insertRandomName = () => {
    const name = CHANCE.name();
    connection.query(`INSERT INTO people (name) VALUES ('${name}')`);
};
app.get('/', (req, res) => {
    insertRandomName();
    connection.query(`SELECT name FROM people`, (error, results, fields) => {
        res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map((el) => `<li>${el.name}</li>`).join('') : ''}
      </ol>
    `);
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
