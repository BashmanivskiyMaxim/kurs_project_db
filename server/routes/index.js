const Router = require('express')
const router= new Router()
const deviceRouter = require('./deviceRouter.js')
const brandRouter = require('./brandRouter.js')
const typeRouter = require('./typeRouter.js')
const userRouter = require('./userRouter.js')
const basketRouter = require('./basketRouter.js')
const statRouter = require('./statRouter.js')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/statistics', statRouter)



module.exports = router