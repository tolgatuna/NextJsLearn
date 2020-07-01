import {NextApiRequest, NextApiResponse} from "next";
import {open} from "sqlite";
import sqlite3 from "sqlite3";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import {secret} from './secret'
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: sqlite3.Database});

    if (req.method === 'POST') {
        const person: any = await db.get('SELECT * FROM Person WHERE email = ?', [req.body.email]);
        compare(req.body.password, person.password, async (err, result) => {
            if (!err && result) {
                const claims = {sub: person.id, email: person.email};
                const jwt = sign(claims, secret, {expiresIn: '1h'});

                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/'
                }));
                res.statusCode = 200;
                res.json({message: 'Welcome back to the app!'});
            } else {
                res.status(401).json({message: 'Wrong password or email'})
            }
        })
    } else {
        res.status(405).json({message: 'Sorry, only post request is allowed for that api'})
    }
};


