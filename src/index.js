const express = require("express");
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index')
const { PORT } = require("./config/serverConfig");

// const bcrypt = require('bcrypt')
// const { User } = require('./models/index')

const UserRepository = require('./repository/user-repository')

const app = express();

const StartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);

        // const incomingPassword = "Money@1800";
        // const user = await User.findByPk(5);
        // const response = bcrypt.compareSync(incomingPassword, user.password);
        // console.log(response);

        // const obj = new UserRepository();
        // const response = await obj.getById(5);
        // console.log(response);

    })
}

StartServer();