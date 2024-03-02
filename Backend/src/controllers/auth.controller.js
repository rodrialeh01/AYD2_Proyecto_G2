import validator from "validator";
import User from "../db/models/user.model.js";

export const signUp = async (req, res) => {
    
    try {
        const { name, email, password, cui, role, verified, birthday } = req.body;

        console.log(req.body);

        if(!name || !email || !password || !cui || !role || !verified || !birthday) return res.response(null, 'Missing fields', 400);

        if(!validator.isEmail(email)) return res.response(null, 'Invalid email', 400);

        if(!validator.isStrongPassword(password)) return res.response(null, 'Password is not strong enough', 400);

        let user = await User.findOne({ email });

        if(user) return res.response(null, 'User already exists', 400);

        user = new User({ name, email, password, cui, role, verified, birthday });

        user.password = await user.encryptPassword(password);

        await user.save();

        res.response({name: user.name, email: user.email}, 'User created successfully', 200);
        

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const signIn = async (req, res) => {
    
    try{
        const { email, password } = req.body;

        if(!email || !password) return res.response(null, 'Missing fields', 400);

        if(!validator.isEmail(email)) return res.response(null, 'Invalid email', 400);

        const user = await User.findOne({ email });

        if(!user) return res.response(null, 'User not found', 404);

        const matchPassword = await user.validatePassword(password, user.password);

        if(!matchPassword) return res.response(null, 'Invalid password', 400);

        res.response({id: user.id, rol: user.role}, 'User logged', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}