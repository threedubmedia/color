(function(){
/*****************************************************************************/
// Color.hsv.js - rev 1
// Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
// Liscensed under the MIT License (MIT-LICENSE.txt)
// http://www.opensource.org/licenses/mit-license.php
// Created: 2008-12-12 | Updated: 2008-12-29

/*****************************************************************************/
// REFERENCE: // http://www.easyrgb.com/index.php?X=MATH
// REQUIRES: Color.core.js
// 

/*****************************************************************************/
// PUBLIC >> extend the color format

Color.format( "hsv", function( hsv ){
	return ( hsv = PATTERN_HSV.exec( hsv ) ) ? 
		hsv2rgb( hsv[1], hsv[2], hsv[3], hsv[4] ) : null;
	});

/*****************************************************************************/
// PUBLIC >> extend the Color methods 

Color.extend({
	hsv: function(){
		makeHSV( this );
		return 'hsv('+ this.HSV[0] +','+ this.HSV[1] +','+ this.HSV[2] +')';
		},
	hsva: function(){
		makeHSV( this );
		return 'hsva('+ this.HSV[0] +','+ this.HSV[1] +','+ this.HSV[2] +','+ this.A +')';
		}
	});

/*****************************************************************************/
// PRIVATE >> STATIC METHODS

function makeHSV ( obj ){
	// evaluate object values as fractions
	var red = obj.R/255, gre = obj.G/255, blu = obj.B/255, 
	// min and max values, and difference
	mn = Math.min(red,gre,blu), mx = Math.max(red,gre,blu), df = mx-mn, 
	// component differentials...
	dfR = ( ( ( mx - red ) / 6 ) + ( df / 2 ) ) / df, 
	dfG = ( ( ( mx - gre ) / 6 ) + ( df / 2 ) ) / df, 
	dfB = ( ( ( mx - blu ) / 6 ) + ( df / 2 ) ) / df,
	// converted values...
	hue = df == 0 ? 0 : red==mx ? dfB - dfG : gre==mx ? ( 1/3 ) + dfR - dfB : ( 2/3 ) + dfG - dfR,
	sat = df == 0 ? 0 : df / mx, val = mx;
	// update internal values...
	obj.HSV = [
		Math.round( Math.min( hue*360, 360 ) ),
		Math.round( Math.min( sat*100, 100 ) ),
		Math.round( Math.min( val*100, 100 ) )
		];
	// continue chain
	return obj;
	};

function hsv2rgb ( hue, sat, val, alpha ){
	// convert HSV values
	hue = parseFloat( hue ) / 360;
	sat = parseFloat( sat ) / 100; 
	val = parseFloat( val ) / 100;
	alpha = parseFloat( alpha ) || 1;
	// offset the hue value
	hue *= 6; if ( hue >= 6 ) hue -= 6;
	// calculate different values to manipulate
	var i = Math.floor( hue ), 
	v1 = val * ( 1 - sat ), 
	v2 = val * ( 1 - sat * ( hue - i ) ), 
	v3 = val * ( 1 - sat * ( 1 - ( hue - i ) ) ), 
	red = [ val, v2, v1, v1, v3, val ][ i ],
	gre = [ v3, val, val, v2, v1, v1 ][ i ],
	blu = [ v1, v1, v3, val, val, v2 ][ i ];
	// color is completely gray
	if ( sat == 0 ) red = gre = blu = val;
	// return correct RGB ranged values
	return { R: red * 255, G: gre * 255, B: blu * 255, A: alpha };
	};

/*****************************************************************************/
// PRIVATE >> Local Variables

var digit = "(-?\\d*\\.?\\d+(?:e[\\+\\-]\\d+)?%?)", // RegExp Number Fragment
PATTERN_HSV = new RegExp("^hsva?\\("+digit+","+digit+","+digit+"(?:,"+digit+")?\\)$","i");

/***********************************************************************/
})();