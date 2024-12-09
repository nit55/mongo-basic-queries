const { validationResult } = require('express-validator')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

exports.userSignin = (req, res, next) => {
    const errors = validationResult(req);
    const { name, email, password } = req.body

    if (!errors.isEmpty()) {
        const error = new Error();
        error.statusCode = 403;
        error.data = errors.array();
        throw error;
    }
    User.loginDataByEmail(email)
        .then((result) => {
            const user = new User(name, email, password)
            return user.save()
        }).then((data) => {
            res.status(201).send({ ...data, message: "save successfully", email: email })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
}

exports.userLogin = (req, res, next) => {
    const { email, password } = req.body
    let userDetails;

    User.loginDataByEmail(email)
        .then((user) => {
            if (!user) {
                const error = new Error("email is not found")
                error.statusCode = 401
                throw error
            }
            userDetails = user
            return user.password === password
        }).then((data) => {
            if (!data) {
                const error = new Error();
                error.statusCode = 401
                error.data = "password is not matched"
                throw error
            }
            const token = jwt.sign(
                {
                    email: userDetails.email,
                    userId: userDetails._id.toString(),
                },
                "Fulham@chelsea&Liverpool"
            );
            return res.status(200).send({
                token: token,
                message: "Logged in ",
            });
        }).catch((err) => {
            console.log(err)
        })
}

exports.loginDataByEmail = (req, res, next) => {
    const { email } = req.body
    console.log(User)
    User.loginDataByEmail(email)
        .then((userList) => {
            res.status(201).send(userList)
        }).catch((err) => {
            console.log(err)
        })
}

exports.allLoginData = (req, res, next) => {
    const page = req.body.page
    const limit = req.body.limit
    const skip = (page - 1) * limit;
    User.allLoginData(skip, limit)
        .then((allLoginData) => {
            res.status(201).send(allLoginData)
        }).catch((err) => {
            console.log(err)
        })
}

exports.updateData = (req, res, next) => {
    const email = req.body.email
    User.updateData(email)
        .then((updateData) => {
            console.log(updateData, "controller")
            res.status(201).send(updateData)
        }).catch((err) => {
            console.log(err)
        })
}

exports.allUpdateItem = (req, res, next) => {
    const email = req.body.email
    User.allUpdateItem(email)
        .then((allUpdateData) => {
            console.log(allUpdateData, "controller")
            res.status(201).send(allUpdateData)
        }).catch((err) => {
            console.log(err)
        })
}

exports.deleteSingleItem = (req, res, next) => {
    const email = req.body.email
    User.deleteSingleItem(email)
        .then((singleDeleteItem) => {
            console.log(singleDeleteItem, "controller")
            res.status(201).send(singleDeleteItem)
        }).catch((err) => {
            console.log(err)
        })
}

exports.allDeleteItem = (req, res, next) => {
    User.allDeleteItem()
        .then((allDeleteItem) => {
            console.log(allDeleteItem, "controller")
            res.status(201).send(allDeleteItem)
        }).catch((err) => {
            console.log(err)
        })
}