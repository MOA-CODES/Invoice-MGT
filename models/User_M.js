const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require('../db/conn')

const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = sequelizeInstance.define('User', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:() => uuidv4()
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
        validate:{
            is:{args: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                msg: 'Please provide a valid email address'}
        } 
    },
    role:{
        type:DataTypes.ENUM('Admin','subAdmin'),
        defaultValue:'subAdmin',
        validate:{
            isIn:{
                args:[['Admin','subAdmin']],
                msg:'{VALUE} is not supported'
            }
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            is:{args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                msg: 'Password length should be >6 & have at least one lowercase, uppercase & special character'}
        }
    },
    company_name:{
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
    },
    company_address:{
        type: DataTypes.STRING,
        allowNull: false,
    },

})