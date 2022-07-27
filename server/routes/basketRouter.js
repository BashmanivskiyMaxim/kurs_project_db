const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController.js')
const authMiddleware = require('../middleware/authMidlware.js')


router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)


module.exports = router