'use strict';

$(document).ready(() => {
  $('button').on('click', function () {
    console.log($(this));
    let ls = localStorage.getItem('yelp_ids') || [];
    let newIDs = JSON.parse(ls.push($(this).val()));
    localStorage.setItem('yelp_ids', JSON.stringify(newIDs));
  });
});