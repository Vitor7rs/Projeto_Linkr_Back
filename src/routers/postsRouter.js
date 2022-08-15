import { Router } from "express";
import { CreatePost, ReturnPost, EditPost, DeletePost } from "../controllers/postsController.js";
import { authorizationValidator } from "../middlewares/authorizationValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import editPostSchema from "../schemas/editPostSchema.js";

const postsRouter = Router();

postsRouter.post("/post", authorizationValidator, schemaValidator(postSchema), CreatePost);
postsRouter.get("/post", authorizationValidator, ReturnPost);
postsRouter.patch("/post/:id", authorizationValidator, schemaValidator(editPostSchema), EditPost);
postsRouter.delete("/post/:id", authorizationValidator, DeletePost);

export default postsRouter;