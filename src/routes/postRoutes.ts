import { Router } from "express";
import controller from "../controllers/PostController";

const router = Router();

router.post("/create", controller.createPost);
router.get("/all", controller.getPosts);

export default router;
