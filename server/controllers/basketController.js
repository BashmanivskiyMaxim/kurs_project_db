const { Device, BasketDevice, Basket } = require("../models/models.js")

class BasketController {

    async addToBasket(req,res,next){
        const user = req.user
        let {deviceId} = parseInt(req.body.deviceId)
        console.log(req.body)
        const basket = await BasketDevice.create({microprocDeviceId: req.body.deviceId, basketId : user.id})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketDevice.findAll({include: {
                model: Device
            }, where: {basketId: id}})

        return res.json(basket)
    }

}

module.exports = new BasketController()