const User = require('../models/User_M')

const seedAdmin = async ()=>{
    const Admin = {name:'MASadmin', email:'admin@MAS.com', role:'Admin', phone: '+234-0000000000', password:'admin@MAS00'}

    const checkAdmin = await User.findAll({where: {role:'Owner'}})

    if (checkAdmin.length === 0){

        console.log(checkAdmin)
        console.log("**********************************************************")
        await User.create(Admin)

        console.log("Seeded Admin")
    }
}

module.exports = seedAdmin