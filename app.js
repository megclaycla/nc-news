const express = require('express');
const app = express();
const { getTopics, getEndpoints, getArticleById } = require('./controller/controllers')


app.use(express.json())


app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)


app.use((err, request, response, next) => {
    if(err.code === '22P02'){
    response.status(400).send({msg: "Bad request"})
    }
    next(err)
})

app.use((err, request, response, next) => {
    if(err.status && err.msg) {
    response.status(err.status).send({msg: err.msg})
    } else if (err.status === 204) {
    response.status(err.status).send()
    }
})

module.exports = app;