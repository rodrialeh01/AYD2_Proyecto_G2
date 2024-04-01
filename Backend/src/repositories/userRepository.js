import User from "../db/models/user.model.js";

class UserRepository {
    async obtenerTodos() {
        return await User.find({});
    }

    async crearUser(User) {
        try {
            return await User.create(User);
        } catch (error) {
            console.error(error);
            return res.response(null, error.message, 500);
        }
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
    
    async getUserByID(id) {
        return await User.findById(id);
    }

    async updateInfoUser(id) {
        console.log("PATCH",'Actualización de información con ID: ' + id );
        return await User.findByIdAndUpdate(id, { new: true });

    }
}

export default UserRepository;