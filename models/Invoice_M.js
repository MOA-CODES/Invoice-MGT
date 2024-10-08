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
        // createdAt: {
        //     type: DataTypes.DATE,
        //     get() {
        //       return this.getDataValue('createdAt').toISOString().split('T')[0];
        //     }
        //   },
        createdAt: {
            type: DataTypes.DATEONLY, // Use DATEONLY to store just the date
            allowNull: false,
            defaultValue: DataTypes.NOW, // Auto-set to the current date
          },
        updatedAt: {
            type: DataTypes.DATEONLY, // Use DATEONLY here as well if desired
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
    },{
        freezeTableName: true // This prevents Sequelize from pluralizing the table name
    })
    
    return Invoice;
}