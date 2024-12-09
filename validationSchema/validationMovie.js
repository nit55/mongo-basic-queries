const { check, body, checkSchema } = require("express-validator");
const getDB = require("../utils/db").getDB;

exports.movieEntryValidation = [
    checkSchema({
        name: {
            trim: true,
            custom: {
                options: (value) => {
                    return getDB()
                        .collection("movies")
                        .findOne({ name: value })
                        .then((moviename) => {
                            if (moviename) {
                                return Promise.reject("name already exists");
                            }
                        });
                },
            },
            errorMessage: "should not be empty",
            isLength: {
                errorMessage: "should be a minimum of 3 characters",
                options: { min: 3 },
            },
        },
        link: {
            trim: true,
            custom: {
                options: (value) => {
                    return getDB()
                        .collection("movies")
                        .findOne({ link: value })
                        .then((movielink) => {
                            if (movielink) {
                                return Promise.reject("movie link already exists");
                            }
                        });
                },
            },
            errorMessage: "Please enter a valid movie link",
        },

        rating: {
            trim: true,
            isLength: {
                options: { min: 1 },
                errorMessage: "should be a minimum of 1 characters",
            },
            errorMessage: "Please enter a valid rating",
        },

        language: {
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
    }),
];