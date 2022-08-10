import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";
import loginSchema from "../schemas/signInSchema.js";

async function signInValidator(req, res, next) {

    const validate = loginSchema.validate(req.body, {abortEarly: false})

    if(validate.error) {
        return res.sendStatus(422);
    } 

    const { rows: emailVerify } = await authRepository.getUserByEmail(req.body.email);

    if(emailVerify.length === 0) {
        return res.send("Invalid email").status(401);
    }
    if(!bcrypt.compareSync(req.body.password, emailVerify[0].password)) {
        return res.send("Invalid password").status(401);
    }

    res.locals.user = emailVerify[0];

    next();
}

export default signInValidator;