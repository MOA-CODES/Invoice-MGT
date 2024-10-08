const {StatusCodes} = require('http-status-codes')
const db = require('../models')
const { Op } = require('sequelize'); // Sequelize operators

const registerCompany_S = async (data)=>{

    try{
        const check = await db.Company.findOne({where:{email: data.email}})

        if(check){
            return {errormsg:"Email already exists", code: 422 }
        }
    
        const Company = await db.Company.create(data)

        return {message: "Company Registered", data: Company, code: StatusCodes.OK}
    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }

}

const getCompany_S = async (data)=>{

    try{
        const searchObject = {}

        if(data.id){
            searchObject.id = data.id

        } if(data.name){
            searchObject.name = {[Op.iLike]: `%${data.name}%`}
            
        } if(data.email){
            searchObject.email = data.email

        }if(Object.keys(searchObject).length === 0){
            return {errormsg:"Provide id, name or email", code: StatusCodes.BAD_REQUEST}
        }

        const Company = await db.Company.findOne({ where: searchObject})

        return {code: StatusCodes.OK, message:"Company Search Success", data: Company}
    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }

}

const getCompanies_S = async (data)=>{

    try{

        const page = Number(data.page) || 1
        const limit = Number(data.limit) || 10
        const offset = (page - 1) * limit //offset or skip

        const Companies = await db.Company.findAll({limit, offset})

        return {message:"Companies retrieved", data:Companies, code: StatusCodes.OK}
    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }

}

const updateCompany_S = async (data)=>{

    try{

    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }

}

const deleteCompany_S = async (data)=>{

    try{

    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }

}

module.exports = {registerCompany_S, getCompany_S, getCompanies_S, updateCompany_S, deleteCompany_S}