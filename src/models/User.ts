import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    name: { type: String, required: true},
    surname: { type: String, required: true },
    age: {type: Number, required: true},
    gender: {type: String, required: true}
}, {versionKey: false});

const User = mongoose.model("User", UserSchema);

export default User;