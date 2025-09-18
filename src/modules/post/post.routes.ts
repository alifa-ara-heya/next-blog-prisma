import express from 'express';
import { PostControllers } from './post.controller';

const router = express.Router();

router.get('/', PostControllers.getPosts)

router.post('/', PostControllers.createPost)

router.get('/:id', PostControllers.getPostById)

router.patch("/:id", PostControllers.updatePost);

router.delete("/:id", PostControllers.deletePost);

export const postRouter = router;