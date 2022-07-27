const Errors = require('../errors/errors.js')

module.exports = function (err, req, res, next){
    if(err instanceof Errors){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Помилка!11'})
}