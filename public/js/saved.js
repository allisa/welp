'use strict';

$(document).ready(() => {
  let ls = JSON.parse(localStorage.getItem('yelp_ids')) || [];

  let urlParams = new URLSearchParams(window.location.search);
  let save = urlParams.get('save');

  let id = window.location.pathname.split('/')[3];
  if (!!save && id && !ls.includes(id)) {
    ls.push(id);
  }

  ls.forEach(place => {
    $.ajax({
      url: `/place/${place}`,
      method: 'GET',
      success: data => {

        let $a = $('<a>', { href: data.yelp_url, target: '_blank' }).text('More Details...');
        let button = $('<button>', { id: 'remove', value: data.id }).text(`Never Again!`);

        let $form = $('<form>', { method: 'POST', action: '/place' })
          .append($('<input>', { type: 'hidden', name: '_method', value: 'DELETE' }))
          .append($('<input>', { type: 'hidden', name: 'id', value: data.id }))
          .append(button);

        let $newCard = $('<div>', { class: 'card' })
          .append($('<h3>').text(data.name))
          .append($('<img>', { src: data.image_url, alt: 'image' }))
          .append($('<p>').text('Specialties: ' + data.category))
          .append($('<p>').text('Rating: ' + data.rating))
          .append($('<address>').text('Address: ' + data.address))
          .append($('<p>').append($a))
          .append($form);

        $('.cardContainer').append($newCard);
        $('button').on('click', function () {
          let removeID = $(this).val();
          ls.splice(ls.indexOf(removeID.toString()), 1);
          localStorage.setItem('yelp_ids', JSON.stringify(ls));
        });
      }
    })
  });
  localStorage.setItem('yelp_ids', JSON.stringify(ls));
});
