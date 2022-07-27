require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/index.js')
const errorsHandler = require('./middleware/ErrorHandlMidlware.js')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'files_static')))
app.use(fileUpload({}))
app.use('/api', router)



//Errors
app.use(errorsHandler)
const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
    }catch (err){
        console.log(err)
    }
}


start();