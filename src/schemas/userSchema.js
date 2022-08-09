import joi from "joi";

const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password"),
    username: joi.string().required(),
    pictureUrl: joi.string().uri().required()
});

export default userSchema;