'use strict';

$(document).ready(() => {
  $('button').on('click', function () {
    console.log($(this));
    let ls = JSON.parse(localStorage.getItem('yelp_ids')) || [];
    let $inputs = $(this).parent().children().filter('input');
    let place = {
      yelp_id: $inputs[0].value,
      name: $inputs[1].value,
      category: $inputs[2].value,
      rating: $inputs[3].value,
      address: $inputs[4].value,
      yelp_url: $inputs[5].value,
      image_url: $inputs[6].value,
      latitude: $inputs[7].value,
      longitude: $inputs[8].value
    }
    ls.push(place);
    localStorage.setItem('yelp_ids', JSON.stringify(ls));
  });
});