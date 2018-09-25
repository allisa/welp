'use strict';

const pg = require('pg');
require('dotenv').config();
const superagent = require('superagent');

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', error => console.error(error));

const getResults = (req, res) => {
  console.log(req.query);
  let query = 'term=food&';
  let lat = `&latitude=${req.query.lat}`;
  let long = `&longitude=${req.query.long}`;
  let limit = `&limit=4`;

  superagent.get(`https://api.yelp.com/v3/businesses/search?${query}${long}${lat}${limit}`)
    .set({ 'Authorization': 'Bearer ' + process.env.YELP_KEY })
    .end((err, apiResponse) => {
      if (err) {
        console.log('inside of error')
        res.render('error', { err: err });
      } else {
        let results = apiResponse.body.businesses.map(place => ({
          name: place.name,
          image: place.image_url,
          category: place.categories[0].title,
          rating: place.rating,
          hours: (place.is_closed ? 'No :(' : 'Yes!!'),
          url: place.url
        }));

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
