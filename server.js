
const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const config = {
    user: 'cppa-webadb-server-admin',
    password: 'Pakistan@2525',
    server: 'cppa-webadb-server.database.windows.net',
    database: 'cppa-webadb-database',
    options: {
        encrypt: true
    }
};

app.post('/submit', async (req, res) => {
    try {
        await sql.connect(config);
        await sql.query`INSERT INTO Users (Name, Email) VALUES (${req.body.name}, ${req.body.email})`;
        res.send("Data Saved!");
    } catch (err) {
        res.send("Error: " + err);
    }
});

app.listen(3000, () => console.log("Server running"));
