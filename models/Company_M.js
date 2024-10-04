const {v4:uuidv4} = require('uuid')
const { sequelizeInstance } = require('.')

module.exports = (sequelizeInstance, DataTypes)=>{
    const Company = sequelizeInstance.define('Company',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue:() => uuidv4()
        },
        name:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                len:{
                    args:[3,30],
                    msg: 'length minimun is 3 and max 30'
                }
            }
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
        address:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                len:{
                    args:[5,50],
                    msg: 'length minimun is 5 and max 50'
                }
            }
        },
        status:{
            type: DataTypes.ENUM('Active', 'Inactive'),
            defaultValue: 'Inactive',
            validate:{
                isIn:{
                    args:[['Active', 'Inactive']],
                    msg: '{VALUE} is not supported'
                }
            }
        }
    },{
        freezeTableName: true,
    })

    return Company;
}