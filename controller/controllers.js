const { selectTopics } = require('../model/models')
const endpoints = require("../endpoints.json");

const getTopics = (request, response, next) => {
    selectTopics()
    .then((topics) => {
        return response.status(200).send({ topics })
    })
    .catch((err) => {
        next(err)
    })
}

const getEndpoints = (request, response, next) => {
    return response.status(200).send({ endpoints })
}

module.exports = {getTopics, getEndpoints};