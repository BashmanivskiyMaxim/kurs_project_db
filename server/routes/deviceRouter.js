const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController.js')
const role = require('../middleware/roleMidlware.js')

router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/', role('ADMIN'), deviceController.create)
router.delete('/delete/:id',role('ADMIN'), deviceController.deleteOneDevice)


module.exports = router