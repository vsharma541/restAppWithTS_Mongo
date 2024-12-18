import mongoose, { Date } from "mongoose";
const MongSchema = mongoose.Schema;

interface User {
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
}

type CustomType1 = User | null;

const PersonSchema  = new MongSchema<User>({
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
});

const Person = mongoose.model('Person', PersonSchema, 'Persons');
export default User;
export {
    Person,
    CustomType1
}