import { Router, Request, Response } from "express";
import { getUsers, getUserFromEmail, getUsersByName, addUsers, deleteUserByEmail, updateUsers } from "../controllers/userController";
import User, { CustomType1 } from "../models/person";
import express from 'express';
const router = Router();

router.use(express.json());
const urlEncoder = express.urlencoded({ extended: true });

router.get('/users', async (req: Request, resp: Response): Promise<any> => {
    const users: User[] = await getUsers();
    resp.send(users);
});

router.get('/users/name/:name', async (req: Request, resp: Response): Promise<any> => {
    const userName: string = req.params.name;
    const user: User[] = await getUsersByName(userName);
    resp.send(user);
});

router.get('/users/email/:email', async (req: Request, resp: Response): Promise<any> => {
    const email: string = req.params.email;
    const user: CustomType1 = await getUserFromEmail(email);
    if (user) {
        console.log(user.company.location);
    }
    resp.send(user);
});

router.post('/users', urlEncoder, async (req: Request, resp: Response): Promise<any> => {
    const users: User[] = req.body;
    const isAddDone: boolean = await addUsers(users);
    const msg: string = isAddDone === true ? 'User/s added success!' : 'Failed to add User/s';
    resp.send(msg);
});

router.delete('/users/:email', async (req: Request, resp: Response): Promise<any> => {
    const email: string = req.params.email;
    const isDeleteDone: boolean = await deleteUserByEmail(email);
    const msg: string = isDeleteDone === true ? 'User deleted success!' : 'Failed to deleted User';
    resp.send(msg);
});

router.put('/users/:name', async (req: Request, resp: Response): Promise<any> => {
    const reqBody: any = req.body;
    const userName: string = req.params.name;
    const isUpdateDone: boolean = await updateUsers(userName, reqBody);
    const msg: string = isUpdateDone === true ? 'User/s updated success!' : 'Failed to update User/s';
    resp.send(msg);
});

export default router;