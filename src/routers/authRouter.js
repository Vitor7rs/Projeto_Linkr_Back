import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import signInValidator from "../middlewares/signInValidator.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();


authRouter.post("/", signInValidator, signIn)
authRouter.post("/sign-up", schemaValidator(userSchema), signUp)

export default authRouter; 