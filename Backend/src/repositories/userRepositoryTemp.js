import User from "../db/models/user.model.js";

class UserRepository {
    async obtenerTodos() {
        //Obtener todos los usuarios menos el admin que tiene rol == 3
        return await User.find({ role: { $ne: 3 } });    
    }

    async obtenerTodos2() {
        return await User.find({});    
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async getUserByID(id) {
        return await User.findById(id);
    }

    async updateUser(id, user) {
        console.log("updateUser");
        return await User.findByIdAndUpdate(String(id), user, { new: true });
    }

}

export default UserRepository;