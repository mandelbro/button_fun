/**
 * chrono.js
 *
 * Extends the JavaScript Date class to enable deriving dates and time
 * and formatting them for Scriblr's purposes
 *
 * Need a method that will return info for the current month
 * Need a method that will return the day of the month for a given timestamp
 * Need a method that will accept a timestamp, and return the applicable day of the month
 */


/**
 * Date.getPostDate()
 * Returns a formatted postDate for a given timestamp
 *
 * @timestamp
 *		Optional timestamp for which to return a post date, if none is specified,
 *		current post date will be used
 */
Date.prototype.getPostDate = function() {
	//declare vars

	return this.getMonth() + '_' + this.getDate() + '_' + this.getFullYear();

};

/**
 * Date.getMonthName()
 * converts a month integer to a month name
 *
 * @index
 *		an integer between 0-11 representing a month of the year
 */
Date.prototype.getMonthName = function(index) {

	var array = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	return array[index];

};

/**
 * Date.getDayName()
 * converts a day of the week integer to a day name
 *
 * @index
 *		an integer between 0-6 that represents the day of the
 * 		week, *not the day of the month*
 */
Date.prototype.getDayName = function(index) {

	index = !index ? this.getDay() : index;

	var array = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	return array[index];

};

/**
 * Date.getDaysBeforeDate()
 * returns an array of day objects which occur before the specified date
 *
 * @date
 *		the date object from which you need to retrieve the previous days of the month
 */
Date.prototype.getDaysBeforeDate = function() {
	//declare vars
	var i;
	var iterdate = this;
	var array = []
	var n = 0;
	var oneDay = 1000 * 60 * 60 * 24;
		//create the day objects and add them to the matrix as we go
		//we can determine this by looping through and subtracting a day away from the current day until the day is less than 1
	for(i = this.getDate(); i > 1; i--) { //starting at the current day, count down until i is no longer > 0
		//calculate the day's timestamp
		iterdate = new Date(iterdate.getTime() - oneDay); //get a new object from the iterdate - one day
		array[n] = iterdate;
		n++; //iterate n

	}

	//reverse the array since we counted backwards (up front, up back, up side ... upside yo head)
	return array.reverse();

};

/**
 * Date.getDaysAfterDate()
 * returns an array of day objects which occur after the specified date
 *
 * @date
 *		the date object from which you need to retrieve the subsequent days of the month
 */
Date.prototype.getDaysAfterDate = function() {
	//declare vars
	var i;
	var iterdate = this;
	var array = []
	var n = 0;
	var oneDay = 1000 * 60 * 60 * 24;
	//@TODO: allow for this function to receive both a date or timestamp

	//loop through to get total number of days in the month remaining
	//we can determine this by looping through and adding a day to the current day until the month is different from the current month

	for(i = this.getDate() + 1; i < 50; i++) { //starting at the current day, count up until the month is not the same as the current month
		//calculate the day's timestamp
		iterdate = new Date(iterdate.getTime() + oneDay); //get a new object from the iterdate + one day

		if(iterdate.getMonth() != this.getMonth()) {
			break;
			i = 0;
		}
		else {
			array[n] = iterdate;
		}

		n++; //iterate n
	}

	return array;

};

/**
 * Date.getDaysAfterMonth()
 * returns an array of day objects which occur after the month of the specified date
 *
 * @date
 *		the date object from which you need to retrieve the previous days of the month
 */
Date.prototype.getDaysAfterMonth = function() {
	//declare vars
	var i;
	var iterdate = this;
	var array = []
	var n = 0;
	var oneDay = 1000 * 60 * 60 * 24;
		//we'll need to fill in until 0 with days from previous month
		//add those to the matrix

	//figure out the day of the week the last day is on
		//fill in array until 6 with days from the next month
		//add those to the matrix

	for(i =  this.getDay(); i < 6; i++) { //starting at the current day, count down until i is no longer > 0
		//calculate the day's timestamp
		iterdate = new Date(iterdate.getTime() + oneDay); //get a new object from the iterdate + one day

		array[n] = iterdate;

		n++; //iterate n

	}

	//return the array
	return array;

};

/**
 * Date.getDaysBeforeMonth()
 * returns an array of day objects which occur before the specified date
 *
 * @date
 *		the date object from which you need to retrieve the previous days of the month
 */
Date.prototype.getDaysBeforeMonth = function() {
	//declare vars
	var i;
	var iterdate = this;
	var array = []
	var n = 0;
	var oneDay = 1000 * 60 * 60 * 24;
		//we'll need to fill in until 0 with days from previous month
		//add those to the matrix

	//figure out the day of the week the last day is on
		//fill in array until 6 with days from the next month
		//add those to the matrix

	for(i =  this.getDay(); i > 0; i--) { //starting at the current day, count down until i is no longer > 0
		//calculate the day's timestamp
		iterdate = new Date(iterdate.getTime() - oneDay); //get a new object from the iterdate + one day

		array[n] = iterdate;

		n++; //iterate n

	}

	//return the reversed array since we counted back, up back, up front, upside, upside your head
	return array.reverse();

};