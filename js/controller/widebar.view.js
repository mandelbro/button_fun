
/**
 * Widebar View Controller
 * handles button elements for our awesome mobile button experiment
 */
function widebarViewController(parentobj, initElement) {

	// setup the initial loading element
	this.init(parentobj, initElement);

	// add templates
	this.templates = {

		'main'	: function(variables) {
			var output;
			// add the header
			output = $('<header id="widebar-header"></header>')
							 .append(
							 	'<h1 class="widebar-header-title">Content Header</h1>'
							 );


			return output;
		}

	}

	// update the main content element
	this.theme('main', this.elements.main);

	// add a handler for the launchapp event
	$(document).on('launchapp', function(event){
		console.log('App is launched!');
	});

}

/*
 * extend the ViewController Object
 *
 */
widebarViewController.prototype = new ViewController();