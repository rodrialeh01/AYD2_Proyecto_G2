import User from "../db/models/user.model.js";

class UserRepository {
    async obtenerTodos() {
        return await User.find({});
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

}

export default UserRepository;