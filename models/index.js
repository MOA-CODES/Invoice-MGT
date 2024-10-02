const {sequelizeInstance} = require('../db/conn')
const {DataTypes} = require('sequelize')

const db = {}

db.Invoice = require('./Invoice_M')(sequelizeInstance,DataTypes)
db.Service = require('./Service_M')(sequelizeInstance,DataTypes)
db.User = require('./User_M')(sequelizeInstance,DataTypes)
db.sequelizeInstance = sequelizeInstance

module.exports=db

