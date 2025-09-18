import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const createdPost = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return createdPost
}

const getAllPosts = async () => {
    const allPosts = await prisma.post.findMany({
        include: {
            author: true
        }
    })
    return allPosts
}

const getPostById = async (id: number) => {
    const result = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: true
        }
    })
    return result;
}

const updatePost = async (id: number, data: Partial<Post>) => {
    return prisma.post.update({
        where: {
            id
        },
        data
    })
}

const deletePost = async (id: number) => {
    return prisma.post.delete({
        where: {
            id
        }
    })
}

export const PostService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}