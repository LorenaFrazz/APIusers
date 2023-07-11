import express from 'express';
import mongoose from 'mongoose';
import dbData from './routes/db';
import cors from 'cors';
import User from './routes/User'


const app = express();
app.use(express.json());
app.use(cors());

app.use("/v1/Users", User)
const dbName = "UsersDataBase";

app.listen(process.env.PORT || 3000, async() => {
    console.log("Server is running on port 3000");
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
    await dbData();
});

export default app;