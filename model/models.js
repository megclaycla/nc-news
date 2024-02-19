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





module.exports = {selectTopics, selectArticleById}