const {Brand} = require('../models/models.js')
const Errors = require('../errors/errors.js')
const sequelize = require('../db')

class BrandController{

    async create(req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getAll(req, res){
        const brand = await Brand.findAll()
        return res.json(brand)
    }
    async getOne(req, res){

    }
    async deleteOneBrand(req, res){
        let {id} = req.params
        Brand.destroy({where: {id}}).then()
    }

}

module.exports = new BrandController()