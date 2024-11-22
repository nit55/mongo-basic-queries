const express = require('express')
const router = require('./router')
const MongoConnect = require('./utils/db').MongoConnect

const app = express()

app.use(express.json())

app.use(router)

MongoConnect(() => {
    app.listen(8000, () => console.log("localhost running on port 8000"))
})