const express = require('express')
const router = express.Router()

const auth = require('../middlewares/Authentication')

const validate = require('../middlewares/validate')

const {createInvoice, getInvoice, getInvoices} = require('../controllers/Invoice_C')

const {createInvoice_V, getInvoice_V, getInvoices_V} = require('../validators/Invoice_V')

router.post('/createInvoice', auth(['Admin','Sub-Admin']), validate(createInvoice_V), createInvoice)

router.get('/getInvoice', auth(['Admin','Sub-Admin','Customer']), validate(getInvoice_V), getInvoice)

router.get('/getInvoices', auth(['Admin','Sub-Admin','Customer']), validate(getInvoices_V), getInvoices)


module.exports = router