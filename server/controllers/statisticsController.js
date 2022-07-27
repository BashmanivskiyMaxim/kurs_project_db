const sequelize = require('../db')

class StatisticsController{
    async getUsers(req, res){
        let {month} = req.query
        const result = await sequelize.query('SELECT COUNT(users.email) FROM users WHERE EXTRACT(MONTH FROM "createdAt") = :month', {replacements: {month: month}})
        return res.json(result)
    }
    async getBasketDev(req, res){
        let {month} = req.query
        const result = await sequelize.query('SELECT COUNT(basket_devices.id) FROM basket_devices WHERE EXTRACT(MONTH FROM "createdAt") = :month', {replacements: {month: month}})
        return res.json(result)
    }
    async getDevice(req, res){
        let {storageOne, storageTwo} = req.query
        const result = await sequelize.query('SELECT COUNT(microproc_devices.name) FROM microproc_devices WHERE "countInstorage" > :storageOne and "countInstorage" < :storageTwo', {replacements: {storageOne: storageOne, storageTwo: storageTwo}})
        return res.json(result)
    }
}

module.exports = new StatisticsController()