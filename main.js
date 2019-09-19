const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const fs = require('fs')
const bodyParser = require('body-parser')
const JsonDB  = require('node-json-db').JsonDB
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config
var db = new JsonDB(new Config("token", true, false, '/'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/token', function (req, res) {
    let reqBody = req.body
    db.push('/'+reqBody.local,reqBody.data)
    res.send(reqBody)
});

app.get('/token', (req, res) => {
    let resData = db.getData("/UDH")
    res.send(resData)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))