'use strict';

const pg = require('pg');
require('dotenv').config();
const superagent = require('superagent');

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', error => console.error(error));

const getResults = (req, res) => {
  superagent.get('https://api.yelp.com/v3/businesses/search?term=codefellows&location=seattle')
    .set({ 'Authorization': 'Bearer ' + process.env.YELP_KEY })
    .end((err, apiResponse) => {
      if (err) {
        res.render('error', { err: err });
      } else {
        let results = apiResponse.body;
        console.log(results);
        res.render('pages/results', { results: results });
      }
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

module.exports = {
  deleteRestaurant: deleteRestaurant,
  getResults: getResults
}