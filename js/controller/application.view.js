
/**
 * Application View Controller
 * handles button elements for our awesome mobile button experiment
 */
var applicationViewController = {

	hookInit : function() {
		// remove the empty div
		this.elements.main.remove();
		// setup the document wide touchmove event listener to disable scrolling and zooming
		$(document).on("touchmove", function(event) {
			event.preventDefault(); // all your touch belong to us!
		});
		// setup the document wide tap event listener to disable scrolling and zooming
		$(document).on("touchstart", function(event) {
			var target = !event.originalEvent.target ? $(event.originalEvent.target) : $(event.target);
			if(target && target.hasClass('allow-native')) return true;
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

};