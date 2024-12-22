import Manager from '../models/manager';
import {
    Employee,
    EmployeeManager
} from '../models/employee';

const addEmployeeManager = async (employeeId: string, reqBody: Employee ): Promise<boolean> => {
    try {
        const managerData: Manager = {
            ... reqBody,
            manager: {
                _id: employeeId
            }
        }
        await EmployeeManager.create(managerData);
        console.log('manager added success!');
        return true;
    } catch (error) {
        console.error('Error in adding manager');
        console.log(error);
        return false;
    }
};

const populateAndGetManagerEmployee = async (employeeEmail: string) => {
    try {
        console.log(employeeEmail);
        const managerEmployee = await EmployeeManager.findOne({"company.email": employeeEmail}).populate({
            path: 'manager',
            model: 'Employee'
        }).exec();
        return managerEmployee;
    } catch (error) {
        console.error('Error in getting manager');
        console.log(error);
        return error;
    }
};

export {
    addEmployeeManager,
    populateAndGetManagerEmployee
}