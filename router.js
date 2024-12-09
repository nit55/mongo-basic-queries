const express = require('express')
const router = express.Router()

const UserControler = require("./controller/userControler")
const DashboardControler = require("./controller/dashboardControler")
const validation = require('./validationSchema/validation')
const validationMovie = require('./validationSchema/validationMovie')
const isAuth = require("./middleware/isAuth")

// Login related router
router.post('/signin', validation.signupValidation, UserControler.userSignin);
router.post('/login', UserControler.userLogin);
router.post('/logindata', isAuth, UserControler.loginDataByEmail);
router.post('/alllogindata', isAuth, UserControler.allLoginData);
router.post('/updatedata', UserControler.updateData)
router.post('/allupdateitem', UserControler.allUpdateItem)
router.post('/deletesingleitem', UserControler.deleteSingleItem)
router.post('/alldeleteitem', UserControler.allDeleteItem)

// Movie related router
router.post('/movieentry', isAuth, validationMovie.movieEntryValidation, DashboardControler.movieEntry)
router.post('/movielist', isAuth, DashboardControler.movieEntryByName)
router.post('/allmovie', isAuth, DashboardControler.allMovie)
router.post('/updatemovie', isAuth, DashboardControler.updateMovie)
router.post('/deleteonemovie', isAuth, DashboardControler.deletOneMovie)



module.exports = router;
