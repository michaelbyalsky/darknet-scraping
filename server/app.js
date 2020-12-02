const express = require("express");
const app = express();
const path = require('path');
var cors = require('cors')


app.use(cors())
app.use(express.json({ limit: '50mb' }));

app.use(require("./middelware/morgan"));

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", require("./api"));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
module.exports = app;
