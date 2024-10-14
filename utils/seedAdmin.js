const db = require('../models')

const seedAdmin = async ()=>{

    const Company ={name:'MOA_Animation_Studios', email:'moa.animationstudios@gmail.com', address: 'Lagos, Nigeria', status:'Active'}

    const Admin = {name:'MASadmin', email:'admin@MAS.com', role:'Admin', phone: '+234-0000000000', password:'admin@MAS00'}

    try{
        const checkAdmin = await db.User.findAll({where: {role:'Admin'}})

        const checkCompany = await db.Company.findAll({where:{email: Company.email}}) //returns an array

        if ((checkAdmin.length === 0) && (checkCompany.length === 0)){    

            const AdminCompany = await db.Company.create(Company) //returns an object 

            Admin.Companyid = AdminCompany.id

            await db.User.create(Admin)
    
            console.log("Seeded Admin")
        }else if (checkAdmin.length === 0){
            Admin.Companyid = checkCompany[0].id

            await db.User.create(Admin)
    
            console.log("Seeded Admin")
        }
    }catch(e){
        console.log(e)
        console.log("error seeding admin")
    }
}

module.exports = seedAdmin