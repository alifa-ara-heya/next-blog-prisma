import { prisma } from "../../config/db";

const createUser = async (payload: any) => {
    console.log('Create User service payload', payload);

    const createdUser = await prisma.user.create({
        data: payload
    })
    return createdUser
}

export const UserService = {
    createUser,

}