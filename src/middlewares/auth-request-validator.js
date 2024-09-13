const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: 'Email or password is missing in the request'
        })
    }

    next();
}

const validateRoleRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: "User id not given"
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateRoleRequest
}