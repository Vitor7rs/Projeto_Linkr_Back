import authRepository from "../repositories/authRepository.js";

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