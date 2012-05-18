/*! Copyright (c) 2009, Three Dub Media (http://code.google.com/p/color-js/) */

/**
 *
 * @author Three Dub Media (threedubmedia@gmail.com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @reference http://www.w3.org/TR/css3-color/
 * @updated 2010-06-11
 *
 */
 
// create a private scope, with some local arguments
;(function( Color, undefined ){

/**
 * Multiply matrices: [ 4 x 1 ] * [ 5 x 4 ]
 * 
 * @name Color.matrix 
 * @static 
 * @function
 * @param {Array} rgb 
 *    a set of red, green, blue, alpha component values
 * @param {Array} mx
 *    a 2 dimensional matrix to multiply against
 * @returns {Number} 
 */
Color.matrix = function( rgb, mx ){
	rgb = rgb.concat( 1 ); // add a 5th value...
	var ret = [ 0, 0, 0, 0 ], a, z;
	for ( a = 0; a < 4; a++ ) 
		for ( z = 0; z < 5; z++ ) 
			ret[ a ] += mx[ a ][ z ] * rgb[ z ];
	return Color.rgb2int( ret ); // 32-bit integer
};

// extend Color.prototype
Color.extend({ 
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"matrix": function( mx ){ 
		mx = mx.concat([ 0, 0, 0, 1, 0 ]); // add default alpha row
		return this.each(function( i ){
			// update internal index with matrixed value...
			this[ i ] = Color.matrix( this.rgbArray( i ), mx ); 
		});
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"filter": function( type ){
		return this.matrix( Color.filter( type ) );
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"brightness": function( v ){
		// -100 is black, 0 is normal, 100 is white
		v = 255 * ( ( v || 0 ) / 100 ); 
		return this.matrix([
			[ 1, 0, 0, 0, v ],
			[ 0, 1, 0, 0, v ],
			[ 0, 0, 1, 0, v ]
		]);
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"exposure": function( v ){
		// .5 is half, 1 is normal, 2 is double, etc.
		v = Math.max( v, 0 );
		return this.matrix([
			[ v, 0, 0, 0, 0 ],
			[ 0, v, 0, 0, 0 ],
			[ 0, 0, v, 0, 0 ]
		]);		
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
	"contrast": function( v ){ 
		v = v != undefined ?  v : 1;
		var n = .5 * ( 1 - v );
		return this.matrix([
			[ v, 0, 0, 0, n ],
			[ 0, v, 0, 0, n ],
			[ 0, 0, v, 0, n ]
		]);
	},
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    "temperature": function( v ){ 
		return this.matrix([
			[ 1 + v, 0, 0, 0, 0 ],
			[ 0, 1, 0, 0, 0 ],
			[ 0, 0, 1 - v, 0, 0 ]
		]);
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
    "tint": function( v ){
		return this.matrix([
			[ 1 + v, 0, 0, 0, 0 ],
			[ 0, 1, 0, 0, 0 ],
			[ 0, 0, 1 + v, 0, 0 ]
		]);
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
	"threshold": function( v ){ 
		return this.each(function( i ){
			var rgb = this.rgbArray( i );
			// update internal index with dynamic matrixed value...
			this[ i ] = Color.matrix( rgb, [
				[ rgb[0], rgb[1], rgb[2], 0, -v ],
				[ rgb[0], rgb[1], rgb[2], 0, -v ],
				[ rgb[0], rgb[1], rgb[2], 0, -v ],
				[ 0, 0, 0, 1, 0 ]
			]); 
		});
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
});

/**
 * Set and get a static transform matrix
 * 
 * @name Color.filter 
 * @static 
 * @function
 * @param {Array} type 
 *    the name of the transform matrix
 * @param {Array} mx
 *    a 2 dimensional matrix to multiply against
 * @returns {Array}     
 */
Color.filter = function( type, mx ){
	if ( mx ) 
		Color._filters[ type ] = mx; // store a matrix
	// get stored matrix or basic identity matrix ( default )
	return Color._filters[ type ] || [
		[ 1, 0, 0, 0, 0 ], 
		[ 0, 1, 0, 0, 0 ], 
		[ 0, 0, 1, 0, 0 ]
	]; 
};
	
/**
 * The object namespace in which to store color filter matrix transforms.
 *
 * @name Color._filters
 * @property {Object} 
 */
Color._filters = {}; 

// load some matrix filters...
Color.filter( 'invert', [
	[ -1,  0,  0,  0,  255 ],
	[  0, -1,  0,  0,  255 ],
	[  0,  0, -1,  0,  255 ]
]);
Color.filter( 'grayscale', [
	[ 0.299, 0.587, 0.114, 0, 0 ], 
	[ 0.299, 0.587, 0.114, 0, 0 ], 
	[ 0.299, 0.587, 0.114, 0, 0 ]
]);
Color.filter( 'sepia', [
	[ 0.393, 0.769, 0.189, 0, 0 ], 
	[ 0.349, 0.686, 0.168, 0, 0 ], 
	[ 0.272, 0.534, 0.131, 0, 0 ]
]);
Color.filter( 'nightvision', [
	[ 0.1, 0.4, 0, 0, 0 ],
	[ 0.3, 1, 0.3, 0, 0 ], 
	[ 0, 0.4, 0.1, 0, 0 ]
]);
Color.filter( 'warm', [
	[ 1.06, 0, 0, 0, 0 ],
	[ 0, 1.01, 0, 0, 0 ], 
	[ 0, 0, 0.93, 0, 0 ]
]);
Color.filter( 'cool', [
	[ .99, 0, 0, 0, 0 ],
	[ 0, .93, 0, 0, 0 ], 
	[ 0, 0, 1.08, 0, 0 ]
]);

// simulate color blindness...
Color.filter( 'protanopia', [
	[ 0.567, 0.433, 0, 0, 0 ], 
	[ 0.558, 0.442, 0, 0, 0 ], 
	[ 0, 0.242, 0.758, 0, 0 ]
]);
Color.filter( 'protanomaly', [
	[ 0.817, 0.183, 0, 0, 0 ], 
	[ 0.333, 0.667, 0, 0, 0 ], 
	[ 0, 0.125, 0.875, 0, 0 ]
]);
Color.filter( 'deuteranopia', [
	[ 0.625, 0.375, 0, 0, 0 ], 
	[ 0.7, 0.3, 0, 0, 0 ], 
	[ 0, 0.3, 0.7, 0, 0 ]
]);
Color.filter( 'deuteranomaly', [
	[ 0.8, 0.2, 0, 0, 0 ], 
	[ 0.258, 0.742, 0, 0, 0 ], 
	[ 0, 0.142, 0.858, 0, 0 ]
]);
Color.filter( 'tritanopia', [
	[ 0.95, 0.05, 0, 0, 0 ], 
	[ 0, 0.433, 0.567, 0, 0 ],
	[ 0, 0.475, 0.525, 0, 0 ]
]);
Color.filter( 'tritanomaly', [
	[ 0.967, 0.033, 0, 0, 0 ], 
	[ 0, 0.733, 0.267, 0, 0 ], 
	[ 0, 0.183, 0.817, 0, 0 ]
]);

// close private scope, pass namespace
})( window.Color );