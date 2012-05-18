(function( Color ){
/*****************************************************************************/
// Color.cmyk.js - rev 1
// Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
// Liscensed under the MIT License (MIT-LICENSE.txt)
// http://www.opensource.org/licenses/mit-license.php
// Created: 2008-12-12 | Updated: 2009-03-10
/*****************************************************************************/
// REFERENCE: // http://www.easyrgb.com/index.php?X=MATH
// REQUIRES: Color.core.js
/*****************************************************************************/
// PUBLIC >> extend the color format
Color.format( "cmyk", function( cmyk ){
	if ( cmyk = PATTERN_CMYK.exec( cmyk ) ){
		var c = parseFloat( cmyk[1] )/100, 
		m = parseFloat( cmyk[2] )/100, 
		y = parseFloat( cmyk[3] )/100, 
		k = parseFloat( cmyk[4] )/100;
		return [
			( 1 - ( c * ( 1 - k ) + k ) ) * 255, 
			( 1 - ( m * ( 1 - k ) + k ) ) * 255, 
			( 1 - ( y * ( 1 - k ) + k ) ) * 255
			];
		}
	});
/*****************************************************************************/
// PUBLIC >> extend the Color methods 
Color.extend({
	cmyk: function( i ){
		return "cmyk("+ this.cmykArray( i ).join(',') +")";
		},
	cmykArray: function( i ){
		var mx = 255, k = mx,
		rgb = this.rgbArray( i ), 
		c = mx - rgb[0], 
		m = mx - rgb[1], 
		y = mx - rgb[2];
		if ( c < k ) k = c;
		if ( m < k ) k = m;
		if ( y < k ) k = y;
		c = k < mx ? ( c - k ) / ( mx - k ) : 0;
		m = k < mx ? ( m - k ) / ( mx - k ) : 0;
		y = k < mx ? ( y - k ) / ( mx - k ) : 0;
		// return array...
		return [
			Math.round( c / 2.55 ),
			Math.round( m / 2.55 ),
			Math.round( y / 2.55 ),
			Math.round( k / 2.55 )	
			];	
		}
	});
/*****************************************************************************/
// PRIVATE >> Local Variables
var digit = "(-?\\d*\\.?\\d+(?:e[\\+\\-]\\d+)?%?)", // RegExp Number Fragment
PATTERN_CMYK = new RegExp("^cmyk\\("+digit+","+digit+","+digit+","+digit+"\\)$","i");
/***********************************************************************/
})( window.Color );