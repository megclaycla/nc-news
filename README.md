# Northcoders News API

### A link to the hosted version.
https://nc-news-npka.onrender.com

### Project Summary:
**Background:**
<br>This project is all about building an API for the purpose of accessing application data programmatically. 

The intention is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

The database is PSQL, and you will interact with it using node-postgres.

For this project I built the following endpoints: 
<br>

- **GET /api/topics**
which responds with a list of topics

- **GET /api**
which responds with a list of available endpoints

- **GET /api/articles/:article_id**
which responds with a single article by article_id

- **GET /api/articles**
which responds with a list of articles

- **GET /api/articles/:article_id/comments**
which responds with a list of comments by article_id

- **POST /api/articles/:article_id/comments**
which adds a comment by article_id

- **PATCH /api/articles/:article_id**
which updates an article by article_id

- **DELETE /api/comments/:comment_id**
which deletes a comment by comment_id

- **GET /api/users**
which responds with a list of users

- **GET /api/articles (queries)**
which allows articles to be filtered and sorted

- **GET /api/articles/:article_id (comment count)**
which adds a comment count to the response when retrieving a single article

### Instructions: 
<br>
How to clone:<br><br>
1. Copy the repo URL<br>
2. Open Terminal<br>
3. Change the current working directory to the location where you want the cloned directory.<br>
4. Type git clone, and then paste the URL you copied earlier.<br>
5. Press Enter to create your local clone.<br><br>

<br>
How to install dependencies:<br><br>
    - jest: npm install --save-dev jest<br>
    - jest-sorted: npm install --save-dev jest-sorted<br>
    - nodemon: npm install --save-dev nodemon<br>
    - pg-format: npm install pg-format<br>
    - dotenv: npm install dotenv --save<br>
    - express: npm install dotenv --save<br>
    - pg: npm install pg<br>
    - supertest: npm install supertest --save-dev<br><br>
<br>
How to seed your local database:<br><br>
npm run seed<br><br>
<br>
How to run tests:<br><br>
npm t endpoints.test.js<br><br>

How to create the two .env files:
- You will need to create two .env files for your project: .env.test and .env.development
- Into each, add PGDATABASE=, with the correct database name for that environment 
- Double check that these .env files are .gitignored
- You'll need to run npm install at this point

### The minimum versions of Node.js, and Postgres needed to run the project:
Node.js: v21.5.0<br><br>
Postgres: ^8.7.3