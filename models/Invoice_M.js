const {v4:uuidv4} = require('uuid')

module.exports = (sequelizeInstance, DataTypes)=>{
    const Invoice = sequelizeInstance.define('Invoice',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue:() => uuidv4()
        },
        ciid:{ //company invoice identifier
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        services:{
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: false,
        },
        total:{ //do it in the association
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        freezeTableName: true // This prevents Sequelize from pluralizing the table name
    })
    
    Invoice.associate = (models) =>{
        Invoice.belongsTo(models.User, {as: 'billTo', foreignKey: 'Userid'})
    }

    return Invoice;
}