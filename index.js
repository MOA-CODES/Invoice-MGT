require('dotenv').config()
require('express-async-errors')

const {connectDB}=require('./db/conn')

const db = require('./models')

const seedAdmin = require('./utils/seedAdmin')

const express = require('express')

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.json('Invoice Management System')
})

connectDB()

// db.sequelizeInstance.sync().then(seedAdmin())



app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})