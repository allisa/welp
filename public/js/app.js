'use strict';

$(document).ready(() => {
  function getLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getLocation().then(position => {
    let $lat = $('#lat');
    let $long = $('#long');

    $lat.val(position.coords.latitude);
    $long.val(position.coords.longitude);
  });

  $('#clearAll').on('click', () => {
    localStorage.clear();
  });

  $('#add').on('click', function () {
    JSON.parse(localStorage.get('yelp_ids') || []).push($('#add').val());
  });
});
