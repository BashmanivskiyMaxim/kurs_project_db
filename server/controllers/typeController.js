const {Type} = require('../models/models.js')
const Errors = require('../errors/errors.js')
const sequelize = require('../db')

class TypeController{
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }
    async deleteOneTyp(req, res){
        let {id} = req.params
        Type.destroy({where: {id}}).then()
    }

}

module.exports = new TypeController()