import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postsRouter.js";

const router = Router();

//rotas

router.use(authRouter);
router.use(postsRouter);

export default router;