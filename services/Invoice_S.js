const {StatusCodes} = require('http-status-codes')
const services = require('../services')
const customerNum = require('../services').customerNumber
const db = require('../models')

const createInvoice_S = async (data)=>{
    try{
        const check = await db.User.findOne({where: {id: data.Userid}})

        if(!check){
            return {errormsg:"User doesn't exist", code: StatusCodes.NOT_FOUND}
        }

        let total = 0;

        for(let i=0; i<data.services.length; i++){
            const check2 = await db.Service.findOne({where: {id: data.services[i]}})

            if(!check2){
                return {errormsg:"A Service doesn't exist", code: StatusCodes.NOT_FOUND}
            }

            total = total + Number(check2.total)
        }

        const cNumber = await customerNum() 

        console.log(cNumber, "==================================================================================================")

        const genCiid = services.Template_S.Template_MOA(cNumber)

        data.ciid = genCiid

        data.total = total

        const Invoice = await db.Invoice.create(createObject)

        return{data:Invoice, message:"Invoice Created", code: StatusCodes.OK }

    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const getInvoice_S = async (data)=>{
    try{
        const searchObject = {}

        if(data.id){
            searchObject.id = data.id

        } if(data.ciid){
            searchObject.ciid = data.ciid
            
        } if(data.Userid){
            searchObject.Userid = data.Userid

        }if(Object.keys(searchObject).length === 0){
            return {errormsg:"Provide id, ciid or Userid", code: StatusCodes.BAD_REQUEST}
        }

        const Invoice = await db.Invoice.findOne({ where: searchObject})

        return {code: StatusCodes.OK, message:"Invoice Search Success", data: Invoice}
    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const getInvoices_S = async (data)=>{
    try{
        const page = Number(data.page) || 1
        const limit = Number(data.limit) || 10
        const offset = (page - 1) * limit //offset or skip

        const Invoices = await db.Invoice.findAll({limit, offset})

        return {message:"Invoices retrieved", data:Invoices, code: StatusCodes.OK}
    }catch(e){
        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

module.exports = {createInvoice_S, getInvoice_S, getInvoices_S}