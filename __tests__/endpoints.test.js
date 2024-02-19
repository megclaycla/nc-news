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


    