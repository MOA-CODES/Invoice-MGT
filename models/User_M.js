const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelizeInstance, DataTypes)=>{
    const User = sequelizeInstance.define('User', {
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
            type:DataTypes.ENUM('Admin','Sub-Admin','Customer'),
            defaultValue:'Customer',
            validate:{
                isIn:{
                    args:[['Admin','Sub-Admin','Customer']],
                    msg:'{VALUE} is not supported'
                }
            },
        },
        phone:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^(\+?\d{1,4}[-.\s]?)?((\d{10})|(\d{3}[-.\s]\d{3}[-.\s]\d{4}))$/,
                    msg: 'Please provide a valid phone number'
                }
            }
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
        createdAt: {
            type: DataTypes.DATE,
            get() {
              return this.getDataValue('createdAt').toISOString().split('T')[0];
            }
          }
    },{
        freezeTableName: true // This prevents Sequelize from pluralizing the table name
    });
    
    User.beforeCreate(async(user)=>{
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    })
    
    User.prototype.createJWT = async function(){
        const token = await jwt.sign({email:this.email, role:this.role,company_name:this.company_name},process.env.AUTH_KEY,{expiresIn:process.env.TOKEN_TIME})
    } 
    
    User.prototype.comparePSW = async (userPSW,options)=>{
        const compare = await bcrypt.compare(userPSW, this.password)
    }
    
    User.prototype.updatePSW = async ()=>{
        const salt = await bcrypt.genSalt(9)
        this.password = await bcrypt.hash(this.password, salt)
    }
    
    User.associate = (models) =>{
        User.hasOne(models.Invoice, { as: 'invoice', foreignKey: 'Invoiceid'})
        console.log(models.Invoice)
    }

    return User;
}