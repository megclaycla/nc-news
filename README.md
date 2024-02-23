# Northcoders News API

### A link to the hosted version.
https://nc-news-npka.onrender.com

### Project Summary:
**Background:**
<br>This project is all about building an API for the purpose of accessing application data programmatically. 

The intention is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

The database is PSQL, and you will interact with it using node-postgres.

For this project I built the following endpoints which can be found in the endpoints.json file or via the following path: 
<br>

- **GET /api**


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
npm install
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