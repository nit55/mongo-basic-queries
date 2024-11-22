const mongodb = require("mongodb");
const { response } = require("express");

const getDB = require("./utils/db").getDB;
exports.getdata = (req, res, next) => {
    const db = getDB()
    db.collection('users')
    res.status(200).send('hello')
}

exports.moviesData = (req, res, next) => {
    const page = req.body.page
    const limit = req.body.limit
    const db = getDB()
    const skip = (page - 1) * limit;

    db.collection("embedded_movies").aggregate([
        {
            $match: {
                languages: 'Hindi', // Make sure you're only working with Hindi movies
                num_mflix_comments: { $gt: 1 } // Filter for movies with num_mflix_comments > 0
            }
        },
        {
            $lookup: {
                from: "comments",           // The collection to join with (comments)
                localField: "_id",          // The field from embedded_movies
                foreignField: "movie_id",   // The field from comments
                as: "movie_comments"        // The name of the resulting array field that will hold the matched comments
            }
        },
        {
            $facet: {
                movies: [{ $sort: { title: -1 } }, { $skip: skip }, { $limit: limit }, { $project: { _id: 1, title: 1, plot: 1, languages: 1, poster: 1, imdb: 1, tomatoes: 1, type: 1, awards: 1, year: 1, runtime: 1, genres: 1, movie_comments: 1 } }],
                totalCount: [{ $count: "count" }],

            },
        },
    ])
        .toArray()
        .then((result) => {
            console.log(result)
            const movies = result[0].movies;
            const totalCount = result[0].totalCount[0]?.count || 0;
            console.log(movies, totalCount)
            res.status(200).send({ movies, totalCount })
        })
        .catch((err) => {
            console.log(err);
        });

}

exports.moviesDataIMDBRating = (req, res, next) => {
    const page = req.body.page
    const limit = req.body.limit
    const db = getDB()
    const skip = (page - 1) * limit;

    db.collection("embedded_movies").find({ "imdb.rating": { $gt: 8.5 }, year: { $gt: 2000 }, "tomatoes.viewer.rating": { $gt: 4 }, runtime: { $gt: 120 } })
        // .count()
        .project({ _id: 0, title: 1, plot: 1, languages: 1, poster: 1, type: 1, awards: 1, year: 1, runtime: 1, genres: 1 })
        .skip(skip)
        .limit(limit)
        .toArray()
        .then((movies) => {
            console.log(movies)
            res.status(200).send({ movies })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.login = (req, res, next) => {
    const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    const db = getDB();
    db.collection('users').insertOne(payload)
        .then((result) => {
            console.log(result)
            res.status(201).send(result)
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.loginData = (req, res, next) => {
    const db = getDB();
    db.collection('users').findOne({ username: 'arijit' }).then((result) => {
        console.log(result)
        res.status(200).send(result)
    }).catch((err) => {
        console.log(err)
    })
}

exports.allLoginData = (req, res, next) => {
    const page = req.body.page
    const limit = req.body.limit
    const skip = (page - 1) * limit;
    const db = getDB();
    db.collection('users').find().project({ username: 1, email: 1 })
        .skip(skip).limit(limit).toArray().then((result) => {
            console.log(result)
            res.status(200).send(result)
        }).catch((err) => {
            console.log(err)
        })

}

exports.updateData = (req, res, next) => {
    const email = req.body.email
    const username = req.body.username
    const db = getDB()
    db
        .collection("users")
        .updateOne(
            { email: email },
            { $set: { username: username } }
        )
        .then((user) => {
            console.log("usermodel----", user);
            res.status(201).send(user)
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.allUpdateData = (req, res, next) => {
    const username = req.body.username
    const db = getDB()
    db
        .collection("users")
        .updateMany(
            {},
            { $set: { username: username } }
        )
        .then((user) => {
            console.log("usermodel----", user);
            res.status(201).send(user)
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deleteData = (req, res, next) => {
    const username = req.body.username
    const db = getDB()
    db
        .collection("users")
        .deleteOne(
            { username: username }
        )
        .then((user) => {
            res.status(201).send(user)
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.allDeleteData = (req, res, next) => {
    const db = getDB()
    db
        .collection("users")
        .deleteMany(
            {}
        )
        .then((user) => {
            res.status(201).send(user)
        })
        .catch((err) => {
            console.log(err);
        });
}

// exports.dataLogin = (req, res, next) => {
//     const response = {
//         username: req.body.username,
//         password: req.body.password
//     }
//     console.log(response)
//     const db = getDB()
//     db
//         .collection("embedded_movies")
//         // .findOne({ title: "Men Without Women" })
//         .find().limit(100).toArray()
//         .then((result) => {
//             console.log(result)
//             res.status(201).send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// } 