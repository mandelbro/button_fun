//first let's create an instance of the ClickableListener object
var clickableListener;

$(document).ready(function(event) {
	//assign the global to the new instance of ClickableListener
 clickableListener = new ClickableListener();
});

/**
 * Clickable()
 * A class used to handle all click events in an application.
 * Use by setting up Outlet listeners, which are class names
 * placed on the applicable html elements.
 *
 * This class should be used as a child object of your view
 * controller, it will attempt to find a class name that
 * matches one of your specified listeners, and call that
 * function directly.
 *
 * @param callbackObject
 *		The parent object, needed since JS doesn't have a way
 *		of refering to it's parent function and we'll be
 *		calling methods of that object
 * @param actions
 *		An array of actions to call when an element on the page
 *		is clicked
 *
 * @example
 * 		For an example on the use of this class, let's say you
 * 		have a delete button on the DOM which will remove a
 *		corresponding element from the DOM and perform some
 *		background tasks to manage it's deletion.
 *
 * 		Clickable works in 3 parts, the clickable event listener
 *		which listens for the click, your view controller which
 *		houses the functionality related to the click event,
 *		and the html "target" element which fires the click event.
 *
 *		Clickable uses a full document event listener, and bubbling
 *		to target the clicked element.
 *
 *		So here is how it would work
 *
 *		1). In your view controller class you would create a new
 *				object "clickable", at this time you can send it the
 *				names of any actions you want to register upon init.
 *				Actions will fire a callback in your view controller
 *				class when a click event occurs
 *
 *				Application_viewController() {
 *					... (stuff before)
 *					this.clickable = new Clickable('Application_viewController', ['deleteItem'])
 *					... (stuff after)
 *				}
 *
 *				Or you can use the Clickable.addAction(actions) method to add
 *				more actions to the clickable object as you go.
 *
 *				Application_viewController.prototype.insertDeleteLink = function() {
 *
 *					//add a new <a> tag to the DOM
 *					var deleteElement = $('<a href="...">Delete</a>');
 *					DOMElement.append(derpElement);
 *					//add the derp action to the clickable object
 *					this.clickable.addAction(['deleteItem']);
 *					... (more stuff)
 *
 *				};
 *
 *		2). Next, you'll need to add the deleteItem method to your
 *				view controller class, each clickable action accepts
 *				three arguments:
 *					- target : is the element that was clicked on to trigger
 *						the event, this a convenience method as target is simply
 *						taken from the event object, however it has also been
 *						converted to a jQuery object, ie target = $(event.target);
 *					- next : the next action to run in the clickable queue,
 *						this is a function which should be called at the end of
 *						your action's program flow. If you have any timed events
 *						it should be called after the latest timed event to avoid
 *						actions being called concurrently which can cause issues.
 *						You can read more about the clickable queue in the init method.
 *					- event : the entire event object, only necessary for actions
 *						which require more information about the click event than
 *						just the html element that was clicked
 *
 *				Application_viewController.prototype.deleteItem = function(target, next, event) {
 *
 *					... (do stuff when the action is fired)
 *
 *					next(); //the stuf is done, call the next action in the queue
 *				};
 *
 *		3). Finally, You need to connect the dots by telling the html element
 *				on the DOM what action to fire when it gets clicked. For this
 *				example we'll only use one action but because we have queueing
 *				built into the class, you can use as many actions on a single
 *				element as you need.
 *
 *				... (html structure)
 *
 *					<a class="... (other classes) clickable_deleteItem">Delete</a>
 *
 *				... (html structure)
 *
 *				Or if you inserted the element onto the DOM programatically,
 *				you can simply add the appropriately formatted CSS class to the
 *				element.
 *
 *				Application_viewController.prototype.insertDeleteLink = function() {
 *
 *					... (previous stuff)
 *					//add the deleteItem class to the html element
 *					derpElement.addClass('clickable_deleteItem');
 *
 *				};
 *
 *		4). You're done, the <a> tag knows what action to tell clickable to call when
 *				gets clicked, Clickable knows what action callback to fire when
 *				that action is reported, and your view controller knows what to do when
 *				that action callback is requested! Horray for you!1!eleven!
 */
function Clickable(callbackObject, handlers) {
	var self = this;
	//specify object properties
	this.callback = callbackObject;
	//setup the actions array for this instance
	this.handlers = handlers || [];
	this.id = this.generateClickableID();
	//create an instance of the clickableListener
	this.listener = clickableListener.init(this.callback, this.id, this.handlers);

}

/*
 * Clickable.addHandler()
 * Allows you to add more handlers to the clickable event handler
 * array for this instance of clickable
 *
 * @param handler
 *		name of a handler to add to the clickable handlers array
 */
Clickable.prototype.addHandler = function(handler) {
	//add the new action(s) to the object's action
	this.listener.addHandler(handler, this.id);
};


Clickable.prototype.generateClickableID = function() {
	return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
							var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
							return v.toString(16);
					});
}

/**
 * ClickableListener
 * This sets up the actual listener class so we can init one body listener
 * on page load, and add new instances of clickable to that list, rather
 * than creating a new body listener for each instance of clickable
 */
