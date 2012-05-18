/*! Copyright (c) 2009, Three Dub Media (http://code.google.com/p/color-js/) */
/**
 *
 * @author Three Dub Media (threedubmedia[at]gmail[dot]com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @reference http://www.w3.org/TR/css3-color/
 * @updated 2010-07-22
 *
 */
 
// set global namespace, create a private scope
;(function( undefined ){
		   
/**
 * Creates a Color object. The "new" keyword is optional. 
 * 
 * @name Color
 * @class Lets you work with colors in an extendable array-like object. 
 * @param {String|Array|Number} code 
 *    a representation of a color.
 * @returns {Color}
 *
 * @example
 *   Color( "rgb(255,0,0)" ); // String
 *   Color([ 255, 0, 0 ]); // Array
 *   Color( "#FF0000" ); // String
 *   Color( 0xFF0000FF ); // Number
 *   Color( 4278190335 ); // Number
 */
var Color = window.Color = function( code ){
	// skip when no args
	if ( !arguments.length || code === undefined ) 
		return;
	// if arg is a number assume a 32-bit integer
	if ( typeof code == "number" ) 
		code = new Color().push( arguments );
	// pass through valid color objects...
	if ( Color.isValid( code ) ) 
		return code;
	// trim leading/trailing white-space
	if ( typeof code == "string" )
		code = code.replace( WHITE_SPACE, "" );	
	// local refs for iteration
	var i = 0, color, formats = Color._formats;
	// iterate stored color formats...
	while ( formats[i] && !color )
		// try to implement each color parser...
		color = formats[ i++ ].apply( this, arguments );
	// check for valid color instance
	return Color.isValid( color ) ? color : null; 
},

/**
 * Match leading and trailing whitespace
 *
 * @const
 * @private 
 * @type {RegExp}
 */
WHITE_SPACE = /^\s+|\s+$/g,

/**
 * RegExp fragment that matches a numeric value within the standard rgb color format string
 *
 * @const
 * @private 
 * @type {String}
 */
RGB_NUM = "\\s*(0|-?\\d*[1-9]+\\d*\\.?\\d*)\\s*",

/**
 * Match the entire rgb color format string and capture values
 *
 * @const
 * @private 
 * @type {RegExp}
 */
RGB_PATTERN = new RegExp("^rgba?\\("+ RGB_NUM +","+ RGB_NUM +","+ RGB_NUM +"(?:,"+ RGB_NUM +")?\\)$","i"),

/**
 * Match the hexadecimal color format string and capture values
 *
 * @const
 * @private 
 * @type {RegExp}
 */
HEX_PATTERN = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i;

/**
 * Determine if obj is a Color instance and if the value at the optional index is valid.
 * 
 * @name Color.isValid 
 * @static 
 * @function
 * @param {Color} obj
 *    the object that is to be inspected
 * @param {Number} n 
 *    Optional. The value index to inspect
 * @returns {Boolean}
 */
Color.isValid = function( obj, n ){ 
	if ( obj instanceof Color ){
		var num = obj.val( n );
		return num >= 0 && num <= 0xFFFFFFFF; 
	}
	return false;
}; 

/**
 * Make an unsigend 32-bit integer from an RGBA array.
 * 
 * @name Color.rgb2int 
 * @static 
 * @function
 * @param {Array} arr 
 *    a set of red, green, blue, alpha component values
 * @returns {Number} 
 *
 * @example
 *    Color.rgb2int([0,255,0,255]); // 16711935
 */ 
Color.rgb2int = function( arr ){
	return bitshift( arr[0], 0xFFFFFF )	
		+ bitshift( arr[1], 0xFFFF )
		+ bitshift( arr[2], 0xFF ) 
		+ bitshift( isNaN( arr[3] ) ? 255 : arr[3], 0 );
};

/**
 * Limit numbers to an 8 bit integer ( 0 - 255 ) then manaully shift the bits
 * left so that the bits remain unsigned.
 * 
 * @name bitshift 
 * @private 
 * @function
 * @param {Number} num 
 *    component value to modify
 * @param {Number} offset 
 *    bit value to shift left
 * @returns {Number} 
 *    bitshifted integer value
 */ 
function bitshift( num, offset ){ 
	num = num < 0 ? 0 : num > 255 ? 255 : Math.round( num );
	return num * offset + num;
};

/**
 * Extends the Color prototype object with the properties of the argument.
 *
 * @name Color.extend 
 * @static 
 * @function
 * @param {Object} obj 
 *    generous argument will donate properties
 * @returns undefined
 */ 
Color.extend = function( obj ){
	if ( obj ) 
		for ( var key in obj ) 
			Color.prototype[ key ] = obj[ key ];
};

Color.extend({
	
	/**
	 * The number of colors held in the instance
	 *
	 * @name Color.prototype.length
	 * @property {Number}
	 */ 
	"length": 0, 
		
	/**
	 * Add 32bit integers to the Color instance
	 *
	 * @name Color.prototype.push
	 * @function
	 * @param {Number} arg
	 *    32 bit RGBA integer(s) to add to object, in argument order, or an array
	 * @returns {Color}
	 */
	"push": function( arg ){
		[].push.apply( this, arg === undefined ? [0] : arg.length ? arg : arguments );
		return this;
	},
	
	/**
	 * Remove and return the members of the object between start and end
	 *
	 * @name Color.prototype.slice
	 * @function 
	 * @param {Number} begin
	 * @param {Number} end
	 * @returns {Color}
	 *
	 */
	"slice": function(){
		return new Color().push( [].slice.apply( this, arguments ) );
	},
	
	/**
	 * Get the internal color value for a specified index, a negative index 
	 * is counted backwards from the last value.
	 *
	 * @name Color.prototype.val
	 * @function
	 * @param {Number} n 
	 *    the index of the value being accessed
	 * @returns {Color} 
	 */
	"val": function( n ){
		return n < 0 ? this.slice( n )[0] : this[ n || 0 ];
	},	
	
	/**
	 * Get a color object for a single color at the specified index.
	 *
	 * @name Color.prototype.get
	 * @function
	 * @param {Number} arg 
	 *    the index of the color being accessed
	 * @returns {Color} 
	 */
	"get": function( n ){
		return new Color().push( this.val( n ) );
	},
	
	/**
	 * Execute a function for every item in the object, can return false to break
	 *
	 * @name Color.prototype.each
	 * @function
	 * @param {Function} func 
	 *    The callback function to be called against every 
	 *    object member. When executed, the function scope ("this") is the 
	 *    color object instance, and the arguments are (1) the member index 
	 *    and (2) the 32 bit value, of the current iteration.
	 * @returns {Color}
	 */
	"each": function( func ){
		var i = 0, ret, len = this.length;
		while ( i < len && ret !== false ) 
			ret = func.call( this, i, this[ i++ ] );
		return this;
	},
	 
	/**
	 * Get an "rgb" string of a specific object member.
	 *
	 * @name Color.prototype.rgb
	 * @function
	 * @param {Number} n 
	 *    Optional. The index of the object member
	 * @returns {String} 
	 *
	 * @example
	 *    Color("#FF00FF").rgb(); // "rgb(255,0,255)"
	 * 	  Color("#FF0").toString("rgb");
	 */
	"rgb": function( n ){
		return 'rgb('+ this.rgbArray( n ).slice( 0, 3 ).join(',') +')';
	},
	
	/**
	 * Get an "rgba" string of a specific object member.
	 *
	 * @name Color.prototype.rgba
	 * @function
	 * @param {Number} n 
	 *    Optional. The index of the object member
	 * @returns {String}
	 *
	 * @example
	 *    Color("#0000FF").rgba(); // "rgba(0,0,255,255)"
	 */
	"rgba": function( n ){
		return 'rgba('+ this.rgbArray( n ).join(',') +')';
	},
	
	/**
	 * Get an array of the red, green, blue, and alpha component 
	 * values of a specific object member.
	 *
	 * @name Color.prototype.rgbArray
	 * @function
	 * @param {Number} n 
	 *    Optional. The index of the object member
	 * @returns {String} 
	 *
	 * @example
	 *    Color("#00FF00").rgbArray(); // [0,255,0,255]
	 */
	"rgbArray": function( n ){
		var num = this.val( n );
		return [ 
			num >> 24 & 0xFF, 
			num >> 16 & 0xFF, 
			num >> 8 & 0xFF, 
			num & 0xFF 
		];
	},
	
	/**
	 * Get a "hex" string of a specific object member.
	 *
	 * @name Color.prototype.hex
	 * @function
	 * @param {Number} n 
	 *    Optional. The index of the object member
	 * @returns {String} 
	 *
	 * @example
	 *    Color("rgb(255,0,0)").hex(); // "#FF0000"
	 */
	"hex": function( n ){
		var str = "000000"+( this.val( n ) >>> 8 ).toString( 16 );
		return '#'+( str.substr( str.length - 6, 6 ).toUpperCase() );
	},	
	
	"toString": function( n ){
		return '[object Color]';
	},
	
	/**
	 * Get a re-interpretable string of the entire object.
	 *
	 * @name Color.prototype.toSource
	 * @function
	 * @returns {String} 
	 *
	 * @example
	 *    Color("#000000").toSource(); // "(Color(255))"
	 */
	"toSource": function(){ 
		return '(Color('+ [].join.call( this, "," ) +'))'; 
	}
		
});

/**
 * Extends the Color format cache used for parsing Color arguments into colors.
 * This function returns the format function, which can be used to set a static 
 * function (Color[format]) which can be used directly. This is useful in cases 
 * where the color format is already known.
 *
 * @name Color.format 
 * @static  
 * @function
 * @param {Function} func 
 *    the function that will parse the color, it receives all of the arguments from 
 *    "Color" and should return an unsigned 32 bit integer combining the red, green, 
 *    blue, and alpha values
 * @returns {Function}
 *    the cached format function, to ease setting a static format method.
 */ 
Color.format = function( func ){
	var format = function(){
		// configure the core object values
		var rgba = func.apply( this, arguments );
		// extend the color instance with config values
		if ( typeof rgba == 'number' )
			rgba = new Color().push( rgba );
		return Color.isValid( rgba ) ? rgba : null;
	};
	Color._formats.push( format );
	return format;
};

/**
 * The array in which to store color format functions.
 *
 * @name Color._formats 
 * @static 
 * @property {Array} 
 */ 
Color._formats = [];

/**
 * Add the "rgb" Color format 
 *
 * @name Color.rgb 
 * @static 
 * @function
 * @param {Array|String} rgb 
 *    a set of red, green, blue, alpha values to pass though
 *    or a string to parse into red, green, blue, alpha values
 * @returns {Color}
 */ 
Color.rgb = Color.format(function( rgb ){
	// [ 255, 255, 255, 255 ]
	if ( rgb.constructor == Array ) 
		return Color.rgb2int( rgb );
	// "rgb(255,255,255)" | "rgba(255,255,255,1)" 
	if ( rgb = RGB_PATTERN.exec( rgb ) ) 
		return Color.rgb2int([
			parseFloat( rgb[1] ), // RED
			parseFloat( rgb[2] ), // GREEN
			parseFloat( rgb[3] ), // BLUE
			parseFloat( rgb[4] ) // ALPHA
		]);
});

/**
 * Add the "hex" Color format 
 *
 * @name Color.hex 
 * @static 
 * @function
 * @param {String} hex 
 *    the hexadecimal string to parse into red, green, blue, alpha values
 * @returns {Color}
 */ 
Color.hex = Color.format(function( hex ){ 
	// "#FFFFFF" | "FFFFFF" | "#FFFFFFFF" 			 
	if ( hex = HEX_PATTERN.exec( hex ) ) 
		return Color.rgb2int([
			parseInt( hex[1], 16 ), // RED
			parseInt( hex[2], 16 ), // GREEN
			parseInt( hex[3], 16 ), // BLUE
			parseInt( hex[4], 16 )  // ALPHA
		]);
});

// close private scope
})();