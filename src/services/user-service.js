const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository')
const { JWT_KEY } = require('../config/serverConfig')

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw { error }
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '2d' });  //token will be expired in 2 days. We can also write this as 48h
            return result;
        } catch (error) {
            console.log("Somethign went wrong in creating a token");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }
}

module.exports = UserService