import authRepository from "../repositories/authRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUp(req, res) {
    const user = req.body;

    try{
        const existingUserEmail = await authRepository.getUserByEmail(user.email);
        if (existingUserEmail.rowCount > 0) {
            return res.status(409).send("The user already exists!");
        }

        await authRepository.createUser(user.email, user.password, user.username, user.pictureUrl);
        return res.status(201).send("User registered successfully!");

    }catch(error){
        console.log(error);
        return res.status(500).send("Server Error!");
    }
}

export async function login(req, res) {
    const{ email, password } = req.body;

    try{
        const user = await authRepository.getUserByEmail(email)
        if(user.rowCount <= 0){
            return res.status(401).send("Unauthorized");
        }
        if(bcrypt.compareSync(password, user.rows[0].password)){
            const data = {
                userId: user.rows[0].id
            }
            const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1h' })
            return res.status(200).send({
                token: token,
                userId: user.rows[0].id,
                username: user.rows[0].username,
                pictureUrl: user.rows[0].pictureUrl
            })
        }

        return res.status(401).send("Unauthorized");

    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}