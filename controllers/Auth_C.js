const customError = require('../middlewares/customError')
const services = require('../services')

const register = async (req, res)=>{
    const {name, email, phone, company_name, company_address} = req.body

}

const login = async (req, res)=>{

}

const forgotPassword = async (req, res)=>{

}

module.exports = {register, login, forgotPassword}