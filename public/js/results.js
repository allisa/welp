'use strict';

$(document).ready(() => {
  $('button').on('click', function () {
    console.log($(this));
    let ls = JSON.parse(localStorage.getItem('yelp_ids')) || [];
    ls.push($(this).val());
    localStorage.setItem('yelp_ids', JSON.stringify(ls));
  });
});