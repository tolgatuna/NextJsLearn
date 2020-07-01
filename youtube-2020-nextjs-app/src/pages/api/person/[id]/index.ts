import {NextApiRequest, NextApiResponse} from "next";
import {open} from "sqlite";
import sqlite3 from "sqlite3";

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: sqlite3.Database});

    if (req.method === 'GET') {
        const people = await db.get('SELECT id, name, email FROM Person WHERE id = ?', [req.query.id]);
        res.statusCode = 200;
        res.json(people);
    } else if (req.method === 'PUT') {
        const statement = await db.prepare('UPDATE person SET name = ?, email = ? where id = ?');
        await statement.run(req.body.name, req.body.email, req.query.id);

        const people = await db.get('SELECT id, name, email FROM Person WHERE id = ?', [req.query.id]);
        res.statusCode = 200;
        res.json(people);
    } else {
        res.status(500).json({message: 'Sorry, only get request is allowed for that api'})
    }


};


