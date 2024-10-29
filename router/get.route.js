import express from 'express';
import jwt from "jsonwebtoken"

const router = express.Router();


router.get('/get', (req, res) => {
    const token = req.headers.authorization

    jwt.verify(token,process.env.jwt_secret,(err, decoded) => {
        if(err) return res.status(403).send({message: 'Invalid token'});

        console.log(decoded);
        res.send('Hello from Module B');
        
    });

    

});

export default router;