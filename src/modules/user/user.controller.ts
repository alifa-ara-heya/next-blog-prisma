import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {

    try {
        const result = await UserService.createUser(req.body)
        // console.log('Creating User from controller');
        // console.log(result);
        res.send(result)

    } catch (error) {
        console.log(error);
    }
}

export const UserController = {
    createUser,

}