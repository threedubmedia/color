/*! Copyright (c) 2009, Three Dub Media (http://code.google.com/p/color-js/) */

/**
 *
 * @author Three Dub Media (threedubmedia@gmail.com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @reference http://www.w3.org/TR/css3-color/
 * @updated 2010-07-09
 *
 */

// create a private scope, with some local arguments
;(function( Color ){

/**
 * Extends recognized Color names
 *
 * @name Color.learn 
 * @static  
 * @function
 * @param {Object|Number|String|Array|Color} color 
 *    an object of color/name pairs, or any color defining argument
 * @param {String} name 
 *    Optional. the name of the color to be stored.
 * @returns undefined
 */ 
Color.learn = function( color, name ){
	// one argument, iterate as an object for code/name pairs
	if ( !name ) 
		for ( var key in color ) 
			Color.learn( key, color[ key ] );
	// two args, add color code and name(s) to lookup hash tables
	else if ( color = Color( color ) ){ // evaluate color code
		Color._int2names[ color[0] ] = Color._int2names[ color[0] ] || ""; // prep the names
		for ( var i = 0, names = name.split(","); i < names.length; i++ ){ // iterate 
			name = names[ i ].replace( /^\s+|\s+$/g, "" ); // trim spaces
			if ( name.length ){ // skip empty strings...
				Color._int2names[ color[0] ] += name+","; // (store) "RRGGBB": "name1,name2,",
				Color._name2int[ name.toLowerCase() ] = color[0]; // (store) "name1": "RRGGBB", 
			}
		}
	}
};

/**
 * The object in which to store color names indexed by color code.
 *
 * @name Color._int2names 
 * @static 
 * @property {Object} 
 */
Color._int2names = {};

/**
 * The object in which to store color codes indexed by color name.
 *
 * @name Color._name2int 
 * @static 
 * @property {Object} 
 */
Color._name2int = {}; // lookup/storage objects
	
/**
 * Add the "name" Color format 
 *
 * @name Color.names 
 * @static 
 * @function
 * @param {String} name 
 *    the name to match against a stored value
 * @returns {Color}
 */ 

Color["names"] = Color.format(function( name ){
	var clr = Color._name2int[ String( name ).toLowerCase() ]; // try a case-insensitive lookup...
	if ( clr != undefined ) 
		return clr; // use stored code
});

/**
 * Add the "search" Color format, which matches partial names 
 *
 * @name Color.search 
 * @static 
 * @function
 * @param {String} name 
 *    the name to match against a stored value
 * @returns {Color}
 */ 
Color["search"] = Color.format(function( name ){
	var clr, pattern = new RegExp("(?:^|,)("+ String( name ).replace( PATTERN_ESCAPE, "\\$1" ) +"[^,]*),", "i" );
	for ( clr in Color._int2names ) // iterate color name cache
		if ( name = pattern.exec( Color._int2names[ clr ] ) ) // matched a name
			return parseInt( clr ); // use stored code
	});

// PRIVATE REGEXP PATTERN...
var PATTERN_ESCAPE = ( /(\/|\.|\*|\+|\?|\$|\^|\||\(|\)|\[|\]|\{|\}|\\)/g ); // characters to escape for RegExp


/**
 * Get the stored color name or store a new color name
 *
 * @name Color.prototype.name 
 * @static 
 * @function
 * @param {String} str 
 *    Optional. the name to store
 * @returns {Color|String}
 */ 
Color.prototype.name = function( str ){
	if ( str ) 
		Color.learn( this, str ); // store name 
	else return (( Color._int2names[ this.val() ] || "" )+',').split(',')[0]; // lookup 
	return this; 
};

// learn basic color names...
Color.learn({
	'#00000000': 'transparent,',
	'#000000': 'Black,',
	'#808080': 'Gray,Grey,',
	'#C0C0C0': 'Silver,',
	'#FFFFFF': 'White,',
	'#FF0000': 'Red,',
	'#800000': 'Maroon,',
	'#00FF00': 'Lime,',
	'#008000': 'Green,',
	'#0000FF': 'Blue,',
	'#000080': 'Navy,',
	'#FFFF00': 'Yellow,',
	'#808000': 'Olive,',
	'#00FFFF': 'Cyan,Aqua,',
	'#008080': 'Teal,',
	'#FF00FF': 'Magenta,Fuchsia,',
	'#800080': 'Purple,'
}); 

// close private scope, pass namespace
})( window.Color );