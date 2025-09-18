import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    console.log('Create User service payload', payload);

    const createdUser = await prisma.user.create({
        data: payload
    })
    return createdUser
}

const getAllFromDB = async () => {
    const result = await prisma.user.findMany({
        // select: {
        //     id: true,
        //     name: true,
        //     email: true
        // },

        // sorting
        orderBy: {
            createdAt: "desc"
        },
        include: {
            posts: true
        }

    })
    return result
}

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    })

    return result
}

const updateUser = async (id: number, payload: Partial<User>) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload
    })
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
}

export const UserService = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
}