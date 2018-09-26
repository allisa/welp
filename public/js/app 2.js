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

<<<<<<< HEAD


$('#clearAll').on('click', () => {
  localStorage.clear();
})
=======
  // $.ajax({
  //   url: '/'
  // })

  $('#clearAll').on('click', () => {
    localStorage.set('key', JSON.stringify(arr));
  });
});
>>>>>>> 0d1af86a6d7014d944161550e44b6bbe1e994235
