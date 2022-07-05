# Cilikly Link Shortener

### Description
A clone of bit.ly link shortener

### Tech Stack

- HTML, CSS, JavaScript
- Tailwind CSS
- Node.js
- MySQL database

### How to run?

1. Install Node.js in your machine
2. Install package with npm
    ```
    npm install
    ```
3. Change `.env` file value according to your own value.
    Variable description:
    
    | Variable       | Description                                                          |
    | -------------- | ---------------------------------------------------------------------|
    | DB_HOST        | Database host name.                                                  |
    | DB_USER        | Database user name                                                   |
    | DB_PASS        | Database password for user above.                                    |
    | DB_USERNAME    | Database username that have acces to CRUD operation in table         |
    | DB_PORT        | Port where the database is run.                                      |
    | APP_DOMAIN     | Change the value if you want to deploy on spesific domain (optional) |
    
4. Run Database Migration
   ```
   npx db-migrate up
   ```
5. Run the app
   
   App can be started with this command:
   ``` 
   npm start 
   ```
