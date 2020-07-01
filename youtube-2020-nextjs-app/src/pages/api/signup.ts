import {NextApiRequest, NextApiResponse} from "next";
import {open} from "sqlite";
import sqlite3 from "sqlite3";
import {hash} from "bcrypt";

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: sqlite3.Database});

    if (req.method === 'POST') {
        const statement = await db.prepare('INSERT INTO person (name, email, password) VALUES (?, ?, ?)');
        hash(req.body.password, 10, async (err, hash) => {
            await statement.run(req.body.name, req.body.email, hash);

            const people = await db.all('SELECT * FROM Person', [req.query.id]);
            res.statusCode = 200;
            res.json(people);
        })
    } else {
        res.status(405).json({message: 'Sorry, only post request is allowed for that api'})
    }


};


