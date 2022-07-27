const Router = require('express')
const router= new Router()
const typeController = require('../controllers/typeController.js')
const role = require('../middleware/roleMidlware.js')

router.get('/', typeController.getAll)
router.post('/', role('ADMIN'), typeController.create)
router.delete('/:id', role('ADMIN'), typeController.deleteOneTyp)


module.exports = router