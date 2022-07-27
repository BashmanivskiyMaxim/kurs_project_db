const {Device, DeviceInfo} = require('../models/models.js')
const Errors = require('../errors/errors.js')
const sequelize = require('../db')
const uuid = require('uuid')
const path = require('path')

class DeviceController{
    async create(req, res, next){
        try {
            let {name, price, brandId, typeDevId, info, countInstorage} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'files_static', fileName))

            const device = await Device.create({name, price, brandId, typeDevId, img: fileName, countInstorage})

            if(info){
                info = JSON.parse(info)
                info.forEach(i => DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    microprocDeviceId: device.id
                }))
            }

            return res.json(device)

        }
        catch (err){
            next(Errors.badRequest(err.message))
        }

    }
    async getAll(req, res){
        let {name, brandId, typeDevId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeDevId && name === ''){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeDevId && name === ''){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeDevId && name === ''){
            devices = await Device.findAndCountAll({where: {typeDevId}, limit, offset})
        }
        if(!brandId && !typeDevId && name){
            devices = await Device.findAndCountAll({where: {name : sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')}, limit, offset})
        }
        if(brandId && !typeDevId && name){
            devices = await Device.findAndCountAll({where: {name : sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%'), brandId}, limit, offset})
        }
        if(!brandId && typeDevId && name){
            devices = await Device.findAndCountAll({where: {name : sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%'), typeDevId}, limit, offset})
        }
        if(brandId && typeDevId && name === ''){
            devices = await Device.findAndCountAll({where: {typeDevId, brandId}, limit, offset})
        }
        if(brandId && typeDevId && name){
            devices = await Device.findAndCountAll({where: {typeDevId, brandId, name : sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')}, limit, offset})
        }
        return res.json(devices)

    }
    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        return res.json(device)

    }

    async deleteOneDevice(req, res){
        let {id} = req.params
        Device.destroy({where: {id}}).then()
    }

}

module.exports = new DeviceController()