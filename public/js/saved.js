'use strict';

$(document).ready(() => {
  let ls = JSON.parse(localStorage.getItem('yelp_ids')) || [];

  let id = window.location.pathname.split('/')[3];
  if (!ls.includes(id)) {
    ls.push(id);
  }

  localStorage.setItem('yelp_ids', JSON.stringify(ls));

  ls.forEach(place => {
    $.ajax({
      url: `/place/${place}`,
      method: 'GET',
      success: data => {
        let newCard = $('<div>', { class: 'card' }).append($('<h3>').text(data.name));
        $('.card-container').append(newCard);
      }
    })
  });
});

{/* <h3>
<%= place.name %>
</h3>
<img src="<%= place.image_url %>" alt="image" />
<p>Specialties:
<%= place.categories %>
</p>
<p>Rating:
<%= place.rating %>
</p>
<p>Open Now:
<%= place.hours %>
</p>
<address>
<%= place.address %>
</address>
<p><a href="<%= place.yelp_url %>">External Link</a></p> */}