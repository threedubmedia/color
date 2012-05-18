/*! Copyright (c) 2009, Three Dub Media (http://code.google.com/p/color-js/) */

/**
 *
 * @author Three Dub Media (threedubmedia@gmail.com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @reference http://www.w3.org/TR/css3-color/
 * @updated 2010-07-21
 *
 */
 
// create a private scope, with some local arguments
;(function( Color, undefined ){

// extend Color.prototype
Color.extend({
	  
	/**
	 * Get an "html" string of a specific object member.
	 *
	 * @name Color.prototype.html
	 * @function
	 * @param {Number} index optional index of the object member
	 * @returns {String}
	 *
	 * @example
	 * Color([0,0,255,255]).html(); // "#0000FF"
	 * Color([0,0,255,0]).html(); // "transparent"
	 */
	"html": function( i ){
		return ( this.val( i ) & 0xFF ) == 0 ? "transparent" : this.hex( i );
	},
	
	/**
	 * Get or set the red component of the current object member.
	 *
	 * @name Color.prototype.red
	 * @function
	 * @param {Number} val optional red value to set
	 * @returns {Number|Color} 
	 *
	 * @example
	 * Color("#778899").red(); // 119
	 * Color("#778899").red(255).hex(); // "#FF8899"
	 */
	"red": function( val ){ 
		return rgbaValue.call( this, val, 0 );
	},
	
	/**
	 * Get or set the green component of the current object member.
	 *
	 * @name Color.prototype.green
	 * @function
	 * @param {Number} val optional green value to set
	 * @returns {Number|Color} 
	 *
	 * @example
	 * Color("#778899").green(); // 136
	 * Color("#778899").green(255).hex(); // "#77FF99"
	 */
	"green": function( val ){ 
		return rgbaValue.call( this, val, 1 );
	},
	
	/**
	 * Get or set the blue component of the current object member.
	 *
	 * @name Color.prototype.blue
	 * @function
	 * @param {Number} val optional blue value to set
	 * @returns {Number|Color} 
	 *
	 * @example
	 * Color("#778899").blue(); // 153
	 * Color("#778899").blue(255).hex(); // "#7788FF"
	 */
	"blue": function( val ){ 
		return rgbaValue.call( this, val, 2 );
	},
	
	/**
	 * Get or set the alpha component of the current object member.
	 *
	 * @name Color.prototype.alpha
	 * @function
	 * @param {Number} val optional alpha value to set
	 * @returns {Number|Color} 
	 *
	 * @example
	 * Color("#778899").alpha(); // 255
	 * Color("#778899").alpha(128).rgba(); // "rgba(119,136,153,128)"
	 */
	"alpha": function( val ){ 
		return rgbaValue.call( this, val, 3 );
	},
	
	/**
	 * Limit the values of a specific object member the "web-safe" palette
	 *
	 * @name Color.prototype.safe
	 * @function
	 * @param {Number} index optional index of the object member
	 * @returns {Color} 
	 *
	 * @example
	 * Color("#123456").safe().hex(); // "#003366"
	 */
	"safe": function( index ){ 
		var rgb = this.rgbArray( index );
		return Color.rgb([
			snap( rgb[0], 51 ), 
			snap( rgb[1], 51 ), 
			snap( rgb[2], 51 ), 
			snap( rgb[3], 51 ) 
		]);
	}, 
	
	/**
	 * Limit the values of a specific object member the "web-smart" palette
	 *
	 * @name Color.prototype.smart
	 * @function
	 * @param {Number} index optional index of the object member
	 * @returns {Color} 
	 *
	 * @example
	 * Color("#123456").smart().hex(); // "#113355"
	 */
	"smart": function( index ){ 
		var rgb = this.rgbArray( index );
		return Color.rgb([
			snap( rgb[0], 17 ), 
			snap( rgb[1], 17 ), 
			snap( rgb[2], 17 ), 
			snap( rgb[3], 17 ) 
		]);
	},
	
	/**
	 * Get the 3 charater hexadecimal shorthand equivilent
	 *
	 * @name Color.prototype.short
	 * @function
	 * @param {Number} index optional index of the object member
	 * @returns {Color} 
	 *
	 * @example
	 * Color("#123456").short(); // "#135"
	 */
	"short": function( index ){ 
		return this.smart( index ).hex().replace( /([0-9A-F]){2}/g, "$1" ); 
	},
		
	/**
	 * Mix the current indexed source color with the argument target color by a given percentage
	 *
	 * @name Color.prototype.mix
	 * @function
	 * @param {Number|String|Color|Array} target
	 *    Optional. Default: 255 (Black). A variable representation of a target color.
	 * @param {Number} percent
	 *    Optional. Default: .5 (50%). A percentage fraction to mix the source (0) and target (1) colors.
	 * @returns {Color} 
	 *
	 * @example
	 *    Color("#FFFFFF").mix().hex(); // "#808080"
	 *    Color("#FF0000").mix("#0000FF",.25).hex(); // "#BF0040"
	 */
	"mix": function( target, percent ){ 
		var source = this.rgbArray(); 
		target = Color( target || 0 ).rgbArray();
		percent = percent == undefined ? 0.5 : percent;
		return Color.rgb([
			mix( source[0], target[0], percent ),
			mix( source[1], target[1], percent ),
			mix( source[2], target[2], percent ),
			mix( source[3], target[3], percent )
		]); 
	},
	
	/**
	 * Mix the current indexed source color with the argument target color by equal linear increments
	 *
	 * @name Color.prototype.blend
	 * @function
	 * @param {Number|String|Color|Array} target
	 *    Optional. Default: 255 (Black). A variable representation of a target color.
	 * @param {Number} size
	 *    Optional. Default: 10. The number of returned object members (colors).
	 * @returns {Color} 
	 *    increases the number of object members (length)
	 * @example
	 *    Color("#FFFFFF").blend("#00FF00",4).toSource(); // "(Color(4294967295,2868882175,1442797055,16711935))"
	 *    Color("#FF0000").blend().hex( 4 ); // "#8E0000"
	 */
	"blend": function( target, size ){ 
		size = size || 10; 
		target = Color( target || 255 )[0]; 
		var i = 1, source = Color( this.val( -1 ) ); 
		for ( i; i < size; i++ ) // iterate
			this.push( source.mix( target, i/( size-1 ) )[0] ); 
		return this;
	}		
});

/**
 * Get/Set a red, green, blue, or alpha componenet value
 *
 * @name rgbaValue 
 * @private 
 * @function
 * @param {Number} value the value to be set, or undefined for get
 * @param {Number} key the numeric index of [r,g,b,a]
 * @returns {Number|Color}
 */ 
function rgbaValue( value, key ){ 
	var rgb = this.rgbArray();
	if ( value == undefined ) 
		return rgb[ key ]; // get
	rgb.splice( key, 1, value );
	this[0] = Color.rgb2int( rgb ); // set
	return this; // chain
};

/**
 * find the closest integer multiple of the divisor num
 *
 * @name snap 
 * @private 
 * @function
 * @param {Number} val the value to be rounded
 * @param {Number} num the divisor
 * @returns {Number}
 */
function snap( val, num ){	
	return Math[ val % num <= ~~( num / 2 ) ? 'floor' : 'ceil' ]( val / num ) * num; 
};

/**
 * find the value that is between "x" and "y" the fractional amount "z"
 *
 * @name mix 
 * @private 
 * @function
 * @param {Number} x the starting value
 * @param {Number} y the ending value
 * @param {Number} z the fraction to combine
 * @returns {Number}
 */
function mix( x, y, z ){ 
	return x + z * ( y - x ); 
};
	
// close private scope, pass namespace
})( window.Color ); 