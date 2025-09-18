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
    const result = await prisma.user.findMany()
    return result
}

export const UserService = {
    createUser,
    getAllFromDB
}