
/**
 * Application View Controller
 * handles button elements for our awesome mobile button experiment
 */
function applicationViewController(parentobj, initElement) {
	var _updateOrientation;
	// setup the initial loading element
	this.init(parentobj, initElement);
	// remove the empty div
	this.elements.main.remove();
	// setup the document wide touchmove event listener to disable scrolling and zooming
	$(document).on("touchmove", function(event) {
		event.preventDefault(); // all your touch belong to us!
	});
	// setup the document wide tap event listener to disable scrolling and zooming
	$(document).on("touchstart", function(event) {
		event.preventDefault(); // all your touch belong to us!
	});
	// setup the orientation monitor
	_updateOrientation = function(event) {
    switch(window.orientation) {
			case 180:
			case 0:
				// update the page class
				$('#page').attr('class', 'portrait');
				// change the path to the css file
				$('#orient-css').attr('href', 'css/portrait.css');
				break;

			case 90:
			case -90:
				// update the page class
				$('#page').attr('class', 'landscape');
				// change the path to the css file
				$('#orient-css').attr('href', 'css/landscape.css');
				break;
    }
	};
	// setup the first orientation
	_updateOrientation(null);
	// monitor changes in orientation
	$(window).on("orientationchange", _updateOrientation);

}

/*
 * extend the ViewController Object
 */
applicationViewController.prototype = new ViewController();