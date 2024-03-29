
/**
 * Blueprint View Controller
 * BlueprintJS allows you to create dynamic view controller modules
 * which can do anything from create a simple website template without
 * the need for a server language, to full fledged application feature
 * modules that are well organized and do a decent enough job of
 * following the MVC structure.
 *
 * This is just something I've been using for a while, I'm looking into
 * MustacheJS and BackboneJS as they are most likely better options for
 * what BlueprintJS does...
 *
 * On to the good part!
 *
 * Each view controller object that extends this object inherits three
 * important methods: init, build, and theme
 *
 * @method init
 *		parses any JSON from the first element with the class .json,
 * 		this allows you to import a hashmap of data from a server
 *		language like PHP. The init function invokes the build method
 * @method build
 *		Setups up two important objects, elements and templates, which
 *		are used to manage dynamic content in the theme method
 * @method theme
 *		A theming engine invoked in by custom view controller modules
 *		to include html content
 */

var Blueprint = (function( $ )  {

	var Blueprint = function( module, initElement ) {
			// The Blueprint object is actually just the init constructor 'enhanced'
			return new Blueprint.fn.init( module, initElement );
		},
		controllers = {};

	// we'll just borrow $.extend from jQuery
	Blueprint.extend = jQuery.fn.extend;
	Blueprint.fn = Blueprint.prototype = {
		constructor : Blueprint,
		init : function( module, initElement ) {
			// extend the view controller module
			$.extend(this, module);
			// run build
			this.build(initElement);
			// run the init hook
			if(typeof this.hookInit == 'function') {
				this.hookInit();
			}
			return this;
		}
	};

	Blueprint.fn.init.prototype = Blueprint;

	Blueprint.extend({

		/**
		 * Blueprint.build
		 * Builds the resource list view controller output elements for the first
		 * time.
		 * Declares the this.element map that will hold specific elements
		 * Declares the this.templates map that allows you to use the theme system
		 *
		 * @param initElement
		 * 		The init element for the view controller
		 */
		build : function(initElement) {
			// define the elements object
			this.elements = {
				main : initElement.removeClass('blueprint-js') // important we remove blueprint-js here otherwise we'll get an infinite loop
			};
			// provide a hook to register more elements
			if(typeof this.hookElements == 'function') {
				this.elements = this.hookElements(this.elements); // this method should return an object of jQuery elements
			}

			// define the template object
			this.templates = {};

			// provide a hook to add template functions to the template object
			if(typeof this.hookTheme == 'function') {
				this.templates = this.hookTheme(); // this method should return an object of template functions
			}

			// define the model object
			var jsonElement = initElement.find('.json:first');
			this.model = {
				json : jsonElement.length ? jsonElement : false,
				data : jsonElement.length ? $.parseJSON(jsonElement.text()) : {}
			};

			// provide a hook for adding model functions to the model object
			if(typeof this.hookModel == 'function') {
				this.model = this.hookModel(this.model); // this will give you a place to implement model functions and properties
			}
		},

		/**
		 * Blueprint.theme
		 * Theme handling method
		 *
		 * @param template
		 * 		The template to insert from the .templates object
		 * @param variables
		 *		Map of variables to make available to the template
		 * @param element
		 *		The element to update
		 */
		theme : function(template, variables, element) {
			var output, method;
			// normalize inputs
			variables = !variables ? {} : variables;
			element = !element ? this.elements.main : element;
			// run the preprocess method if provided
			if(typeof this['templatePreprocess_'+ template] == 'function') {
				this['templatePreprocess_'+ template](variables);
			}
			// make the update type configurable from the variables array and preprocess function
			method = variables.updateMethod ? variables.updateMethod : 'append';

			try {
				// update the target element with content back from the template function
				element[method](this.templates[template](variables));
				// rescan the dom for any new triggers
				this.scan(element);
			}
			catch(e) {
				console.log(e);
			}

		},
		scan : function (element) {
			var elements = !element ? $('.blueprint-js') : $(element.find('.blueprint-js'));
			// loop through the DOM and find init elements
			elements.each(function(index, element) {
				element = $(element);
				var id = element.attr('id');
				try {
					controllers[id] = new Blueprint(window[id + 'ViewController'], element);
				}
				catch(e) {
					console.log(e);
				}
			});
		}

	});

	$(document).ready(Blueprint.scan);

})( jQuery );