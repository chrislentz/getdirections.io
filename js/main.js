// Generate output
function generateOutput() {
  var output = '';
  var src = '';
  var data = '';

  src = 'https://www.google.com/maps/';

  if ($('#saddr').val() != '') {
    if (data == '') { data += '?' } else { data += '&'; }

    data += 'saddr=' + encodeURIComponent($('#saddr').val());
  }

  if ($('#daddr').val() != '') {
    if (data == '') { data += '?' } else { data += '&'; }

    data += 'daddr=' + encodeURIComponent($('#daddr').val());
  }

  if (data != '') {
    if ($('#directions-transit').hasClass('selected')) {
      data += '&dirflg=r';
    }
    else if ($('#directions-walking').hasClass('selected')) {
      data += '&dirflg=w';
    }
    else if ($('#directions-biking').hasClass('selected')) {
      data += '&dirflg=b';
    }
  }

  output = src + data;

  $('#output').val(output);
}

// Open link
function OpenLink(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

$(function() {
  generateOutput();

  // Handle tab interface
  $('body').on({
    'click': function(e) {
      e.preventDefault();

      var clicked = $(this);

      $(this).parent().find('li').removeClass('selected');
      $(this).addClass('selected');

      generateOutput();
    }
  }, '[data-tabs="tabs"] li');

  // Generate on saddr or daddr edit
  $('#saddr, #daddr').bind('change keyup input', function(e) {
    generateOutput();
  });

  // Handle map output type
  $('body').on({
		'click': function(e) {
			e.preventDefault();

      var trigger = $(this).attr('data-trigger');

      if (trigger == 'link') {
        $('[data-triggered="embeddable"]').css('display', 'none');
      }
      else if (trigger == 'embeddable') {
        $('[data-triggered="embeddable"]').css('display', 'block');
      }

      generateOutput();
		}
	}, '[data-trigger]');

  // Handle select all button
  $('body').on({
    'click': function(e) {
      e.preventDefault();

      $('#output').select();
    }
  }, '#select-all');

  // Handle preview button
  $('body').on({
    'click': function(e) {
      e.preventDefault();

      OpenLink($('#output').val());
    }
  }, '#preview');
});