const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');
const request = require('supertest');
const testData = require('../db/data/test-data/index');
const { toBeSortedBy } = require('jest-sorted');
const endpoints = require("../endpoints.json");

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
    test('should return a 200 status code', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
    });
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
    });
    test('should return a 400 status code when passed an invalid article number', () => {
        return request(app)
        .get('/api/articles/pies')
        .expect(400)
    });
});
    