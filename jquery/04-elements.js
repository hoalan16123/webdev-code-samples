$(document).ready(function () {
  $('body')
    .css({ fontFamily: 'sans-serif' })
    .append($('<h1>').text('jQuery 04 - Creating Elements'))
    .append(
      $('<main>').append(
        $('<ul>')
          .css({
            listStyleImage: 'url(../_assets/spongebob.png)',
            marginLeft: '40px',
            textDecoration: 'underline',
          })
          .append($('<li>').text('SpongeBob SquarePants'))
          .append($('<li>').text('Patrick Star'))
          .append($('<li>').text('Sandy Cheeks'))
          .append($('<li>').text('Pearl Krabs'))
          .append($('<li>').text('Mr Krabs'))
          .append($('<li>').text('Squidward Tentacles'))
      )
    );
});
