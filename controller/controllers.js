const { selectTopics } = require('../model/models')

const getTopics = (request, response, next) => {
    const { query } = request.query
    selectTopics(query)
    .then((topics) => {
        return response.status(200).send({ topics })
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getTopics};