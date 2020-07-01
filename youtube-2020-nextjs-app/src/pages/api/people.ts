import {NextApiRequest, NextApiResponse} from "next";
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import authenticated from "./authenticated";

export default authenticated(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(500).json({message: 'Sorry, only get request is allowed for that api'})
    }
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    const people = await db.all('SELECT * FROM person');
    res.statusCode = 200;
    res.json(people);
});
