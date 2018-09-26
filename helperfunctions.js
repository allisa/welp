'use strict';

const pg = require('pg');
require('dotenv').config();
const superagent = require('superagent');

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', error => console.error(error));

const getResults = (req, res) => {
  let query = 'term=food';
  let cat = `&categories=${req.query.cuisine.toLowerCase()}`
  let radius = `&radius=${req.query.radius * 1609}`;
  let lat = `&latitude=${req.query.lat}`;
  let long = `&longitude=${req.query.long}`;
  let limit = `&limit=4`;

  superagent.get(`https://api.yelp.com/v3/businesses/search?${query}${cat}${radius}${long}${lat}${limit}`)
    .set({ 'Authorization': 'Bearer ' + process.env.YELP_KEY })
    .end((err, apiResponse) => {
      if (err) {
        res.render('error', { err: err });
      } else {
        let results = apiResponse.body.businesses.map(place => ({
          yelp_id: place.id,
          name: place.name,
          image_url: place.image_url,
          categories: place.categories.map(item => item.title).join(', '),
          rating: place.rating,
          address: place.location.display_address.join('\n'),
          hours: (place.is_closed ? 'No :(' : 'Yes!!'),
          lat: place.coordinates.latitude,
          long: place.coordinates.longitude,
          yelp_url: place.url
        }));
        res.render('pages/results', { results: results });
      }
    });
}

const deleteRestaurant = (req, res) => {
  let SQL = 'DELETE FROM resaurants WHERE id = $1;';
  let values = [req.params.id];
  client.query(SQL, values, (err, result) => {
    if (err) {
      res.render('error', { err: err });
    } else {
      res.redirect('/pages/saved');
    }
  });
}

const addPlace = (req, res) => {
  let SQL = 'INSERT INTO restaurants(yelp_id, name, category, rating, address, yelp_url, image_url, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;'

  let values = [
    req.query.yelp_id,
    req.query.name,
    req.query.category,
    req.query.rating,
    req.query.address,
    req.query.yelp_url,
    req.query.image_url,
    req.query.latitude,
    req.query.longitude
  ];
  client.query(SQL, values, (err, result) => {
    if (err) {
      res.render('error', { err: err });
    } else {
      res.redirect('saved');
    }
  });
}

module.exports = {
  deleteRestaurant: deleteRestaurant,
  getResults: getResults,
  addPlace: addPlace
}
