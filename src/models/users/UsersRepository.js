import User from './User.js';

class UsersRepository {
    constructor() {
        this.users = [];
    }

    getAllUsers() {
        return this.users;
    }

    addUser(name, email, password) {
        const newUser = new User(name, email, password);
        this.users.push(newUser);
        return newUser;
    }

    getUserById(id) {
        return this.users.find(user => user.id == id);
    }

    updateUser = (id, name, email, password) => {
        const user = this.getUserById(id);
        if (!user) return null;

        user.name = name;
        user.email = email;
        user.password = password;

        return user;
    }

    deleteUser(id) {
        const user = this.getUserById(id);
        if (!user) return null;

        this.users = this.users.filter(user => user.id != id);
        return user;
    }
}

export default UsersRepository;