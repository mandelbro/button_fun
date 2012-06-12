/**
 * init.js
 * Initializes controller functions
 */
$(document).ready(function() {
	var controllers = {};
	// loop through the DOM and find init elements
	$('.js-init').each(function(index, element) {
		element = $(element);
		var id = element.attr('id');
		controllers[id] = new window[id + 'ViewController'](null, element);
	});

});