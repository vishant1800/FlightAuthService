const express = require("express");
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index')
const { PORT } = require("./config/serverConfig");

// const UserService = require('./services/user-service')
// const jwt = require('jsonwebtoken')

const app = express();

const StartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);


        // const service = new UserService();
        // const newToken = service.createToken({email: 'vishant@admin.com', id: 1});
        // console.log("New token is", newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpc2hhbnRAYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTcyNjEyODYwNCwiZXhwIjoxNzI2MTI4NjM0fQ.XJtrnbpNUWdaOK6dw1TarjIWK8LoA8q6rhfkua8SSJk'
        // const verify = service.verifyToken(token);
        // console.log(verify);
    })
}

StartServer();