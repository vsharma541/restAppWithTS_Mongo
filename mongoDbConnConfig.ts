import mongoose from "mongoose";
const url = 'mongodb+srv://vbs145:vsr123@mycluster.vvdcpnk.mongodb.net/my-users?retryWrites=true&w=majority&appName=MyCluster';

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(url, {});
        console.log('mongodb connection success!');
    } catch (error) {
        console.error('mongodb connection failed');
        console.log(error);
    }
};