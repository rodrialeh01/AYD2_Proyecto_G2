import validator from "validator";
import UserRepository from "../repositories/userRepositoryTemp.js";
import { folderBucket } from "../config/constants.js";
import { saveObj } from "../config/objectHandler.js";
import { LogBack } from '../log/bitacora.js';
import BitacoraBDRepository from '../repositories/bitacorabdRepository.js';

const logB = LogBack.getInstance();
const bdb = new BitacoraBDRepository();
const userRepository = new UserRepository();

export const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.obtenerTodos();
        logB.addBitacora('ENDPOINT: /user/all - Se obtuvieron todos los usuarios');
        bdb.crearBitacoraBD('Se obtuvieron todos los usuarios', 'SELECT', new Date());
        res.response(users, "Users found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora('ENDPOINT: /user/all - Error al obtener todos los usuarios');
        bdb.crearBitacoraBD('Error al obtener todos los usuarios', 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validator.isMongoId(String(id))) {
            logB.addBitacora('ENDPOINT: /user/delete/:id - ID de usuario inválido');
            res.response(null, "Invalid user id", 400);
        }

        const r = await userRepository.deleteUser(id);
        if (!r) {
            throw new Error("User not deleted");
        }
        logB.addBitacora(`ENDPOINT: /user/delete/:id - Se ha eliminado el usuario con ID: ${id}`);
        bdb.crearBitacoraBD('Se ha eliminado un usuario', 'DELETE', new Date());
        res.response(null, "User deleted", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora('ENDPOINT: /user/delete/:id - Error al eliminar un usuario');
        bdb.crearBitacoraBD('Error al eliminar un usuario', 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validator.isMongoId(String(id))) {
            logB.addBitacora('ENDPOINT: /user/get/:id - ID de usuario inválido');
            res.response(null, "Invalid user id", 400);
        }

        const user = await userRepository.getUserByID(id);
        if (!user) {
            logB.addBitacora('ENDPOINT: /user/get/:id - Usuario no encontrado');
            bdb.crearBitacoraBD('Usuario no encontrado', 'SELECT', new Date());
            throw new Error("User not found");
        }
        logB.addBitacora(`ENDPOINT: /user/get/:id - Se ha buscado el usuario con ID: ${id}`);
        bdb.crearBitacoraBD('Se ha seleccionado un usuario', 'SELECT', new Date());
        res.response(user, "User found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora('ENDPOINT: /user/get/:id - Error al buscar un usuario');
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
            logB.addBitacora('ENDPOINT: /user/update/:id - ID de usuario inválido');
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

        logB.addBitacora(`ENDPOINT: /user/update/:id - Se ha actualizado el usuario con ID: ${id}`);
        bdb.crearBitacoraBD('Se ha actualizado un usuario', 'UPDATE', new Date());
        res.response(user, "User found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora('ENDPOINT: /user/update/:id - Error al actualizar un usuario');
        res.response(null, error.message, 500);
    }
}

export const uploadImage = async (req, res) => {
    try {
        const { buffer, originalname } = req.file;
        console.log(req.file);
        let image = "";
        let KeyT = "";
        if (buffer) {
            const fileExtension = originalname.split('.').pop();
            const { Key, Location } = await saveObj(buffer, fileExtension, folderBucket.users);
            image = Location;
            KeyT = Key;
        }
        logB.addBitacora('ENDPOINT: /user/addImage - Imagen subida correctamente');
        bdb.crearBitacoraBD('Se ha subido una imagen', 'INSERT', new Date());
        res.response({ KeyT, image }, "Imagen subida correctamente")

    } catch (error) {
        console.log(error);
        logB.addBitacora('ENDPOINT: /user/addImage - Error al subir una imagen');
        res.response(null, error.message, 500);
    }

};

export const getReportUserTypes = async (req, res) => {
    //Tipos de usuarios
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await userRepository.obtenerTodos2();

        // Inicializar un objeto para almacenar el recuento de usuarios por tipo
        let userCounts = {
            'Clientes': 0, // Cliente
            'Vendedores': 0, // Vendedor
            'Administradores': 0  // Administrador
        };

        // Contar cuántos usuarios hay de cada tipo
        users.forEach(user => {
            if (user.role === 1) {
                userCounts['Clientes'] += 1;
            } else if (user.role === 2) {
                userCounts['Vendedores'] += 1;
            } else if (user.role === 3) {
                userCounts['Administradores'] += 1;
            }
        });

        // Convertir el objeto en dos arrays separados: etiquetas y datos
        const labels = Object.keys(userCounts);
        const data = Object.values(userCounts);
        //console.log(labels);
        //console.log(data);

        // Enviar la respuesta con las etiquetas y los datos
        logB.addBitacora('ENDPOINT: /user/getReportUserTypes - Se ha obtenido el reporte de usuarios por tipo');
        bdb.crearBitacoraBD('Se ha obtenido el reporte de usuarios por tipo', 'SELECT', new Date());
        res.response({ labels, data }, "Cantidad de usuarios por tipo encontrada", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora('ENDPOINT: /user/getReportUserTypes - Error al obtener el reporte de usuarios por tipo');
        res.response(null, error.message, 500);
    }
};
