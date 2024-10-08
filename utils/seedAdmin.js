const db = require('../models')

const seedAdmin = async ()=>{

    const Company ={name:'MOA_Animation_Studios', email:'moa.animationstudios@gmail.com', address: 'Lagos, Nigeria', status:'Active'}

    const Admin = {name:'MASadmin', email:'admin@MAS.com', role:'Admin', phone: '+234-0000000000', password:'admin@MAS00', company_name:'MAS',company_address:'Lagos, Nigeria'}

    try{
        const checkAdmin = await db.User.findAll({where: {role:'Admin'}})

        const checkCompany = await db.Company.findAll({where:{email: Company.email}})

        if ((checkAdmin.length === 0) && (checkCompany.length === 0)){    

            const AdminCompany = await db.Company.create(Company)

            Admin.Companyid = AdminCompany.id

            await db.User.create(Admin)
    
            console.log("Seeded Admin")
        }else if (checkAdmin.length === 0){
            Admin.Companyid = checkCompany.id

            await db.User.create(Admin)
    
            console.log("Seeded Admin")
        }
    }catch(e){
        console.log("error seeding admin")
    }
}

module.exports = seedAdmin