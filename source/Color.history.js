/*! Copyright (c) 2009, Three Dub Media (http://code.google.com/p/color-js/) */

/**
 *
 * @author Three Dub Media (threedubmedia@gmail.com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @reference http://www.w3.org/TR/css3-color/
 * @updated 2011-05-09
 *
 */
 
// create a private scope, with some local arguments
;(function( Color ){
	
// static history method
Color.history = function( key, val ){
	var ret = false;
	// setting 
	if ( !cache[ key ] && val ){
		cache[ key ] = val;
		keys.push( key );
		// check the limit
		if ( keys.length > limit ){
			delete cache[ keys.unshift() ];	
		}
	}
	// getting
	if ( cache[ key ] && val === undefined ) 
		ret = cache[ key ]; 
	return ret;
};

var cache = Color.history.cache = {},
keys = Color.history.keys = [],
limit = Color.history.limit = 99;

// close private scope, pass namespace
})( window.Color ); 