const express = require('express');
const app = express();
const { getTopics, getEndpoints, getArticleById, getArticles, getCommentsByArticleId , postCommentToArticleController, patchArticleById, deleteCommentById, getUsers} = require('./controller/controllers')
const {handlePSQLErrors, handleServerError, handleInvalidEndpoint, handleCustomErrors} = require('./controller/error.controllers')
app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentToArticleController)

app.patch('/api/articles/:article_id', patchArticleById)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.get('/api/users', getUsers)

app.all('/*', handleInvalidEndpoint)

app.use(handleCustomErrors)

app.use(handlePSQLErrors)

app.use(handleServerError)

module.exports = app;