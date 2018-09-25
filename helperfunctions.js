'use strict';

const pg = require('pg');
require('dotenv').config();
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', error => console.error(error));
const superagent = require('superagent');

const getResults = (req, res) => {
  superagent.get('urlforyelp')
    .end((err, apiResponse) => {
      if (err) {
        res.render('error', { err: err });
      } else {
        let results = //complete after talking with jimmy about yelp api results
    }
      res.render('pages/search/results', { results: results });
    });
}

const deleteRestaurant = (req, res) => {
  let SQL = 'DELETE FROM resaurants WHERE rest_id = $1;';
  let values = [req.params.id];
  client.query(SQL, values, (err, result) => {
    if (err) {
      res.render('error', { err: err });
    } else {
      res.redirect('/pages/saved');
    }
  });
}