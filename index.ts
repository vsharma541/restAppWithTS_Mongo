import express from 'express';
import employeeRouter from './routes/employeeRoutes';
import managerRouter from './routes/managerRoutes';
import { connectMongoDb } from './mongoDbConnConfig';
const app = express();
app.use(employeeRouter);
app.use(managerRouter);

app.listen(5000, async () => {
    console.log('local host connected success!');
    await connectMongoDb();
});

