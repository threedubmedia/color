/*! Copyright (c) 2009, Three Dub Media (http://code.google.com/p/color-js/) */

/**
 *
 * @author Three Dub Media (threedubmedia@gmail.com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @reference http://www.w3.org/TR/css3-color/
 * @updated 2010-07-08
 *
 */
 
// create a private scope, with some local arguments
;(function( Color ){
	
// extend Color.prototype
Color.extend({
	
	/**
	 * Convert the Color object to an Array and execute a custom function 
	 * or method against each member
	 *
	 * @name Color.prototype.array
	 * @function
	 * @param {String|Function} func 
	 *    Optional. The method name or custom function to execute against each color.
	 * @returns {Array}
	 *
	 * @example
	 *    Color("#FF0000").blend("#00FF00",5).array(); // [4278190335,3208642815,2155872511,1086259455,16711935]
	 *    Color("#FF0000").blend("#00FF00",5).array("hex"); // ["#FF0000","#BF4000","#808000","#40BF00","#00FF00"]
	 */
	"array": function( func ){ 
		if ( func )
			this.each( typeof func == "string" ? function( i, val ){
				this[ i ] = new Color().push( val )[ func ]();
			} : func );
		return [].slice.call( this );
	},
	
	/**
	 * Sort the Color members
	 *
	 * @name Color.prototype.sort
	 * @function
	 * @param {String|Function} func 
	 * @param {Boolean} desc 
	 * @returns {Color}
	 *
	 */
	"sort": function( func, desc ){
		desc = desc ? -1 : 1; // reverse sort?
		[].sort.call( this, function( a, b ){
			if ( typeof func == "string" ){
				a = new Color( a )[ func ](); 
				b = new Color( b )[ func ]();
			}
			else if ( func ) return func.apply( this, arguments );
			return ( a > b ? 1 : a < b ? -1 : 0 ) * desc;
		});
		return this;
	},
	
	/**
	 * Map the Color members to a new object through a callback function.
	 *
	 * @name Color.prototype.map
	 * @function
	 * @param {Function} func 
	 * @returns {Color}
	 *
	 */
	"map": function( func ){
		var color = new Color(), check;
		this.each(function( i ){
			check = func.apply( this, arguments );
			if ( check ) color.push( check ); // set new values
			return ( check !== false ); // break on false
		});
		return color;
	},	
	
	/**
	 * Remove and return the last member of the color object
	 *
	 * @name Color.prototype.pop
	 * @function 
	 * @returns {Color}
	 *
	 */
	"pop": function(){
		return new Color().push( 
			[].pop.call( this )
		);
	},
	
	/**
	 * Remove and return the first member of the color object
	 *
	 * @name Color.prototype.shift
	 * @function 
	 * @returns {Color}
	 *
	 */
	"shift": function(){
		return new Color().push( 
			[].shift.call( this )
		);
	}
		
});

// close private scope, pass namespace
})( window.Color ); 