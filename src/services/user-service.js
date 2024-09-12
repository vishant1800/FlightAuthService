const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

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

    async signIn(email, plainPassword) {
        try {
            // step -> 1 - fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step -> 2 - compare incoming password with stored encrypted password
            const passwordMatch = await this.checkPassword(plainPassword, user.password);

            if(!passwordMatch) {
                console.log("Password doesn't match");
                throw {error: "Incorrect password"}
            }

            //If password match then create a token and send it to the user
            const newJWT = await this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
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

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
}

module.exports = UserService