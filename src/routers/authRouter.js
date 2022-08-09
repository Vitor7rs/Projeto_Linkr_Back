import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

// login
//  authRouter.post("/", schemaValidator(loginSchema), login)
authRouter.post("/sign-up", schemaValidator(userSchema), signUp)

export default authRouter; 