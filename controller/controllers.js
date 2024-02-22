const { 
    selectTopics, 
    selectArticleById, 
    selectArticles, 
    selectCommentsByArticleId, 
    postCommentToArticle,
    patchVotesOnArticle 
} = require('../model/models')
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

const getCommentsByArticleId = (request, response, next) => {
    const {article_id }= request.params
    selectCommentsByArticleId((article_id))
    .then((comments) => {
        return response.status(200).send({ comments })
    })
    .catch((err) => {
        next(err)
    })
}

const postCommentToArticleController = (request, response, next) => {
    const { article_id } = request.params
    const commentToPost = request.body
    postCommentToArticle(article_id, commentToPost)
    .then((postedComment) => {
        return response.status(201).send(postedComment);
    })
    .catch((err) => {
        next(err)
    })
}

const patchArticleById = (request, response, next) => {
    const { article_id } = request.params
    const numberToUpdateBy = request.body

    patchVotesOnArticle(article_id, numberToUpdateBy)
    .then((updatedArticle) => {
        return response.status(200).send(updatedArticle)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {
    getTopics, 
    getEndpoints, 
    getArticleById, 
    getArticles, 
    getCommentsByArticleId, 
    postCommentToArticleController,
    patchArticleById
};