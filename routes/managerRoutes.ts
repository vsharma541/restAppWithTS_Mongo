import express from 'express';
import { Request, Response } from 'express';
import { addEmployeeManager, populateAndGetManagerEmployee } from '../controllers/managerController';
const router = express.Router();

router.post('/manager/:id', async (req: Request, resp: Response): Promise<any> => {
    const employeeId: string = req.params.id;
    const reqBody = req.body;
    const isAddManagerDone: boolean = await addEmployeeManager(employeeId, reqBody);
    resp.send(isAddManagerDone === true ? 'Manager added successfully!': 'Error in adding manager');
});

router.get('/manager/email/:email', async (req: Request, resp: Response): Promise<any> => {
    const email: string = req.params.email;
    const managerEmployee = await populateAndGetManagerEmployee(email);
    if (managerEmployee) {
        console.log(managerEmployee);
    }
    resp.send(managerEmployee);
});

export default router;