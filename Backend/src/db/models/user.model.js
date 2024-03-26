import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
const userSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 50 },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            unique: true
        },
        password: { type: String, required: true, minlength: 3, maxlength: 1024 },
        cui: { type: String, required: true, minlength: 13, maxlength: 13 },
        role: Number,
        verified: Boolean,
        birthday: Date
    },
    { timestamps: true }
);

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async (password, passwordDB) => {
    return bcrypt.compare(password, passwordDB);
};

const User = model('users', userSchema);
export default User;