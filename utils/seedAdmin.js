const db = require('../models')

const seedAdmin = async ()=>{
    const Admin = {name:'MASadmin', email:'admin@MAS.com', role:'Admin', phone: '+234-0000000000', password:'admin@MAS00', company_name:'MAS',company_address:'Lagos, Nigeria'}


    try{
        const checkAdmin = await db.User.findAll({where: {role:'Admin'}})

        if (checkAdmin.length === 0){    
            console.log("**********************************************************")
            await db.User.create(Admin)
    
            console.log("Seeded Admin")
        }
    }catch(e){
        console.log("error seeding admin")
    }
}

module.exports = seedAdmin