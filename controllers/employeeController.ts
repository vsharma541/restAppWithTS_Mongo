
import Employee, { 
    CustomTypeEmployee
 } from '../models/employee';

const getEmployees = async (): Promise<Employee[]> => {
    // const employees = await Employee.find({}).exec();
    const employees: Employee[] = await Employee.aggregate([
        {
            $limit: 5
        }
    ]);
    console.log(employees);
    return employees;
};

const getEmployeeFromEmail = async (employeeEmail: string): Promise<CustomTypeEmployee> => {
    const employee: CustomTypeEmployee = await Employee.findOne({
        "company.email": employeeEmail
    });
    console.log(employee);
    return employee;
};

const getEmployeesByName = async (employeeName: string): Promise<Employee[]> => {
    // Method 1
    const employees: Employee[] = await Employee.aggregate([
        {
            $match: {
                name: employeeName
            }
        }
    ]);

    // Method 2
    // const employees = await Employee.find({
    //     name: employeeName
    // }).exec();
    return employees;
}

const addEmployees = async (employees: Employee[]): Promise<boolean> => {
    try {
        await Employee.insertMany(employees);
        return true;
    } catch (error) {
        console.error('Error in adding employee');
        console.log(error);
        return false;
    }
}

const deleteEmployeeByEmail = async (employeeMail: string): Promise<boolean> => {
    try {
        await Employee.deleteOne({
            "company.email": employeeMail
        });
        return true;
    } catch (error) {
        console.error('Error in deleting employee');
        console.log(error);
        return false;
    }
};

const updateEmployees = async (employeeName: string, dataToUpdate: any): Promise<boolean> => {
    try {
        console.log('query name - ', employeeName);
        const updatedData: any = {};
        genUpdateData(updatedData, dataToUpdate, '');
        console.log('final data in $set - ', updatedData);
        const result = await Employee.updateMany({
            name: employeeName
        }, {$set: updatedData});
        console.log(result);
        return true;
    } catch (error) {
        console.error('Error in updating employee/s');
        console.log(error);
        return false;
    }
}

const genUpdateData = (newObj: any, obj: any, newKey: string): void => {
    let keys: string[] = Object.keys(obj);
    keys.forEach((key: string) => {
        if (typeof (obj[key]) !== 'object' || Array.isArray(obj[key])) {
            let key1 = newKey;
            key1 = modifyKey(newKey, key);
            newObj[key1] = obj[key];
        } else {
            newKey = modifyKey(newKey, key);
            genUpdateData(newObj, obj[key], newKey);
        }
    });
}

const modifyKey = (newKey: string, key: string): string => {
    let key1 = newKey;
    if (newKey.length > 0) {
        key1 += `.${key}`;
    } else {
        key1 += key;
    }
    return key1;
}

export {
    getEmployees,
    getEmployeesByName,
    getEmployeeFromEmail,
    addEmployees,
    deleteEmployeeByEmail,
    updateEmployees
}
