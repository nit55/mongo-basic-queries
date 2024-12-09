const { check, body, checkSchema } = require("express-validator");
const getDB = require("../utils/db").getDB;

exports.signupValidation = [
    checkSchema({
        name: {
            trim: true,
            errorMessage: "should not be empty",
            isLength: {
                errorMessage: "should be a minimum of 3 characters",
                options: { min: 3 },
            },
            matches: {
                options: /^[a-zA-Z]+$/,
                errorMessage: "should contain only alphabets",
            },
        },
        email: {
            trim: true,
            isEmail: true,
            matches: {
                options: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
                errorMessage: "should be a valid email",
            },
            custom: {
                options: (value) => {
                    return getDB()
                        .collection("users")
                        .findOne({ email: value })
                        .then((user) => {
                            if (user) {
                                return Promise.reject("email already exists");
                            }
                        });
                },
            },
            errorMessage: "Please enter a valid email Id",
        },

        password: {
            trim: true,
            isLength: {
                options: { min: 4 },
                errorMessage: "should be a minimum of 4 characters",
            },
            errorMessage: "Please enter a valid password",
        },
    }),
];