const {v4:uuidv4} = require('uuid')

module.exports = (sequelizeInstance, DataTypes)=>{
    const Service = sequelizeInstance.define('Service',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue:() => uuidv4()
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate:{
                len:{
                    args:[3,30],
                    msg: 'length minimun is 3 and max 30'}
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:{
                    args:[10,50],
                    msg: 'length minimun is 10 and max 50'
                }
            }
        },
        currency:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:{
                args: /^[A-Z]{3}$/,  // Ensures it's exactly 3 uppercase letters
                msg: 'Please provide a valid 3-letter currency code'
                }
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
    },{
        freezeTableName: true // This prevents Sequelize from pluralizing the table name
    })

    return Service;
}