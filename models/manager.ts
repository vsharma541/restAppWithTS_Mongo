import mongoose from 'mongoose';
import Employee from './employee';
const MongSchema = mongoose.Schema;

interface Manager extends Employee {
    manager: any
}

const managerStruct = {
    manager: {
        type: MongSchema.ObjectId,
        Ref: 'Employee'
    }
}

export default Manager;
export {
    managerStruct
}