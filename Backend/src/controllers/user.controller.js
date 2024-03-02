<<<<<<< Updated upstream
import validator from "validator";
import UserRepository from "../repositories/userRepositoryTemp.js";

const userRepository = new UserRepository();

export const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.obtenerTodos();
        res.response(users, "Users found", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validator.isMongoId(String(id))) {
            res.response(null, "Invalid user id", 400);
        }

        const r = await userRepository.deleteUser(id);
        if (!r) {
            throw new Error("User not deleted");
        }

        res.response(null, "User deleted", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}

=======
import { User } from '../db/models/user.model.js';
const userRepository = new UserRepository();

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;

        const dataUser = await User.findOne({ _id:id }, { __v: 0, password: 0, code: 0, verified: 0 });

        res.response(dataUser);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const updateInfoUser = async (req, res) => {
    
    try
    {
        const { id } = req.params;
        const { name, lastName, phone, birthDate, password } = req.body;

        //Verificar que todos los campos esten llenos
        if (!name || !lastName || !phone || !birthDate) {
            res.response(null, 'All fields are required', 400);
            return;
        }

        //Si viene la contrasenia nula, no se actualiza

        if (!password) {
            await User.updateOne({ _id: id }, { name, lastName, phone, birthDate });
            const userUpdated = await User.findOne({ _id: id }, { __v: 0, password: 0, code: 0, verified: 0 });
            res.response(userUpdated, 'User updated successfully', 200);
        }else{
            //Cifrar contrasenia

            const passwordHash = await User.encryptPassword(password);
            await User.updateOne({ _id: id }, { name, lastName, phone, birthDate, passwordHash });
            const userUpdated = await User.findOne({ _id: id }, { __v: 0, password: 0, code: 0, verified: 0 });
            res.response(userUpdated, 'User updated successfully', 200);

        }   

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }

}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        const isRegistered = await User.findOne({ _id: id }, { email: 1});

        if (!isRegistered) {
            res.response(null, 'User not registered', 400);
            return;
        }

        await User.deleteOne({ _id: id });

        res.response(null, 'User deleted successfully', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({}, { __v: 0, password: 0, code: 0, verified: 0 });

        res.response(users, 'Users', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};
>>>>>>> Stashed changes
