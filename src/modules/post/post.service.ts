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

const getAllPosts = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean,
    tags?: string[]
}) => {
    console.log({ page, limit });
    console.log({ isFeatured });
    console.log({ tags });
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }


    const allPosts = await prisma.post.findMany({
        // include: {
        //     author: true
        // }

        // pagination
        skip,
        take: limit,

        // searching
        where,

        // sorting
        orderBy: {
            createdAt: 'desc'
        },

        include: {
            author: true
        },

        // searching
        // where: {
        //     OR: [
        //         {
        //             title: {
        //                 contains: search,
        //                 mode: 'insensitive'
        //             }
        //         },
        //         {
        //             content: {
        //                 contains: search,
        //                 mode: 'insensitive'
        //             }
        //         }
        //     ]
        // }

        // filtering

    })

    const total = await prisma.post.count({ where });

    return {
        data: allPosts,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    }
}

const getPostById = async (id: number) => {
    const result = await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: {
                id
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })
        const postData = await tx.post.findUnique({
            where: {
                id
            },
            include: {
                author: true
            }
        })
        return postData
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