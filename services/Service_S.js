const {StatusCodes} = require('http-status-codes')
const { Op } = require('sequelize'); // Sequelize operators

const db = require('../models')
const createService_S = async (data)=>{
    try{

        const check = await db.Service.findOne({where: {name: data.name}})

        if(check){
            return {errormsg:"Service already exists", code:StatusCodes.BAD_REQUEST}
        }

        data.total = Number(data.unitprice) * Number(data.quantity)

        console.log(data, "===============================================================")

        const service = await db.Service.create(data)

        return {data: service, code: StatusCodes.OK, message: "Service Created"}

    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const getService_S = async (data)=>{
    try{
        const searchObject = {}

        if(data.id){
            searchObject.id = data.id

        } if(data.name){
            searchObject.name = {[Op.iLike]: `%${data.name}%`}
            
        } if(Object.keys(searchObject).length === 0){
            return {errormsg:"Provide id, or name", code: StatusCodes.BAD_REQUEST}
        }

        const service = await db.Service.findOne({ where: searchObject})

        return {code: StatusCodes.OK, message:"Service Search Success", data: service}
    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const getServices_S = async (data)=>{
    try{

        const page = Number(data.page) || 1
        const limit = Number(data.limit) || 10
        const offset = (page - 1) * limit //offset or skip

        const services = await db.Service.findAll({limit, offset})

        return {message:"Services retrieved", data:services, code: StatusCodes.OK}

    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const updateService_S = async (data)=>{
    try{

    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const deleteService_S = async (data)=>{
    try{

    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

module.exports = {createService_S, getService_S, getServices_S, updateService_S, deleteService_S}