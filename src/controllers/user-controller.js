const UserService = require('../services/user-service')

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success: true,
            data: response,
            message: "Successfully created a new user",
            error: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            success: true,
            data: response,
            message: "Successfully signed in",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(201).json({
            success: true,
            data: response,
            message: "User is authenticated and token is valid",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully fetched whether user is admin or not",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}

const isCustomer = async (req, res) => {
    try {
        const response = await userService.isCustomer(req.body.id);
        return res.status(201).json({
            success: true,
            data: response,
            message: "Successfully fetched whether user is customer or not",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}

const isAirlineBusiness = async (req, res) => {
    try {
        const response = await userService.isAirlineBusiness(req.body.id);
        return res.status(201).json({
            success: true,
            data: response,
            message: "Successfully fetched whether user has airline business or not",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
    isCustomer,
    isAirlineBusiness
}