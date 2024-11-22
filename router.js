const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.get('/', controller.getdata)
router.get('/logindata', controller.loginData)

router.post('/login', controller.login)
router.post('/alllogindata', controller.allLoginData)
router.post('/updatedata', controller.updateData)
router.post('/allupdatedata', controller.allUpdateData)
router.post('/deletedata', controller.deleteData)
router.post('/alldeletedata', controller.allDeleteData)
router.post('/movies', controller.moviesData)
router.post('/rating', controller.moviesDataIMDBRating)

module.exports = router;
