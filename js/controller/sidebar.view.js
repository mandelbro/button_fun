
/**
 * Sidebar View Controller
 * handles button elements for our awesome mobile button experiment
 */
var sidebarViewController = {
	hookInit : function() {
		// update the main content element
		this.theme('header');
		// add a handler for the launchapp event
		$(document).on('launchapp', this.applicationLaunched);
	},
	hookTheme : function() {
		// add templates
		return {

			'header'	: function(variables) {
				var output;
				// add the header
				output = '<header id="sidebar-header">'+
									 '<div id="sidebar-header-categories">'+
										 '<a rel="#category-popover" class="launch-ios-popover" href="#">'+
											 'Classes <span class="pictos">4</span>'+
										 '</a>'+
										 '<div id="popoverCategory" class="js-init"></div>'+
									 '</div>'+
								 '</header>';

				return output;
			},

			'section'	: function(variables) {
				var output;
				// here we would use the date property of the variables object to pull up the correct
				// node from the model
				// this.model.getNodes(type, date, uid);
				output = '<section id="sidebar-section">'+
									 '<ul class="category-list">'+
										 '<li class="category-list-item">'+
										 '</li>'+
									 '</ul>'+
								 '</section>';

				return output;
			}

		};
	},
	templatePreprocess_header : function(variables) {
		// setup the section based on the selected category
		this.theme('section', { category : 'classes' });
	},

	templatePreprocess_section : function (variables) {
	},

	applicationLaunched : function(event) {
		console.log('App is launched!');
	}
};