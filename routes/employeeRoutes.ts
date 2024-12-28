import { Router, Request, Response } from "express";
import { getEmployees, getEmployeeFromEmail, getEmployeesByName, addEmployees, deleteEmployeeByEmail, updateEmployees, getEmployeesByAge } from "../controllers/employeeController";
import Employee, { CustomTypeEmployee } from "../models/employee";
import express from 'express';
const router = Router();

router.use(express.json());
const urlEncoder = express.urlencoded({ extended: true });

router.get('/employees', async (req: Request, resp: Response): Promise<any> => {
    const employees: Employee[] = await getEmployees();
    resp.send(employees);
});

router.get('/employees/name/:name', async (req: Request, resp: Response): Promise<any> => {
    const employeeName: string = req.params.name;
    const employee: Employee[] = await getEmployeesByName(employeeName);
    resp.send(employee);
});

router.get('/employees/age/:age', async (req: Request, resp: Response): Promise<any> => {
    let employeeAge: number = Number(req.params.age);
    if (isNaN(employeeAge)) {
        resp.send('The age is not correct');
    }
    const employee: Employee[] = await getEmployeesByAge(employeeAge);
    resp.send(employee);
});

router.get('/employees/email/:email', async (req: Request, resp: Response): Promise<any> => {
    const email: string = req.params.email;
    const employee: CustomTypeEmployee = await getEmployeeFromEmail(email);
    if (employee) {
        console.log(employee.company.location);
    }
    resp.send(employee);
});

router.post('/employees', urlEncoder, async (req: Request, resp: Response): Promise<any> => {
    const employees: Employee[] = req.body;
    const isAddDone: boolean = await addEmployees(employees);
    const msg: string = isAddDone === true ? 'Employee/s added success!' : 'Failed to add Employee/s';
    resp.send(msg);
});

router.delete('/employees/:email', async (req: Request, resp: Response): Promise<any> => {
    const email: string = req.params.email;
    const isDeleteDone: boolean = await deleteEmployeeByEmail(email);
    const msg: string = isDeleteDone === true ? 'Employee deleted success!' : 'Failed to deleted Employee';
    resp.send(msg);
});

router.put('/employees/:name', async (req: Request, resp: Response): Promise<any> => {
    const reqBody: any = req.body;
    const employeeName: string = req.params.name;
    const isUpdateDone: boolean = await updateEmployees(employeeName, reqBody);
    const msg: string = isUpdateDone === true ? 'Employee/s updated success!' : 'Failed to update Employee/s';
    resp.send(msg);
});

export default router;