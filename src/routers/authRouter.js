import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import loginSchema from "../schemas/loginSchema.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/", schemaValidator(loginSchema), login)
authRouter.post("/sign-up", schemaValidator(userSchema), signUp)

export default authRouter; 