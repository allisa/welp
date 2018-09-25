'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');

const helperFunction = require('./helperfunctions');

const PORT = process.env.PORT;
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const methodOverride = require('method-override');

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.get('/results', (req, res) => res.render('pages/results')); //getResults);
//app.get('/search', (req, res) => res.render('index'));
app.get('/saved', (req, res) => res.render('pages/saved'));
app.get('/about', (req, res) => res.render('pages/about'));

app.get('*', (req, res) => {
  res.render('index');
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
