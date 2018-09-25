'use strict';

console.log('linked');
$(document).ready(() => {
  function getLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getLocation().then(position => {
    console.log('hits inside promise');
    console.log(position.coords.latitude);

    let $lat = $('#lat');
    let $long = $('#long');

    $lat.val(position.coords.latitude);
    $long.val(position.coords.longitude);
    console.log($lat.text());
    console.log($long.text());
  });
});