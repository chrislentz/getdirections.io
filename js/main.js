function generateOutput() {
  var output = '';
  var src = '';
  var data = '';

  if ($('#output-link').hasClass('selected')) {
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
  }
  else if ($('#output-embeddable').hasClass('selected')) {
    src = 'https://www.google.com/maps/embed?';

    output = '<iframe src="' + src + '" width="600" height="450" frameborder="0" style="border:0"></iframe>';
  }

  $('#output').val(output);
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
  $('#saddr, #daddr').keyup(function(e) {
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
});