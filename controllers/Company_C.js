const customError = require('../middlewares/customError')
const services = require('../services')

const registerCompany = async (req, res)=>{

    const {name, email, address} = req.body
    const createObject = {name, email, address}

    const {data, code, message, errormsg, errname} = await services.Company_S.registerCompany_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname:"registerCompany error")

    res.status(code).json({message, status:code, data})

}

const getCompany = async (req, res)=>{
    const {id, name, email} = req.query


    const createObject = {id, name, email}

    const {data, code, message, errormsg, errname} = await services.Company_S.getCompany_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname:"getCompany error")

    res.status(code).json({message, status:code, data})

}

const getCompanies = async (req, res)=>{

    const {page, limit} = req.query
    const createObject = {page, limit}

    const {data, code, message, errormsg, errname} = await services.Company_S.getCompanies_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname:"getCompanies error")

    res.status(code).json({message, status:code, data})
}

const updateCompany = async (req, res)=>{

    const createObject = {}

    const {data, code, message, errormsg, errname} = await services.Company_S.getCompany_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname:"updateCompany error")

    res.status(code).json({message, status:code, data})

}

const deleteCompany = async (req, res)=>{

    const createObject = {}

    const {data, code, message, errormsg, errname} = await services.Company_S.getCompany_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname:"deleteCompany error")

    res.status(code).json({message, status:code, data})

}

module.exports = {registerCompany, getCompany, getCompanies, updateCompany, deleteCompany}
