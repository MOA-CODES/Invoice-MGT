require('dotenv').config()
require('express-async-errors')

const {connectDB}=require('./db/conn')

const db = require('./models')

const middlewares = require('./middlewares')

const routes = require('./routes')

const seedAdmin = require('./utils/seedAdmin')

const express = require('express')

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.json('Invoice Management System')
})

app.use('/api/v1/auth', routes.Auth_R)
app.use('/api/v1/company', routes.Company_R)
app.use('/api/v1/service', routes.Service_R)
app.use('/api/v1/invoice', routes.Invoice_R)


app.use(middlewares.errorhandler)
app.use(middlewares.notfound)

connectDB()

db.sequelizeInstance.sync()
    .then(()=>{
        return seedAdmin()
    })

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})