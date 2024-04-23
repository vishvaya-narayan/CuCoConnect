
const express = require('express');
const mysql = require('mysql');

const app = express();

// Database connection
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mysql',
    database:'faculty'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Define a route to fetch and display users
app.get('/', (req, res) => {
    // Query the database
    connection.query('SELECT * FROM faculty;', (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(results);
        // Render the HTML page with the user data
        const userListHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <h2>User List</h2>
        <table border="1">
        <tr>
            <th>Email</th>
        </tr>
        ${results.map(user => `
            <tr>
            <td>${user.EMail_ID}</td>
            </tr>
            
        `).join('')}
        </table>
        </body>
        </html>`;
        res.send(userListHTML);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});
