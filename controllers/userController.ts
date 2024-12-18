import mongoose from "mongoose";
import User, { Person, CustomType1 } from '../models/person';

const url = 'mongodb+srv://vbs145:vsr123@mycluster.vvdcpnk.mongodb.net/my-users?retryWrites=true&w=majority&appName=MyCluster';

const connectMongoDb = async () => {
    try {
        await mongoose.connect(url, {});
        console.log('mongodb connection success!');
    } catch (error) {
        console.error('mongodb connection failed');
        console.log(error);
    }
};

const getUsers = async (): Promise<User[]> => {
    // const users = await Person.find({}).exec();
    const users: User[] = await Person.aggregate([
        {
            $limit: 5
        }
    ]);
    console.log(users);
    return users;
};

const getUserFromEmail = async (userEmail: string): Promise<CustomType1> => {
    const user: CustomType1 = await Person.findOne({
        "company.email": userEmail
    });
    console.log(user);
    
    return user;
};

const getUsersByName = async (userName: string): Promise<User[]> => {
    // Method 1
    const users: User[] = await Person.aggregate([
        {
            $match: {
                name: userName
            }
        }
    ]);

    // Method 2
    // const users = await Person.find({
    //     name: userName
    // }).exec();
    return users;
}

const addUsers = async (users: User[]): Promise<boolean> => {
    try {
        await Person.insertMany(users);
        return true;
    } catch (error) {
        console.error('Error in adding user');
        console.log(error);
        return false;
    }
}

const deleteUserByEmail = async (userMail: string): Promise<boolean> => {
    try {
        await Person.deleteOne({
            "company.email": userMail
        });
        return true;
    } catch (error) {
        console.error('Error in deleting user');
        console.log(error);
        return false;
    }
};

const updateUsers = async (userName: string, dataToUpdate: any): Promise<boolean> => {
    try {
        console.log('query name - ', userName);
        const updatedData: any = {};
        genUpdateData(updatedData, dataToUpdate, '');
        console.log('final data in $set - ', updatedData);
        
        const result = await Person.updateMany({
            name: userName
        }, {$set: updatedData});
        console.log(result);
        return true;
    } catch (error) {
        console.error('Error in updating user/s');
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

export default connectMongoDb;
export {
    getUsers,
    getUsersByName,
    getUserFromEmail,
    addUsers,
    deleteUserByEmail,
    updateUsers
}
