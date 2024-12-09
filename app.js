const express = require('express');
const router = require('./router');
const MongoConnect = require('./utils/db').MongoConnect;

const app = express();


app.use(express.json());


app.use(router);


app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error || "error";
    res.status(status).send(error);
});


MongoConnect(() => {
    app.listen(8000, () => console.log("Server running on port: 8000"));
});
