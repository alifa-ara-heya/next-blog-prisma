import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.createPost(req.body)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
    }
}

const getPosts = async (req: Request, res: Response) => {
    try {
        // to handle NaN values we set a default number
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === 'true' : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags })

        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await PostService.getPostById(Number(req.params.id));
        if (!post) return res.status(404).json({ error: "Post not found" })
        res.json(post)
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
    }
}

const updatePost = async (req: Request, res: Response) => {
    const post = await PostService.updatePost(Number(req.params.id), req.body);
    res.json(post);
};

const deletePost = async (req: Request, res: Response) => {
    await PostService.deletePost(Number(req.params.id));
    res.json({ message: "Post deleted" });
};

export const PostControllers = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
}