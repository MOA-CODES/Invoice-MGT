const Joi = require('joi');

const registerCompany_V = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        address: Joi.string().required()
    })
}

const getCompany_V = {
    query: Joi.object().keys({
        id: Joi.alternatives().try(
            Joi.string().guid({ version: 'uuidv4' }),
            Joi.string().valid('general')).optional(),   
        name: Joi.string().optional(),
        email: Joi.string().optional().email()     
    }).or('id', 'name', 'email')
}

const getCompanies_V = {
    query: Joi.object().keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
    })
}

module.exports = {registerCompany_V, getCompany_V,getCompanies_V}
