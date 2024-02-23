\c nc_news_test


SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
GROUP BY articles.article_id
ORDER BY articles.created_at DESC;




SELECT * FROM topics;

SELECT * FROM articles;

SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count 
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id WHERE articles.article_id = 2
    GROUP BY articles.article_id;

    SELECT * FROM comments;