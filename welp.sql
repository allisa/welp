CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  yelp_id text,
  name VARCHAR(255),
  cuisine VARCHAR(64),
  rating DECIMAL(2,1),
  longitude DECIMAL(9,6),
  latidude DECIMAL(9,6),
  hours text
);