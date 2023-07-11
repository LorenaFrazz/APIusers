import mongoose from 'mongoose';
import User from '../models/User';
import { Users } from './data';

const dbName = "UsersDataBase";

const dbData = async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);


    await User.deleteMany({})
    //await User.insertMany(Users);
    

    console.log('Default Data');
};

export default dbData;
