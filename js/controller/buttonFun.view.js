/**
 * buttonFun View Controller
 * handles button elements for our awesome mobile button experiment
 */
function biblioSidebarViewController(parentobj, initElement) {

  //var self = this;
  //grab the json array from the init element
  this.info = $.parseJSON(initElement.find('.json:first').text());
  this.parent = parentobj;
  this.clickable = new Clickable(this);
  this.data; // Holds the data we want to render

  //setup the initial loading element
  this.buildElements(initElement);

}

/**
 * biblioSidebarViewController.buildElements
 * Builds the resource list view controller output elements for the first
 * time.
 * Generates the this.element property that will hold the markup which
 * contains the main resource list element
 *
 * @param initElement
 * 		The init element for the view controller
 */
biblioSidebarViewController.prototype.buildElements = function(initElement) {
	//define the elements literal
	this.elements = {};

	//first define the element wrapper
	this.elements.wrapper = $('<div id="biblioteca-sidebar-folder">');
	//define the wrapping list elements
	this.elements.bibliolist = $('#biblioteca-list');
	//build the array of biblioteca list items
	this.elements.listItems = this.elements.bibliolist.find(('.biblioteca-list-item'));
	//init the folder list elements
	this.initBibliofolderElements();

	//If
	this.buildFolderList();

	//init the sidebar filter
	this.biblioFilter = new biblioFilterViewController(this,this.elements.wrapper);

	initElement.replaceWith(this.elements.wrapper);
	//initElement.detach(); // The wrapper is already being put in via the block content function. BHZ
};