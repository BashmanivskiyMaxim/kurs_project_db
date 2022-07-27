const Errors = require('../errors/errors.js')
const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models.js')
const jwt = require('jsonwebtoken')

const genJWT = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(Errors.badRequest('Пароль або Email введені некоректно!'))
        }
        const user_be = await User.findOne({where: {email}})
        if (user_be) {
            return next(Errors.badRequest('Користувач з таким Email вже існує!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = genJWT(user.id, user.email, user.role)
        return res.json({token})

    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(Errors.badRequest('Користувача з таким Email не існує'))
        }
        let passDb = bcrypt.compareSync(password, user.password)
        if (!passDb) {
            return next(Errors.badRequest('Неправильний пароль'))
        }
        const token = genJWT(user.id, user.email, user.role)
        return res.json({token})

    }

    async check(req, res, next) {
        const token = genJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})

    }
}

module.exports = new UserController()