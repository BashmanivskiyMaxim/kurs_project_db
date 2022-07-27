const Router = require('express')
const router= new Router()
const StatisticsController = require('../controllers/StatisticsController.js')
const role = require('../middleware/roleMidlware.js')

router.get('/users',role('ADMIN'), StatisticsController.getUsers)
router.get('/basket',role('ADMIN'), StatisticsController.getBasketDev)
router.get('/dev',role('ADMIN'), StatisticsController.getDevice)

module.exports = router