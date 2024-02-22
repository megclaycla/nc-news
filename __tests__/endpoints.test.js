const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');
const request = require('supertest');
const testData = require('../db/data/test-data/index');
const { toBeSortedBy } = require('jest-sorted');
const endpoints = require("../endpoints.json");
const convertTimestampToDate = require('../db/seeds/utils')

afterAll(() => {
    db.end;
})

beforeEach(()=>{
    return seed(testData);
})

describe('GET /api/topics', () => {
    test('should return a 200 status code ', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    });
    test('should respond with topics with the following keys', () => {
        return request(app)
        .get('/api/topics')
        .then((response) => {
            const topics  = response.body.topics;
            expect(topics.length).toBe(3)
            topics.forEach((topic) => {
                expect(topic).toHaveProperty("slug")
                expect(topic).toHaveProperty("description")
                expect(typeof topic.slug).toBe('string');
                expect(typeof topic.description).toBe('string');
            })
        })
    });
    test('status: 404, repsonds with an error message when route does not exist', () => {
        return request(app)
        .get('/api/tropical')
        .expect(404)
        .then((response) => {
            const error = response.body
            expect(error.msg).toBe("path not found")
        })
    });
});

describe('GET /api', () => {
    test('should return a 200 status code', () => {
        return request(app)
        .get('/api')
        .expect(200)
    });
    test('should return an object', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const endpoint = response.body.endpoints
            expect(typeof endpoint).toBe("object");
        })
    });
    test("should return an object containing all the available API endpoints", () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const endpoint = response.body.endpoints;
            expect(endpoint).toEqual(endpoints);
        });
    });
    });

describe('GET /api/articles/:article_id', () => {
    test('should respond with an article object with the following properties', () => {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((articleData) => {
            const article = articleData.body.articles
            expect(article.article_id).toBe(2)
            expect(article.title).toBe('Sony Vaio; or, The Laptop')
            expect(article.topic).toBe('mitch')
            expect(article.author).toBe('icellusedkars')
            expect(article.created_at).toBe('2020-10-16T05:03:00.000Z')
            expect(article.votes).toBe(0)
            expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
        })
    });
    test('should respond with an article object with the following properties', () => {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((articleData) => {
            const article = articleData.body.articles
            expect(typeof article.article_id).toBe("number")
            expect(typeof article.title).toBe('string')
            expect(typeof article.topic).toBe('string')
            expect(typeof article.author).toBe('string')
            expect(typeof article.body).toBe('string')
            expect(typeof article.created_at).toBe('string')
            expect(typeof article.votes).toBe("number")
            expect(typeof article.article_img_url).toBe('string')
        })
    });
    test('should return a 404 status code when passed a valid article number', () => {
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
        });
    });
    test('should return a 400 status code when passed an invalid article number', () => {
        return request(app)
        .get('/api/articles/pies')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
});
    
describe('GET /api/articles', () => {
    test('should return a 200 status code ', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
    });
    test('should respond with articles with the following keys', () => {
        return request(app)
        .get('/api/articles')
        .then((response) => {
            const articles  = response.body.articles;
            expect(articles.length).toBe(13)
            articles.forEach((article) => {
                expect(article).toHaveProperty("author")
                expect(article).toHaveProperty("title")
                expect(article).toHaveProperty("article_id")
                expect(article).toHaveProperty("topic")
                expect(article).toHaveProperty("created_at")
                expect(article).toHaveProperty("votes")
                expect(article).toHaveProperty("article_img_url")
                expect(article).toHaveProperty("comment_count");
            })
        })
    });
    test('should respond with articles with keys of the following types', () => {
        return request(app)
        .get('/api/articles')
        .then((response) => {
            const articles  = response.body.articles;
            expect(articles.length).toBe(13)
            articles.forEach((article) => {
                expect(typeof article.author).toBe('string');
                expect(typeof article.title).toBe('string');
                expect(typeof article.article_id).toBe('number');
                expect(typeof article.topic).toBe('string');
                expect(typeof article.created_at).toBe('string');
                expect(typeof article.votes).toBe('number');
                expect(typeof article.article_img_url).toBe('string');
                expect(typeof article.comment_count).toBe('number');
            })
        })
    });
    test('articles should be sorted by date in descending order ', () => {
        return request(app)
        .get('/api/articles')
        .then((response) => {
            const { articles } = response.body
            expect(articles).not.toBeSortedBy('created_at')
        })
    });
    test('should not be a body property present on any of the article objects', () => {
        return request(app)
        .get('/api/articles')
        .then((response) => {
            const articles  = response.body.articles;
            
            articles.forEach((article) => {
                expect(article).not.toHaveProperty('body');
            })
        })
    });
    test('status: 404, repsonds with an error message when route does not exist', () => {
        return request(app)
        .get('/api/pies')
        .expect(404)
        .then((response) => {
            const error = response.body
            expect(error.msg).toBe("path not found")
        })
    });
});

