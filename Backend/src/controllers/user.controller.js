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
<<<<<<< HEAD
        }

        const user = await userRepository.getUserByID(id);
        if (!user) {
            throw new Error("User not found");
        }
=======
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
    
    try
    {
        const { id } = req.params;
        const { name, email, password, cui, role, verified, birthday, pathImage } = req.body;

        //Verificar que todos los campos esten llenos
        if (!name || !email || !cui || !role || !verified || !birthday || !pathImage) {
            res.response(null, 'All fields are required', 400);
            return;
        }

        //Si viene la contrasenia nula, no se actualiza

        if (!password) {
            await User.updateOne({ _id: id }, { name, email, cui, role, verified, birthday, pathImage });
            const userUpdated = await User.findOne({ _id: id }, { __v: 0, password: 0, code: 0, verified: 0 });
            res.response(userUpdated, 'User updated successfully', 200);
        }else{
            //Cifrar contrasenia

            const passwordHash = await User.encryptPassword(password);
            await User.updateOne({ _id: id }, { name, email, passwordHash, cui, role, verified, birthday, pathImage });
            const userUpdated = await User.findOne({ _id: id }, { __v: 0, password: 0, code: 0, verified: 0 });
            res.response(userUpdated, 'User updated successfully', 200);

        }   
>>>>>>> feature#ABCO

        res.response(user, "User found", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}
<<<<<<< HEAD
=======

export const uploadImage = async (req, res) => {
    
    try {
        const { buffer, originalname } = req.file;
        const fileExtension = originalname.split('.').pop();

        const { Key, Location } = await saveObj(buffer, fileExtension);
        
        res.response({ Key, Location }, "Imagen subida correctamente")

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};
>>>>>>> feature#ABCO
