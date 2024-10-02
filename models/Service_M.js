const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require('../db/conn')

const {v4:uuidv4} = require('uuid')

const Service = sequelizeInstance.define('Service',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:() => uuidv4()
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    currency:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Z]{3}$/,  // Ensures it's exactly 3 uppercase letters
            msg: 'Please provide a valid 3-letter currency code'
        }
    },
    unitprice:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    freezeTableName: true // This prevents Sequelize from pluralizing the table name
})

module.exports = Service