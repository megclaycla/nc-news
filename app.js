const express = require('express');
const app = express();
const { getTopics, getEndpoints, getArticleById, getArticles } = require('./controller/controllers')
const {handlePSQLErrors, handleServerError, handleInvalidEndpoint, handleCustomErrors} = require('./controller/error.controllers')


app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)



app.all('/*', handleInvalidEndpoint)

app.use(handleCustomErrors)

app.use(handlePSQLErrors)

app.use(handleServerError)

module.exports = app;