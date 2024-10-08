//get customerNumber
const db = require('../models')

const date = new Date()

//Check there has been a customer or number for todays date, if none start from 0, if there is start from after the last number
//timestamp ex in postgres : 2024-04-25 20:33:36.914+01  date index is (8,10)
const customerNumber = async()=>{

    //YYYY-MM-DD format ex:createdAt: '2024-10-02'
    const todaysdate = date.toISOString().split('T')[0]

    const invoiceCheck = await db.Invoice.findAll({where:{createdAt:todaysdate}})
    console.log("=============",invoiceCheck)
    //check todays date then check if there is an invoice created at todays date, if none start from 0, if there is start from after total number of invoices with todays date
    if(invoiceCheck.length === 0){
        return 1
    }

    return invoiceCheck.length+1
    
}

module.exports = {customerNumber: customerNumber}