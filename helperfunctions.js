'use strict';
// I love the amount of commenting you have in this file. <3

//Setup server modules
const pg = require('pg');
// I think I have a slight preference that dotenv configuration be done in your server file,
// with the rest of your configuration.
require('dotenv').config();
const superagent = require('superagent');
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
// Hmm, that's not how you add an event listener for error...
// Should just be on('error')
client.on('pages/error', error => console.error(error));

//Querying and receiving results from API
const getResults = (req, res) => {
  // You could use superagent's .query() for this! https://visionmedia.github.io/superagent/#get-requests
  let query = 'term=food';
  let cat = `&categories=${req.query.cuisine.toLowerCase()}`;
  let radius = `&radius=${req.query.radius * 1609}`;
  let lat = `&latitude=${req.query.lat}`;
  let long = `&longitude=${req.query.long}`;
  let limit = `&limit=50`;
  let price = `&price=${req.query.price}`;

  superagent.get(`https://api.yelp.com/v3/businesses/search?${query}${cat}${radius}${long}${lat}${limit}${price}`)
    .set({ 'Authorization': 'Bearer ' + process.env.YELP_KEY })
    .end((err, apiResponse) => {
      if (err) {
        res.render('pages/error', { err: err });
      } else {
        let restaurants = apiResponse.body.businesses;
        if (restaurants.length) {
          restaurants = apiResponse.body.businesses.slice(0, 3);
        }
        let results = restaurants.map(place => ({
          yelp_id: place.id,
          name: place.name,
          image_url: place.image_url,
          // the next line fills me with joy
          categories: place.categories.map(item => item.title).join(', '),
          rating: place.rating,
          address: place.location.display_address.join('\n'),
          // wish this was called 'open' or something instead of hours
          hours: (place.is_closed ? 'No :(' : 'Yes!!'),
          lat: place.coordinates.latitude,
          long: place.coordinates.longitude,
          yelp_url: place.url
        }));
        res.render('pages/results', { results: results, search: req.query.search });
      }
    });
}

//Add restaurant to favorite restaurants
const addPlace = (req, res) => {
  let SQL = 'INSERT INTO restaurants (yelp_id, name, category, rating, address, yelp_url, image_url, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;';
  let values = [
    req.body.yelp_id,
    req.body.name,
    req.body.category,
    req.body.rating,
    req.body.address,
    req.body.yelp_url,
    req.body.image_url,
    req.body.latitude,
    req.body.longitude
  ];
  client.query(SQL, values, (err, result) => {
    if (err) {
      res.render('pages/error', { err: err });
    } else {
      res.redirect(`pages/saved/${result.rows[0].id}?save=true`);
    }
  });
}

//Value passed to partial in order to save to local storage
const saveLocal = (req, res) => {
  res.render('pages/saved', { save: req.query.save });
}

//Query to database to get specific database entry
const returnData = (req, res) => {
  let SQL = 'SELECT * FROM restaurants WHERE id=$1;';
  let values = [req.params.id];
  client.query(SQL, values, (err, result) => {
    if (err) {
      res.render('pages/error', { err: err });
    } else {
      res.send(result.rows[0]);
    }
  });
}

//Delete restaurant from favorite places
const deletePlace = (req, res) => {
  let SQL = 'DELETE FROM restaurants WHERE id = $1;';
  let values = [req.body.id];
  client.query(SQL, values, (err) => {
    if (err) {
      res.render('pages/error', { err: err });
    } else {
      res.render('pages/saved');
    }
  });
}

//Exporting helper functions
module.exports = {
  getResults: getResults,
  addPlace: addPlace,
  saveLocal: saveLocal,
  returnData: returnData,
  deletePlace: deletePlace
}
