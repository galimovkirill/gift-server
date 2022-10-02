import { Request, Response } from "express";
import Post from "../models/Post";

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const { body, order, date } = req.body;

      const post = new Post({ body, order, date });
      await post.save();

      return res.json({ message: "Пост создан" });
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const posts = await Post.find();
      return res.json({ posts });
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }
}

export default new PostController();
