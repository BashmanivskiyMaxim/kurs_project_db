const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController.js')
const role = require('../middleware/roleMidlware.js')

router.get('/', brandController.getAll)
router.post('/', role('ADMIN'), brandController.create)
router.delete('/:id', role('ADMIN'), brandController.deleteOneBrand)


module.exports = router