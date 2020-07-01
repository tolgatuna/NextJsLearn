import {NextApiRequest, NextApiResponse} from "next";
import {open} from "sqlite";
import sqlite3 from "sqlite3";

export default async function getVehiclesOfPersonById(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(500).json({message: 'Sorry, only get request is allowed for that api'})
    }
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    })

    const vehicles = await db.all('SELECT * FROM vehicle WHERE ownerId = ?', [req.query.id]);
    res.statusCode = 200;
    res.json(vehicles);
};


