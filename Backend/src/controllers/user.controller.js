import validator from "validator";
import UserRepository from "../repositories/userRepositoryTemp.js";
import { folderBucket } from "../config/constants.js";

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



export const updateInfoUser = async (req, res) => {
    console.log("updateInfoUser");
    try {
        const { id } = req.params;
        const { name, email, cui, role, verified, birthday, pathImage } = req.body;

        // verificar que el id sea valido
        if (!validator.isMongoId(String(id))) {
            res.response(null, "Invalid user id", 400);
            return;
        }
        
        let user = {
            name,
            email,
            cui,
            role,
            verified,
            birthday,
            pathImage
        }
        
        userRepository.updateUser(id, user);


        res.response(user, "User found", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}

export const uploadImage = async (req, res) => {
    try {
        const { buffer, originalname } = req.file;
        let image = "";
        if (buffer) {
            const fileExtension = originalname.split('.').pop();
            const { Location } = await saveObj(buffer, fileExtension, folderBucket.users);
            image = Location;
        }
        res.response({ Key, image }, "Imagen subida correctamente")

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};
