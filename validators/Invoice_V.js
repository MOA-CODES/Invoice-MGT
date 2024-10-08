const Joi = require('joi');

const createInvoice_V = {
    body: Joi.object().keys({
        services: Joi.array().required().items(
            Joi.alternatives().try(
            Joi.string().guid({ version: 'uuidv4' }),
            Joi.string().valid('general'))
        ),
        Userid: Joi.alternatives().try(
            Joi.string().guid({ version: 'uuidv4' }),
            Joi.string().valid('general')).required(),
    })
}

const getInvoice_V = {
    query: Joi.object().keys({
        id: Joi.alternatives().try(
            Joi.string().guid({ version: 'uuidv4' }),
            Joi.string().valid('general')).optional(),   
        name: Joi.string().optional(),
        email: Joi.string().optional().email()     
    }).or('id', 'name', 'email')
}

const getInvoices_V = {
    query: Joi.object().keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
    })
}

module.exports = {createInvoice_V, getInvoice_V,getInvoices_V}