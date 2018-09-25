'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

const PORT = process.env.PORT;

app.get('/results', (req, res) => res.render('pages/results'));

app.get('*', (req, res) => {
  res.render('index');
})

app.listen(PORT);
