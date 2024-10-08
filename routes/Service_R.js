const express = require('express')
const router = express.Router()

const auth = require('../middlewares/Authentication')

const validate = require('../middlewares/validate')

const {createService, getService, getServices, updateService, deleteService} = require('../controllers/Service_C')

const {createService_V, getService_V, getServices_V, updateService_V, deleteService_V} = require('../validators/Service_V')

router.post('/createService', auth(['Admin','Sub-Admin']), validate(createService_V), createService)

router.get('/getService', auth(['Admin','Sub-Admin','Customer']), validate(getService_V), getService)

router.get('/getServices', auth(['Admin','Sub-Admin','Customer']), validate(getServices_V), getServices)


module.exports = router