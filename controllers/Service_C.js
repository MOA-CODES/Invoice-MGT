const services = require('../services')
const customError = require('../middlewares/customError')

const createService = async (req, res)=>{

    const {name, description, currency, unitprice, quantity} = req.body
    const createObject = {name, description, currency, unitprice, quantity}

    const {data, code, message, errormsg, errname} = await services.Service_S.createService_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "createService Error")

    res.status(code).json({message, status:code, data})

}

const getService = async (req, res)=>{

    const {id, name} = req.query
    const createObject = {id, name}

    const {data, code, message, errormsg, errname} = await services.Service_S.getService_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "getService Error")

    res.status(code).json({message, status:code, data})
    
}

const getServices = async (req, res)=>{
    
    const {page, limit} = req.query
    const createObject = {page, limit}

    const {data, code, message, errormsg, errname} = await services.Service_S.getServices_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "getServices Error")

    res.status(code).json({message, status:code, data})

}

const updateService = async (req, res)=>{
    
}

const deleteService = async (req, res)=>{
    
}

module.exports = {createService, getService, getServices, updateService, deleteService}
