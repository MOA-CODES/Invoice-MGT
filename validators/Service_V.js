const Joi = require('joi');
const custom_V = require('./custom_V')


const createService_V = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        currency: Joi.string().required().custom(custom_V.currency),
        unitprice: Joi.number().required(),
        quantity: Joi.number().required()
    })

}

const getService_V = {
    query: Joi.object().keys({
        id: Joi.alternatives().try(
            Joi.string().guid({ version: 'uuidv4' }),
            Joi.string().valid('general')).optional(),   
        name: Joi.string().optional(),
    }).or('id', 'name') 
}

const getServices_V = {
    query: Joi.object().keys({
        page: Joi.string().optional(),   
        limit: Joi.string().optional(),
    })
}

const updateService_V = {
    
}

const deleteService_V = {
    
}

module.exports = {createService_V, getService_V, getServices_V, updateService_V, deleteService_V}

