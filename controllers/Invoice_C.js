const Services = require('../services')
const customError = require('../middlewares/customError')

const createInvoice = async(req, res)=>{

    const {services, Userid} = req.body
    const createObject = {services, Userid}

    const {data, code, message, errormsg, errname} = await Services.Invoice_S.createInvoice_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "createInvoice Error")

    res.status(code).json({message, status:code, data})

}

const getInvoice = async(req, res)=>{

    const {id, ciid, Userid} = req.query
    const createObject = {id, ciid, Userid}

    const {data, code, message, errormsg, errname} = await Services.Invoice_S.getInvoice_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "getInvoice Error")

    res.status(code).json({message, status:code, data})

}

const getInvoices = async(req, res)=>{

    const {page, limit} = req.query
    const createObject = {}

    const {data, code, message, errormsg, errname} = await Services.Invoice_S.getInvoices_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "getInvoices Error")

    res.status(code).json({message, status:code, data})

}

module.exports = {createInvoice, getInvoice, getInvoices}