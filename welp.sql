CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  yelp_id text, -- Since this tops out at 15ish chars, would prefer a varchar here
  name VARCHAR(255),
  category VARCHAR(255),
  rating DECIMAL(2,1),
  address text,
  yelp_url text,
  image_url text,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6)
);
