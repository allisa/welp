'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('./public'));

const PORT = process.env.PORT || 3000;

app.get('*', (req, res) =>{
  res.render('index');
})

app.listen(PORT);
