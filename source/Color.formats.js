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
 * Add the shorthand hexadecimal Color format 
 *
 * @name Color.format:hexShort 
 * @static 
 * @function
 * @param {String} hex 
 *    the hexadecimal string to parse into red, green, blue, alpha values
 * @returns {Color}
 */
Color.format((function(){
	// static private regular expression
	var PATTERN = /^#?([\da-f])([\da-f])([\da-f])$/i;
	// privledged format config function
	return function( hex ){
		if ( hex = PATTERN.exec( hex ) ) 
			return Color.rgb2int([
				parseInt( hex[1] + hex[1], 16 ),
				parseInt( hex[2] + hex[2], 16 ),
				parseInt( hex[3] + hex[3], 16 )
			]);
	};
})());

/**
 * Add random Color keywords 
 *
 * @name Color.format:random 
 * @static 
 * @function
 * @param {String} str 
 *    the keyword string to parse
 * @returns {Color}
 */
Color.format((function(){
	// static private regular expression
	var PATTERN = /^(?:random|\?|rand)$/i;
	// privledged format config function
	return function( str ){
		if ( PATTERN.test( str ) ) 
			return Color.rgb2int([
				Math.random() * 255,
				Math.random() * 255,
				Math.random() * 255,
				255
			]);
	};
})()); 

/**
 * Add Color gradient format
 *
 * @name Color.format:blend 
 * @static 
 * @function
 * @param {String} str 
 *    the keyword string to parse
 * @param {String} detail 
 *    the size of each blend
 * @returns {Color}
 * 
 * @example 
 *    Color('#000 > #0F0',4);
 *    Color('#123456 > ?',16);
 *    Color('#987654 > rgb(123,45,67)');
 *    Color('red > white > blue');
 */
Color.format(function( str, detail ){ 
	// "#FFFFFF > #000000" or "? > ?"
	if ( str.indexOf('>') > -1 ){
		var arr = str.split('>'), i, color = Color( arr[0] ); 
		for ( i = 1; i < arr.length; i++ )
			color.blend( arr[i], detail );
		return color;
	}
});

Color.format(function( str, percent ){ 
	// "#FFFFFF + #000000" or "? + ?"
	if ( str.indexOf('+') > -1 ){
		var arr = str.split('+');
		return Color( arr[0] ).mix( arr[1], percent );
	}
});

Color.format(function( str, detail ){ 
	// "#FFFFFF ~ #000000" or "? ~ ?"
	if ( str.indexOf('~') > -1 ){
		var arr = str.split('~'), i, color = Color( arr[0] ); 
		for ( i = 1; i < arr.length; i++ ){
			color.cycle( arr[i], detail );
		}	
		return color;
	}
});

/**
 * Extend the "rgb" Color format for percentages (0%-100%) 
 *
 * @name Color.format:rgbPercent
 * @static 
 * @function
 * @param {String} rgb 
 *    a string to parse into red, green, blue, alpha values
 * @returns {Color}
 */
Color.format( (function(){
	// compile a private regular expression
	var NUM = "\\s*(0|-?\\d*\\d+\\d*\\.?\\d*%)\\s*",
	PATTERN = new RegExp("^rgba?\\("+ NUM+","+ NUM +","+ NUM +"(?:,"+ NUM +")?\\)$","i");
	// the privledged format config function
	return function( rgb ){
		if ( rgb = PATTERN.exec( rgb ) ) 
			return Color.rgb2int([
				parsePercent( rgb[1] ), // RED
				parsePercent( rgb[2] ), // GREEN
				parsePercent( rgb[3] ), // BLUE
				parsePercent( rgb[4] || "100%" ) // ALPHA
			]);
	}; 
	// static private function
	function parsePercent(n){
		return parseFloat(n.replace("%",""))*2.55;
	};
})() );

/**
 * Extend the "rgb" Color format for decimal values (0-1) 
 *
 * @name Color.format:rgbDecimal
 * @static 
 * @function
 * @param {String} rgb 
 *    a string to parse into red, green, blue, alpha values
 * @returns {Color}
 */
Color.format( (function(){
	// compile a private regular expression
	var NUM = "\\s*(-?(?:1|0?\\.\\d+(?:e[\\+\\-]\\d+)?))\\s*", // Numeric Pattern Fragment
	PATTERN = new RegExp("^rgba?\\("+ NUM +","+ NUM +","+ NUM +"(?:,"+ NUM +")?\\)$","i");
	// the privledged format config function
	return function( rgb ){
		if ( rgb = PATTERN.exec( rgb ) ) 
			return Color.rgb2int([
				255 * parseFloat( rgb[1] ), // RED
				255 * parseFloat( rgb[2] ), // GREEN
				255 * parseFloat( rgb[3] ), // BLUE
				255 * parseFloat( rgb[4] || "1" ) // ALPHA
			]);
	}; 
})() );

// close private scope, pass namespace
})( window.Color );