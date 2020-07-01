import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {secret} from "./secret";
import {verify} from 'jsonwebtoken'

const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth, secret, function (err, decoded) {
        if (!err && decoded) {
            return fn(req, res);
        } else {
            res.status(401).json({message: 'You are not authonticated'})
        }
    });
}

export default authenticated;
