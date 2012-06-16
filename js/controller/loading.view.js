
/**
 * loading View Controller
 * handles button elements for our awesome mobile button experiment
 */
var loadingViewController = {

	hookInit : function() {
		// update the main content element
		this.theme('loading');
	},

	hookTheme : function() {
		return {
			'loading'	: function(variables) {
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
	},

	templatePreprocess_loading : function(variables) {
			var self = this, slink, slinkX = 0, slideComplete = false;
			// setup the listeners for the start here dragger
			slink = $('<a class="loading-text-enter-link animate"><span class="pictos">[</span>Start Here</a>');
			// activate the startlink movement on touch start
			// deactivate the startlink movement on touch end
			var _onTouchStart = function(event) {
				slinkMove = event.originalEvent.pageX + slinkX;
				slink[0].style.webkitTransition = null;
			};

			slink.on('touchstart', _onTouchStart);

			var _onTouchEnd = function(event) {
				// if we didn't complete the slide, reset it back to zero
				if(!slideComplete) {
					slinkX = 0;
					slink[0].style.webkitTransform = 'translateX(0px)';
					slink[0].style.webkitTransition = '-webkit-transform .4s ease-out';
				}
			};
			slink.on('touchend', _onTouchEnd);

			// deactivate the startlink movement on touch end
			var _onTouchMove = function(event) {
				if(slideComplete) return;
				// determine the location of the tap with respect to the page width and adjust for tap location on the element
				slinkX = Math.floor((slinkMove - event.originalEvent.pageX) * 0.95);
				// set the max move window width - element width
				var max = (window.outerWidth - slink.outerWidth());
				slinkX = slinkX > max ? max : slinkX;
				slink[0].style.webkitTransform = 'translateX(-'+ slinkX +'px)';
				// if we've completed the slide, set the slide complete flag
				if(slinkX == max) {
					// set the slideComplete flag to stop any more events from happening
					slideComplete = true;
					// I have no idea why this has to happen, with it, the element wont
					// all the way if the user's finger slides off the screen
					slink.css('-webkit-transform');
					//slink[0].style.webkitTransform = 'translateX(-'+ max +'px)';
					var translateElements, translateX, translateY;
					translateY = window.outerHeight;
					translateX = window.outerWidth;
					//self.elements.main[0].style.webkitTransform = 'translateY('+ translateY +'px)'; // set transform
					// fire the code to remove the loading screen
					translateElements = $('#'+ self.elements.main.attr('id') +' span, #'+ self.elements.main.attr('id') +' a');
					translateElements.each(function(index, element) {
						$(element).addClass('animate');
						// setup the transitions
						element.style.webkitTransition = '-webkit-transform .7s ease, opacity .3s ease'; // set transition
						// delay so we only see one block moving at a time
						element.style.webkitTransitionDelay = '.'+ index +'s';
						element.style.webkitTransform = 'translateX(-'+ Math.round(translateX * 1) +'px)';
						element.style.opacity = 0;
					});

					self.elements.main.addClass('animate');

					window.setTimeout(function() {
						// remove the main loading element
						window.setTimeout(function() { // wait for the transition to end ... fuck you transitionend event
							self.elements.main.remove();
						}, 400);
						// send out an event for application launched
						$(document).trigger('launchapp');
					}, (translateElements.length * 100));
						//console.log('transition ended!');
					self.elements.main[0].style.webkitTransition = '-webkit-transform .4s ease, opacity .3s ease-out';
					self.elements.main[0].style.webkitTransitionDelay = '.'+ translateElements.length +'s';
					//self.elements.main[0].style.webkitTransform = 'translateX(-'+ Math.round(translateX * 1) +'px)';
					self.elements.main[0].style.opacity = 0;
				}
			};
			slink.on('touchmove', _onTouchMove);
			// send it to the theme function via the variables object
			variables.slink = slink;
		}

};