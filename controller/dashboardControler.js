const { validationResult } = require('express-validator')
const Movie = require('../model/dashboardModel')

exports.movieEntry = (req, res, next) => {
    const errors = validationResult(req)
    const { name, link, rating, language } = req.body
    if (!errors.isEmpty()) {
        const error = new Error()
        error.statusCode = 403
        error.data = errors.array()
        throw error
    }
    Movie.movieByName(name)
        .then((result) => {
            const movie = new Movie(name, link, rating, language);
            return movie.movieSave()
        }).then((data) => {
            res.status(201).send({ ...data, message: "save successfully", name: name })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
}

exports.movieEntryByName = (req, res, next) => {
    const { name } = req.body
    Movie.movieByName(name)
        .then((movieList) => {
            res.status(201).send(movieList)
        }).catch((err) => {
            console.log(err)
            next(err)
        })
}

exports.allMovie = (req, res, next) => {
    const { page, limit } = req.body
    const skip = (page - 1) * limit
    Movie.allMovie(skip, limit)
        .then((movies) => {
            res.status(201).send(movies)
        }).catch((err) => {
            console.log(err)
            next(err)
        })
}

exports.updateMovie = (req, res, next) => {
    const { name, rating } = req.body
    Movie.updateMovie(name, rating)
        .then((updatemovie) => {
            res.status(201).send(updatemovie)
        }).catch((err) => {
            console.log(err)
            next(err)
        })
}

exports.deletOneMovie = (req, res, next) => {
    const { name } = req.body
    Movie.deleteOneMovie(name)
        .then((deletemovie) => {
            res.status(201).send(deletemovie)
        }).catch((err) => {
            console.log(err)
            next(err)
        })
}