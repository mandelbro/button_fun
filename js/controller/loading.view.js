
/**
 * loading View Controller
 * handles button elements for our awesome mobile button experiment
 */
function loadingViewController(parentobj, initElement) {
	// declare vars
	var self = this, _loadingTemplatePreprocess;
	// setup the initial loading element
	this.init(parentobj, initElement);
	// add templates
	this.templates = {

		'loading'	: function(variables) {
			// no variables for this template
			// add the text
			var output = $('<div id="loading-text"></div>')
										.append(
											'<p class="loading-text-header">' +
												'<span class="left-stack"><span class="bigger">Fun</span> With</span>' +
												'<span class="big-dashed">Buttons</span>' +
											'</p>' +
											'<p class="loading-text-subheader">' +
												'<span class="big-dashed">&amp;</span>' +
												'<span class="bold">other cool things as well</span>' +
											'</p>'
										)
										.append(variables.slink);

			return output;
		}

	}

	// setup the loading template preprocess function
	_loadingTemplatePreprocess = function(variables) {
		var slink, slinkX = 0, slideComplete = false;
		// setup the listeners for the start here dragger
		slink = $('<a class="loading-text-enter-link"><span class="pictos">[</span>Start Here</a>');
		// activate the startlink movement on touch start
		// deactivate the startlink movement on touch end
		slink.on('touchstart', function(event) {
			slinkMove = event.originalEvent.pageX + slinkX;
			slink[0].style.webkitTransition = null;
		});

		slink.on('touchend', function(event) {
			// if we didn't complete the slide, reset it back to zero
			if(!slideComplete) {
				slinkX = 0;
				slink[0].style.webkitTransform = 'translateX(0px)';
				slink[0].style.webkitTransition = '-webkit-transform .5s ease';
			}
		});

		// deactivate the startlink movement on touch end
		slink.on('touchmove', function(event) {
			if(slideComplete) return;
			// determine the location of the tap with respect to the page width and adjust for tap location on the element
			slinkX = Math.floor((slinkMove - event.originalEvent.pageX) * 0.95);
			// set the max move window width - element width
			var max = (window.outerWidth - slink.outerWidth());
			slinkX = slinkX > max ? max : slinkX;
			slink[0].style.webkitTransform = 'translateX(-'+ slinkX +'px)';
			// if we've completed the slide, set the slide complete flag
			if(slinkX == max) {
				slideComplete = true;
				// we'll do one of two things, rotate the entire element and move it away
				// or grab each individual element and rotate and move
				// either way we're rotating and moving amirite!?
				//self.elements.main[0].style.webkitTransition = '-webkit-transform .4s ease'; // set transition
				var translateElements, translateX, translateY;
				translateY = window.outerHeight;
				translateX = window.outerWidth;
				//self.elements.main[0].style.webkitTransform = 'translateY('+ translateY +'px)'; // set transform
				// fire the code to remove the loading screen
				translateElements = $('#'+ self.elements.main.attr('id') +' span, #'+ self.elements.main.attr('id') +' a');
				translateElements.each(function(index, element) {
					// gets all descendant elements
					window.setTimeout(function() {
						element.style.webkitTransition = '-webkit-transform .4s ease'; // set transition
						element.style.webkitTransform = 'translateX(-'+ Math.round(translateX * 1.5) +'px)';
					}, (index * 100));
				});
				window.setTimeout(function() {
					// remove the main loading element
					self.elements.main.remove();
					// send out an event for application launched
					$(document).trigger('launchapp');
				}, (translateElements.length * 100));
			}
		});
		// send it to the theme function via the variables object
		variables.slink = slink;
	};

	// update the main content element
	this.theme('loading', this.elements.main, {}, _loadingTemplatePreprocess);

}

/*
 * extend the ViewController Object
 */
loadingViewController.prototype = new ViewController();