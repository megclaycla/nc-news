const db = require('../db/connection')
const fs = require("fs/promises")

function selectTopics() {
    return db.query('SELECT * FROM topics;')
    .then((result) => {
        return result.rows;
    });
};

function selectArticleById(article_id){
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count 
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id 
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`, [article_id])
    
    .then(({rows}) => {
        if(rows.length === 0 ) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows[0]
    })
}

function selectArticles(query, sort_by = 'created_at', order = 'DESC') {
    const validSortBys = ['created_at', 'votes', 'topic', 'comment_count']
    
    const validOrders = ['ASC', 'DESC']

    if(!validSortBys.includes(sort_by)) {
        return Promise.reject({status: 400, msg: "bad request"})
    }
    if(!validOrders.includes(order)){
        return Promise.reject({status: 400, msg: "bad request"})
    }
    
    let sqlString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id`
    const queryVals = []

    
    if(query) {
        sqlString += ` WHERE articles.topic = $1`
        queryVals.push(query)
    }


    sqlString += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`


    return db.query(sqlString, queryVals)
    .then((result) => {
        if(result.rows.length === 0) {
            return []
        }
        return result.rows;
    })
};

function selectCommentsByArticleId(article_id){
    return db.query('SELECT * FROM comments WHERE comments.article_id = $1;', [article_id])
    .then(({rows}) => {
        if(rows.length === 0 ) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows
    })
}

function postCommentToArticle(article_id, {author, body} ){
    return db.query(`INSERT INTO comments 
    ( article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;`, 
    [article_id, author, body])
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows[0]
    })

}

function patchVotesOnArticle(article_id, {inc_votes = 0}) {
    return db.query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [inc_votes, article_id])
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows[0]
    }) 
}

function removeCommentById(comment_id) {
    return db.query(`DELETE FROM comments 
    WHERE comment_id = $1;`, [comment_id])
    .then((result) => {
        if(result.rowCount === 0){
            return Promise.reject({status: 404, msg: 'team does not exist'})
            } 
    });
}


function selectUsers() {
    return db.query('SELECT * FROM users;')
    .then((result) => {
        return result.rows;
    });
}

module.exports = {
    selectTopics, 
    selectArticleById, 
    selectArticles, 
    selectCommentsByArticleId, 
    postCommentToArticle, 
    patchVotesOnArticle,
    removeCommentById,
    selectUsers
}