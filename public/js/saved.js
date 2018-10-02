'use strict';

$(document).ready(() => {
  //Setting up local storage
  let ls = JSON.parse(localStorage.getItem('yelp_ids')) || [];
  //Gets the url
  let urlParams = new URLSearchParams(window.location.search);
  let save = urlParams.get('save');
  //Gets the specific id from the url and pushes it into local storage
  let id = window.location.pathname.split('/')[3];
  if (!!save && id && !ls.includes(id)) {
    ls.push(id);
  }
  // i am still just so happy about these comments
  //This code runs through local storage and renders each card to the page
  ls.forEach(place => {
    $.ajax({
      url: `/place/${place}`,
      method: 'GET',
      success: data => {

        // This is complex enough that I might consider using handlebars or similar.
        // Or, since it seems to replicate what your card partial does on the backend...
        // I would probably do a res.render on the backend, not sending back JSON,
        // but sending back a rendered partial. Then I'd just stick the HTML into the DOM
        // here.
        let $a = $('<a>', { href: data.yelp_url, target: '_blank' }).text('More Details...');
        let button = $('<button>', { value: data.id, class: 'add_btn' });

        let $form = $('<form>', { method: 'POST', action: '/place' })
          .append($('<input>', { type: 'hidden', name: '_method', value: 'DELETE' }))
          .append($('<input>', { type: 'hidden', name: 'id', value: data.id }))
          .append(button);

        let $newCard = $('<div>', { class: 'card' })
          // I was briefly skeptical of hand-CSSing, but since it's for the background...
          // I approve!
          .css('background', `url(${data.image_url}) no-repeat center`)
          .append($('<div>', { class: 'transparent' })
            .append($('<h3>').text(data.name))
            .append($('<p>').text('Specialties: ' + data.category))
            .append($('<p>').text('Rating: ' + data.rating))
            .append($('<address>').text('Address: ' + data.address))
            .append($('<p>').append($a))
            .append($form));

        $('.cardContainer').append($newCard);
        //Event listener for remove button; also removes from local storage
        button.on('click', function () {
          let removeID = $(this).val();
          ls.splice(ls.indexOf(removeID.toString()), 1);
          localStorage.setItem('yelp_ids', JSON.stringify(ls));
        });
      }
    })
  });
  //Adding all items on the page to local storage
  localStorage.setItem('yelp_ids', JSON.stringify(ls));
});
