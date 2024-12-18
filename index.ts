import express from 'express';
import router from './routes/userRoutes';
import connectMongoDb from './controllers/userController';
const app = express();
app.use(router);

app.listen(5000, async () => {
    console.log('local host connected success!');
    await connectMongoDb();
});

