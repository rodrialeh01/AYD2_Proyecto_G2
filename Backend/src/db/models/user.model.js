import {Schema, model} from 'mongoose';

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        cui: String,
        role: Number,
        verified: Boolean,
        birthday: Date,
        pathImage: String,
});

const User = model('users', userSchema);
export default User;