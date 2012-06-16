
/**
 * Widebar View Controller
 * handles button elements for our awesome mobile button experiment
 */
var widebarViewController = {
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
				output = '<header id="widebar-header">'+
									 '<div id="widebar-header-calendar">'+
										 '<a rel="#calendar-popover" class="launch-ios-popover pictos" href="#">\</a>'+
										 '<div id="popoverCalendar" class="js-init"></div>'+
									 '</div>'+
									 '<h2 class="widebar-header-date">'+
										 '<span class="day-name">'+ variables.dayName +'</span>'+
										 '<span class="day-number">'+ variables.dayNumber +'</span>'+
									 '</h2>'+
								 '</header>';

				return output;
			},

			'section'	: function(variables) {
				var output;
				// here we would use the date property of the variables object to pull up the correct
				// node from the model
				// this.model.getNodes(type, date, uid);
				output = '<section id="widebar-section">'+
									 '<div class="node-item">'+
										 '<h2 class="node-header">Algebra II</h2>'+
										 '<p class="node-description">The branch of mathematics concerning the study of the rules of operations and relations, and the constructions and concepts arising from them, including terms, polynomials, equations and algebraic structures.</p>'+
										 '<table class="node-data">'+
											 '<colgroup>'+
												 '<col class="label">'+
												 '<col class="content">'+
											 '</colgroup>'+
											 '<tr>'+
												 '<td>Subject</td>'+
												 '<td>Math</td>'+
											 '</tr>'+
											 '<tr>'+
												 '<td>Meeting Time</td>'+
												 '<td>9:00 AM to 10:00 AM (Mon, Wed, Fri)</td>'+
											 '</tr>'+
											 '<tr>'+
												 '<td>Location</td>'+
												 '<td>Room 102</td>'+
											 '</tr>'+
											 '<tr>'+
												 '<td>Number of Students</td>'+
												 '<td>34</td>'+
											 '</tr>'+
										 '</table>'+
									 '</div>'+
								 '</section>';

				return output;
			}

		};
	},

	templatePreprocess_header : function(variables) {
		var date = new Date();
		variables.dayName = date.getDayName();
		variables.dayNumber = date.getDate();
		// generate calendar markup
		// setup the section based on the header date
		this.theme('section');
	},

	templatePreprocess_section : function(variables) {

	},

	applicationLaunched : function(event) {
		console.log('App is launched!');
	}

}

/**
 * Popover Category View Controller
 * handles button elements for our awesome mobile button experiment
 */
var popoverCalendarViewController = {
	hookInit : function() {
		// setup the initial loading element
		this.init(parentobj, initElement);
		// remove the empty div
		this.elements.main.remove();
	}
};