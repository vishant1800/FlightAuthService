const { User, Role } = require('../models/index')

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw { error }
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    Id: userId
                }
            });
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw { error }
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            })
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw { error }
        }
    }

    async getByEmail(userEmail) {
        try {
            const result = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            return result;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            })
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async isCustomer(userId) {
        try {
            const user = await User.findByPk(userId);
            const customerRole = await Role.findOne({
                where: {
                    name: 'CUSTOMER'
                }
            })
            return user.hasRole(customerRole);
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async isAirlineBusiness(userId) {
        try {
            const user = await User.findByPk(userId);
            const AirlineRole = await Role.findOne({
                where: {
                    name: 'AIRLINE BUSINESS'
                }
            })
            return user.hasRole(AirlineRole);
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository