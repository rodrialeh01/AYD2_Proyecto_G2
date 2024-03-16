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

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validator.isMongoId(String(id))) {
            res.response(null, "Invalid user id", 400);
        }

        const user = await userRepository.getUserByID(id);
        if (!user) {
            throw new Error("User not found");
        }

        res.response(user, "User found", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}
