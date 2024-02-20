const { selectTopics, selectArticleById, selectArticles } = require('../model/models')
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

const getArticleById = (request, response, next) => {
    const article_id = request.params.article_id
    selectArticleById((article_id))
    .then((articles) => {
        return response.status(200).send({ articles })
    })
    .catch((err) => {
        next(err)
    });
};

const getArticles = (request, response, next) => {
    const { query, sort_by } = request.query
    selectArticles(query, sort_by)
    .then((articles) => {
        return response.status(200).send({ articles })
    })
    .catch((err) => {
        next(err)
    });
}


module.exports = {getTopics, getEndpoints, getArticleById, getArticles};