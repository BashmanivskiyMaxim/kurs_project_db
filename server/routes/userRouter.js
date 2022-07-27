const Router = require('express')
const router= new Router()
const userController = require('../controllers/userController.js')
const auth = require('../middleware/authMidlware.js')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', auth, userController.check)



module.exports = router