const db = require('../db/connection')

function selectTopics() {
    return db.query('SELECT * FROM topics;')
    .then((result) => {
        return result.rows;
    });
};

function selectArticleById(article_id){
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
    .then(({rows}) => {
        if(rows.length === 0 ) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows[0]
    })
}

function selectArticles(query, sort_by = 'created_at', order = 'DESC') {
    const validSortBys = ['created_at', 'votes']
    const validOrders = ['ASC', 'DESC']

    if(!validSortBys.includes(sort_by)) {
        return Promise.reject({status: 400, msg: "bad request"})
    }
    if(!validOrders.includes(order)){
        return Promise.reject({status: 400, msg: "bad request"})
    }
    
    const queryVals = []

    let sqlString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`


    if(query){
        if(sqlString.length){
            sqlString += ' AND';
        } else {
            sqlString += ` WHERE query = $1`
        }
        queryVals.push(query)
        sqlString += ` column_name = ${queryVals.length}`
    }

    // sqlString += ` ORDER BY ${sort_by} ${order}`

    return db.query(sqlString, queryVals)
    .then((result) => {
        return result.rows;
    })
    .catch((err) => {
        console.log(err)
    });
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

function patchVotesOnArticle(article_id, {inc_votes}) {
    return db.query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [inc_votes, article_id])
    .then(({rows}) => {
        console.log("rows >>>>", rows[0])
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows[0]
    }) 
}


module.exports = {
    selectTopics, 
    selectArticleById, 
    selectArticles, 
    selectCommentsByArticleId, 
    postCommentToArticle, 
    patchVotesOnArticle
}