describe('GET /api/articles/:article_id/comments', () => {
    test('should return a 200 status code', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
    });
    test('should return an array of comments for the given article_id', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .then((commentData) => {
            expect(commentData.body.comments.length).toBe(11)
        })
    });
    test('each comment should have properties of the following type', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .then((commentData) => {
            const comments = commentData.body.comments
            comments.forEach((comment)=> {
                expect(typeof comment.comment_id).toBe('number')
                expect(typeof comment.body).toBe('string')
                expect(typeof comment.article_id).toBe('number')
                expect(typeof comment.author).toBe('string')
                expect(typeof comment.created_at).toBe('string')
                expect(typeof comment.votes).toBe('number')
            }) 
        });
    });
    test('GET:400 responds with an appropriate error message when given an invalid id', () => {
        return request(app)
        .get('/api/articles/not-an-id/comments')
        .expect(400)
        .then((response) => {
        expect(response.body.msg).toBe('Bad request');
        });
    });
    test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/999/comments')
        .expect(404)
        .then((response) => {
        expect(response.body.msg).toBe('article does not exist');
        });
    });
});

describe('POST /api/articles/:article_id/comments', () => {
    test('responds with a 201 status code', () => {
        const newComment = {
            author: "icellusedkars",
            body: "I carry a frog — yes."
        };
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
    });
    test('should insert a new comment to the db and sends the new comment back to the client', () => {
        const newComment = {
            author: "icellusedkars",
            body: "I carry a frog — yes."
        };
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(typeof response.body.comment_id).toBe('number')
            expect(response.body.article_id).toBe(1)
            expect(response.body.author).toBe("icellusedkars")
            expect(response.body.body).toBe("I carry a frog — yes.",)
            expect(response.body.votes).toBe(0)
            expect(typeof response.body.created_at).toBe('string')
        })
    });
    test('should respond with a 400 status code when provided with an invalid article', () => {
        const newComment = {
            author: "icellusedkars",
            body: "I carry a frog — yes."
        };
        return request(app)
        .post('/api/articles/not-an-article/comments')
        .send(newComment)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
    test('should respond with a 404 status code when provided with a valid article that doesn\'t exist ', () => {
        const newComment = {
            author: "icellusedkars",
            body: "I carry a frog — yes."
        };
        return request(app)
        .post('/api/articles/999/comments')
        .send(newComment)
        .expect(404)
        .then((response) => {

            expect(response.body.msg).toBe('article does not exist');
        });
    });
    });

describe('PATCH /api/articles/:article_id', () => {
    test('200: responds with updated article', () => {
        const updateVotes = { inc_votes: 1 };
        return request(app)
        .patch('/api/articles/1')
        .send(updateVotes)
        .expect(200)
        .then((response) => {
            expect(response.body.article_id).toBe(1)
            expect(response.body.title).toBe('Living in the shadow of a great man')
            expect(response.body.author).toBe('butter_bridge')
            expect(response.body.body).toBe('I find this existence challenging',)
            expect(response.body.votes).toBe(101)
            expect(typeof response.body.created_at).toBe('string')
            expect(response.body.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
        })
    });
    test('should respond with a 400 status code when provided with an invalid article', () => {
        const updateVotes = { inc_votes: 1 };
        return request(app)
        .patch('/api/articles/dog')
        .send(updateVotes)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
    test('should respond with a 404 status code when provided with a valid article that doesn\'t exist ', () => {
        const updateVotes = { inc_votes: 1 };
        return request(app)
        .patch('/api/articles/999999')
        .send(updateVotes)
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
        });
    });
    test('should respond with a 400 status code when provided with an invalid vote number', () => {
        const updateVotes = { inc_votes: 'cat' };
        return request(app)
        .patch('/api/articles/1')
        .send(updateVotes)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
});