/*! Copyright (c) 2009, Three Dub Media (http://code.google.com/p/color-js/) */

/**
 *
 * @author Three Dub Media (threedubmedia@gmail.com)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @reference http://www.w3.org/TR/css3-color/
 * @updated 2010-07-23
 *
 */

// create a private scope, with some local arguments
;(function( Color, undefined ){

/**
 * Add the hue, saturation, lightness Color format 
 *
 * @name Color.hsl 
 * @static 
 * @function
 * @param {String} hsl 
 *    the string to parse into red, green, blue, alpha values
 * @returns {Color}
 */
Color.hsl = Color.format((function(){
	// compile a private regular expression
	var NUM = "(-?\\d*\\.?\\d+(?:e[\\+\\-]\\d+)?%?)", // RegExp Number Fragment
	PATTERN = new RegExp("^hsla?\\("+NUM+","+NUM+","+NUM+"(?:,"+NUM+")?\\)$","i")
	// the privledged format config function
	return function( hsl ){
		if ( hsl.constructor == Array ) 
			return Color.hsl2int( hsl );
		if ( hsl = PATTERN.exec( hsl ) ) 
			return Color.hsl2int([
			parseFloat( hsl[1] ), // HUE
			parseFloat( hsl[2] ), // SAT
			parseFloat( hsl[3] ), // LUM
			parseFloat( hsl[4] ) // ALPHA
		]);
	};
})());

Color.format((function(){ 
	var // store some private regular expressions
	PATTERN_HUE = (/(?:\*|\s)(very|\+)?\s?(warm|red|yellow|green|cool|cyan|blue|magenta)(?:\s|$)/),
	PATTERN_SAT = (/(?:\*|\s)(very|\+)?\s?(dull|sharp)(?:\s|$)/),
	PATTERN_LUM = (/(?:\*|\s)(very|\+)?\s?(dark|light)(?:\s|$)/);
	// the privledged format config function
	return function( str ){
		str = ( str || "" ).toLowerCase();
		if ( str.indexOf('*') == -1 ) return null;
		var h1=180, h2=180, s1=50, s2=50, l1=50, l2=50, x;
		if ( x = PATTERN_HUE.exec( str ) ){ // restrict HUE
			h2 = x[1] ? 10 : 30; // +/- h1
			switch ( x[2] ){
				case 'red': h1 = 0; break;
				case 'warm': h2 = 90; // +/- h1
				case 'yellow': h1 = 60; break;
				case 'green': h1 = 120; break;
				case 'cyan': h1 = 180; break;
				case 'cool': h2 = 90; // +/- h1
				case 'blue': h1 = 240; break;
				case 'magenta': h1 = 300; break;
				default: break;
			}
		}
		if ( x = PATTERN_SAT.exec( str ) ) // restrict SAT
			switch ( x[2] ){
				case 'dull': s1 = 25; s2 = x[1] ? 0 : 50; break;
				case 'sharp': s1 = 75; s2 = x[1] ? 100 : 50; break;
				default: break;
			}
		if ( x = PATTERN_LUM.exec( str ) ) // restrict LUM
			switch ( x[2] ){
				case 'dark': l1 = 25; l2 = x[1] ? 0 : 50; break;
				case 'light': l1 = 75; l2 = x[1] ? 100 : 50; break;
				default: break;
			}
		return Color.hsl2int([ rand(h1-h2,h1+h2), rand(s1,s2), rand(l1,l2) ]); // SEMI RANDOM HSL
	};
	// static private function
	function rand( x, y ){ 
		return ( ( x > y ? x : y ) - ( x < y ? x : y ) ) * Math.random() + ( x < y ? x : y ); 
	};
})());

/*****************************************************************************/
// PUBLIC >> extend the Color methods 
Color.extend({
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"hsl": function( n ){
		return 'hsl('+ this.hslArray( n ).slice( 0, 3 ).join(',') +')';
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"hsla": function( n ){
		return 'hsla('+ this.hslArray( n ).join(',') +')';
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"hslArray": function( n ){
		var rgb = this.rgbArray( n ),
		// evaluate object values as fractions
		red = rgb[0]/255, 
		gre = rgb[1]/255, 
		blu = rgb[2]/255, 
		// min and max values, and difference
		mn = Math.min( red, gre, blu ), 
		mx = Math.max( red, gre, blu ), 
		df = mx-mn, 
		// component differentials...
		dfR = (((mx-red)/6)+(df/2))/df, 
		dfG = (((mx-gre)/6)+(df/2))/df, 
		dfB = (((mx-blu)/6)+(df/2))/df,
		// converted values...
		lum = ( mx + mn )/2, 
		sat = df==0 ? 0 : lum < .5 ? df/( mx + mn ) : df/( 2 - mx - mn ),
		hue = df==0 ? 0 : red==mx ? dfB - dfG : gre==mx ? ( 1/3 ) + dfR - dfB : ( 2/3 ) + dfG - dfR;
		while ( hue<0 || hue>=1 ) hue += hue<0 ? 1 : -1; // rotate hue
		return [
			Math.round( Math.min( hue*360, 360 ) ),
			Math.round( Math.min( sat*100, 100 ) ),
			Math.round( Math.min( lum*100, 100 ) ),
			Math.round( rgb[3] / 255 )
		];
	}
});
Color.extend( (function(){
	// privledged methods
	return {
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		"hue": function( val ){ 
			return hslValue.call( this, val, 0 );
		},
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		"sat": function( val ){ 
			return hslValue.call( this, val, 1 );
		},
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		"lum": function( val ){ 
			return hslValue.call( this, val, 2 );
		}
	};				
	// private method
	function hslValue( value, key ){ 
		var hsl = this.hslArray();
		if ( value == undefined ) 
			return hsl[ key ]; // get
		hsl.splice( key, 1, value ); // set
		this[ 0 ] = Color.hsl2int( hsl );
		return this;
	};
})() );
Color.extend({
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"mixHSL": function( clr, pct ){
		pct = pct == undefined ? 0.5 : pct;
		var hsl1 = this.hslArray(), 
		hsl2 = Color( clr || 255 ).hslArray(),
		mix = function( x, y ){ return x + pct*( y-x ); };
		if ( hsl1[0] == hsl2[0] ) hsl2[0] += 360; // equal hues...
		return Color.hsl([
			mix( hsl1[0], hsl2[0] ),
			mix( hsl1[1], hsl2[1] ),
			mix( hsl1[2], hsl2[2] ),
			mix( hsl1[3], hsl2[3] )
		]); 
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	"cycle": function( target, size ){
		size = size || 10;
		target = Color( target || 255 )[0]; 
		var i = 1, source = Color( this.val( -1 ) );
		for ( i; i < size; i++ ) 
			this.push( source.mixHSL( target, i/(size-1) )[0] );
		return this;
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});
/*****************************************************************************/
// PUBLIC >>
Color.hsl2int = function( hsla ){ 
	// evaluate arguments as fractions
	var hue = parseFloat( hsla[0] ) / 360,
	sat = parseFloat( hsla[1] ) / 100,
	lum = parseFloat( hsla[2] ) / 100,
	alpha = parseFloat( hsla[3] ) || 1;
	// color is completely gray
	if ( sat == 0 ) return Color.rgb2int([ lum*255, lum*255, lum*255, alpha ]); 
	// calculate conversion adjusting variables...
	var x = ( lum < 0.5 )?( lum * ( 1 + sat ) ):( lum + sat - sat * lum ), y = ( 2 * lum - x );
	return Color.rgb2int([
		hue2rgb( hue + 1/3, x, y ), 
		hue2rgb( hue, x, y ), 
		hue2rgb( hue - 1/3, x, y ), 
		( alpha || 1 )*255
	]);
};
// PRIVATE >> 
function hue2rgb( hue, x, y ){ 
	hue += hue < 0 ? +1 : hue > 1 ? -1 : 0; // rotate hue
	hue = 6 * hue < 1 ? y + ( x - y ) * 6 * hue : 2 * hue < 1 ? x : 
		3 * hue < 2 ? y + ( x - y )*( ( 2 / 3 ) - hue ) * 6 : y;
	return Math.ceil( 255 * hue );
};




/***********************************************************************/
})( window.Color );