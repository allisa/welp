'use strict';

//This code gets the location from the user's device
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
});
