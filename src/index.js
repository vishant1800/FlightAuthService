const express = require("express");
const { PORT } = require("./config/serverConfig");

const StartServer = async () => {
    const app = express();

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    })
}

StartServer();