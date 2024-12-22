import mongoose from "mongoose";
import Manager, { managerStruct } from "./manager";
const MongSchema = mongoose.Schema;

interface Employee {
    name: string,
    age: number,
    gender: string,
    eyeColor: string,
    company: {
        title: string,
        email: string,
        phone: string,
        location : {
            country : string,
            address : string
        }
    },
    registered: Date, // this refers to string which is not string type but Date(typescript) type
    tags: string[],
    isActive: boolean
};

type CustomTypeEmployee = Employee | null;

const defaultEmployeeSchemaStruct = {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    eyeColor: String,
    company: {
        title: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        location : {
            country : String,
            address : String
        }
    },
    registered: {
        type: Date,
        default: Date.now()
    },
    tags: Array,
    isActive: {
        type: Boolean,
        required: true
    }
};
const EmployeeSchema  = new MongSchema<Employee> (defaultEmployeeSchemaStruct);

type EmployeeManagerType = (typeof defaultEmployeeSchemaStruct & typeof managerStruct) | null;


let employeeManagerSchemaStruct: EmployeeManagerType = {
    ... defaultEmployeeSchemaStruct,
    ... managerStruct
}

const EmployeeManagerSchema = new MongSchema<Manager> (employeeManagerSchemaStruct);

const Employee = mongoose.model('Employee', EmployeeSchema, 'Persons');
const EmployeeManager = mongoose.model('EmployeeManager', EmployeeManagerSchema, 'Persons');

export default Employee;
export {
    Manager,
    Employee,
    EmployeeManager,
    CustomTypeEmployee,
    EmployeeManagerType,
    MongSchema,
    EmployeeManagerSchema
};