function ClickableListener() {
	var self = this;

	this.callbacks = {};

	$('body').live('click', function(event) {
		//call the clickabl.init method
		self.event(event);
	});

}

/**
 * ClickableListener.init
 * registers each instance of Clickable so it's handlers can be run through
 * the global event handler
 */
ClickableListener.prototype.init = function(callback, id, handlers) {
	//add the callback and preset list of handlers
	this.callbacks[id] = {
		instance : callback,
		handlers : handlers || []
	};

	return this;
};

/**
 * ClickableListener.event()
 * Runs through the loop of available handlers for each page click
 * @param event
 * 		the event object passed from the event handler
 */
ClickableListener.prototype.event = function(event) {
	//declare self
	var self = this;

	//create the target element
	var target = $(event.target);
	//if the clickable_disable class is present, kill the process
	if(target.hasClass('clickable_disable')) {
		event.preventDefault();
		return;
	}
	//prevent the default event from firing, use .clickable_prevent to stop this from happening
	if(target.hasClass('clickable_prevent')) event.preventDefault();

	//if the element is embedded, run the embedded method
	if(target.hasClass('clickable_embedded')) {
		this.embedded(target, event);
		return;
	}

	/**
	 * The Clickable Loop
	 * Based on the principle that for a page with a high volume of event listeners there
	 * will be a smaller number of event handlers, i.e., a list of content where each listing
	 * has a handfull of elements with event listeners witch all refer to the same handlers.
	 * Instead of having an individual event listener for each element, the Clickable Loop
	 * registers every click on the page with a single event listener and loops through
	 * every possible event handler to see if the element that was clicked corresponds with
	 * a registered handler. The element tells Clickable if it corresponds with a handler
	 * by having a class with the name of a registered handler, prepended with 'clickable_'
	 * class. The idea is there will never be a huge number of handlers, but there can be
	 * a high number of elements, this allows you to have potentially thousands of elements
	 * with event handlers while using a minimal amount of resources.
	 *
	 * tl;dr this allows you to apply event handlers to a potentially infinite number of
	 * elements with minimal resource draw.
	 */
	$.each(this.callbacks, function(name, callback) {

		$.each(callback.handlers, function(index, handler){
			if($(target).hasClass('clickable_' + handler)) {
				/**
				 * The "clickable" Queue
				 * In order to allow for the possibility of multiple clickable action callbacks being
				 * fired on the same element for a single click, we need to queue each callback as to
				 * avoid any conflicts that may arise from having two functions being run concurrently.
				 * This means that at the end of your callback action, especially if any timers are
				 * implemented, simply call next(); in order to run the next method in the queue.
				 *
				 * For more info on jQuery queues visit the following link:
				 * @link http://api.jquery.com/queue/#queue2
				 */

				$('body').queue("clickable", function (next) {
					event.preventDefault(); // prevent the default action
					//add the next object to the event
					callback.instance[handler](target, next, event);
				});
			}
			else { //if any elements have the combined classes of visible and open, let's close them
				if(!target.parents('.visible.open').length) {
					$('.visible.open').removeClass('visible open');
				}
			}
		});
	});
	// begin the dequeueing process
	$('body').dequeue('clickable');

};

Array.prototype.unique = function() {
	var a = this.concat();
	for(var i=0; i<a.length; ++i) {
			for(var j=i+1; j<a.length; ++j) {
					if(a[i] === a[j])
							a.splice(j, 1);
			}
	}

	return a;
};

/*
 * ClickableListener.addHandler()
 * Allows you to add more handlers to the event handler array for
 * the specified callback
 *
 * @param handlers
 *		an array of action names to add to the clickable handlers array
 * @param callback
 *		the callback to add the handlers to
 */
ClickableListener.prototype.addHandler = function(handler, id) {

	//check the type of the handler to ensure it is an array
	if(typeof handler == 'string') handler = [handler];

	this.callbacks[id].handlers = this.callbacks[id].handlers.concat(handler).unique();


};

/**
 * Created By: CmoSlim
 * Clickable.embedded
 * allows embedded child elements in 'a' tags to reasign their click target
 * to their parent link element
 */
ClickableListener.prototype.embedded = function (target, event) {

	//define self
	var self = this;

	//declare vars
	var parent = target.closest('a');

	$.each(this.callbacks, function(name, callback) {
		$.each(callback.handlers, function(index, handler){
			if(parent.hasClass('clickable_' + handler)) {
				/**
				 * The "clickable" Queue
				 * In order to allow for the possibility of multiple clickable action callbacks being
				 * fired on the same element for a single click, we need to queue each callback as to
				 * avoid any conflicts that may arise from having two functions being run concurrently.
				 * This means that at the end of your callback action, especially if any timers are
				 * implemented, simply call next(); in order to run the next method in the queue.
				 *
				 * For more info on jQuery queues visit the following link:
				 * @link http://api.jquery.com/queue/#queue2
				 */
				$('body').queue("clickable_embedded", function (next) {
					event.preventDefault(); // prevent the default action
					//add the next object to the event
					callback.instance[handler](parent, next, event);
				});
			}
		});
	});

	// begin the dequeueing process
	$('body').dequeue('clickable_embedded');

	//don't worry about running cleanup here we want to stop the original queue

};