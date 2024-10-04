const {sequelizeInstance} = require('../db/conn')
const {DataTypes} = require('sequelize')

const db = {}

db.Invoice = require('./Invoice_M')(sequelizeInstance,DataTypes)
db.Service = require('./Service_M')(sequelizeInstance,DataTypes)
db.User = require('./User_M')(sequelizeInstance,DataTypes)
db.Company = require('./Company_M')(sequelizeInstance,DataTypes)

//associations
db.Invoice.belongsTo(db.User, {as: 'Customer', foreignKey: 'Userid'})
db.User.belongsTo(db.Company, {as:'Company', foreignKey: 'Companyid'})

db.sequelizeInstance = sequelizeInstance

module.exports=db

