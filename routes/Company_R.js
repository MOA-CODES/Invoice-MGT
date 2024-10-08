const express = require('express')
const router = express.Router()

// const middlewares = require('../middlewares')
// const controllers = require('../controllers')
// const validators = require('../validators')

const Auth = require('../middlewares/Authentication')

const validate = require('../middlewares/validate')

const {registerCompany, getCompany, getCompanies, updateCompany, deleteCompany} = require('../controllers/Company_C')
const {registerCompany_V, getCompany_V,getCompanies_V} = require('../validators/Company_V')

router.post('/registerCompany',Auth(['Admin','Sub-Admin']), validate(registerCompany_V), registerCompany)

router.get('/getCompany',Auth(['Admin','Sub-Admin','Customer']), validate(getCompany_V), getCompany)

router.get('/getCompanies',Auth(['Admin','Sub-Admin','Customer']), validate(getCompanies_V), getCompanies)

module.exports = router
