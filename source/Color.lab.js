(function(){
/*****************************************************************************/
// Color.lab.js - rev 1
// Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
// Liscensed under the MIT License (MIT-LICENSE.txt)
// http://www.opensource.org/licenses/mit-license.php
// Created: 2008-12-12 | Updated: 2008-12-12

/*****************************************************************************/
// REFERENCE: // http://www.easyrgb.com/index.php?X=MATH
// REQUIRES: Color.core.js
// 

/*****************************************************************************/
// PUBLIC >> extend the color format 

Color.format( "lab", function( hsl ){
	
	});

function makeXYZ( obj ){
	var 
	R = rgbAdjust( obj.R )
	G = rgbAdjust( obj.G ),
	B = rgbAdjust( obj.B ),
	//Observer. = 2°, Illuminant = D65
	X = R * 0.4124 + G * 0.3576 + B * 0.1805,
	Y = R * 0.2126 + G * 0.7152 + B * 0.0722,
	Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
	obj.XYZ = [ X, Y, Z ];
	};
function rgbAdjust( n ){
	n = n / 255;
	n = n > 0.04045 ? ( ( n + 0.055 ) / 1.055 ) ^ 2.4 : n / 12.92;
	return n * 100;
	};
/*
----------------------
RGB —> XYZ

var_R = ( R / 255 )        //R from 0 to 255
var_G = ( G / 255 )        //G from 0 to 255
var_B = ( B / 255 )        //B from 0 to 255

if ( var_R > 0.04045 ) var_R = ( ( var_R + 0.055 ) / 1.055 ) ^ 2.4
else                   var_R = var_R / 12.92
if ( var_G > 0.04045 ) var_G = ( ( var_G + 0.055 ) / 1.055 ) ^ 2.4
else                   var_G = var_G / 12.92
if ( var_B > 0.04045 ) var_B = ( ( var_B + 0.055 ) / 1.055 ) ^ 2.4
else                   var_B = var_B / 12.92

var_R = var_R * 100
var_G = var_G * 100
var_B = var_B * 100

//Observer. = 2°, Illuminant = D65
X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
---------------------
XYZ —> CIE-L*ab

var_X = X / ref_X          //ref_X =  95.047   Observer= 2°, Illuminant= D65
var_Y = Y / ref_Y          //ref_Y = 100.000
var_Z = Z / ref_Z          //ref_Z = 108.883

if ( var_X > 0.008856 ) var_X = var_X ^ ( 1/3 )
else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
if ( var_Y > 0.008856 ) var_Y = var_Y ^ ( 1/3 )
else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
if ( var_Z > 0.008856 ) var_Z = var_Z ^ ( 1/3 )
else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

CIE-L* = ( 116 * var_Y ) - 16
CIE-a* = 500 * ( var_X - var_Y )
CIE-b* = 200 * ( var_Y - var_Z )
----------------------
CIE-L*ab —> XYZ

var_Y = ( CIE-L* + 16 ) / 116
var_X = CIE-a* / 500 + var_Y
var_Z = var_Y - CIE-b* / 200

if ( var_Y^3 > 0.008856 ) var_Y = var_Y^3
else                      var_Y = ( var_Y - 16 / 116 ) / 7.787
if ( var_X^3 > 0.008856 ) var_X = var_X^3
else                      var_X = ( var_X - 16 / 116 ) / 7.787
if ( var_Z^3 > 0.008856 ) var_Z = var_Z^3
else                      var_Z = ( var_Z - 16 / 116 ) / 7.787

X = ref_X * var_X     //ref_X =  95.047     Observer= 2°, Illuminant= D65
Y = ref_Y * var_Y     //ref_Y = 100.000
Z = ref_Z * var_Z     //ref_Z = 108.883
---------------------
XYZ —> RGB

var_X = X / 100        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
var_Y = Y / 100        //Y from 0 to 100.000
var_Z = Z / 100        //Z from 0 to 108.883

var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986
var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415
var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570

if ( var_R > 0.0031308 ) var_R = 1.055 * ( var_R ^ ( 1 / 2.4 ) ) - 0.055
else                     var_R = 12.92 * var_R
if ( var_G > 0.0031308 ) var_G = 1.055 * ( var_G ^ ( 1 / 2.4 ) ) - 0.055
else                     var_G = 12.92 * var_G
if ( var_B > 0.0031308 ) var_B = 1.055 * ( var_B ^ ( 1 / 2.4 ) ) - 0.055
else                     var_B = 12.92 * var_B

R = var_R * 255
G = var_G * 255
B = var_B * 255 

*/

/*****************************************************************************/
// PUBLIC >> extend the Color methods 

Color.extend({

	});

/*****************************************************************************/
// PRIVATE >> STATIC METHODS



/*****************************************************************************/
// PRIVATE >> Local Variables
Color.illuminant = "D65"; // Daylight
Color.observer = "2"; // 2 degrees, CIE 1931
// XYZ (Tristimulus) Reference values of a perfect reflecting diffuser
// value = XYZ[ Illuminant ][ Observer ][ 0|1|2 ]
var XYZ = {
	// Incandescent
	"A": { "2": [109.850,100,35.585], "10": [111.144,100,35.200] },
	"C": { "2": [98.074,100,118.232], "10": [97.285,100,116.145] },
	"D50": { "2": [96.422,100,82.521], "10": [96.720,100,81.427] },
	"D55": { "2": [95.682,100,92.149], "10": [95.799,100,90.926] },
	// Daylight 
	"D65": { "2": [95.047,100,108.883], "10": [94.811,100,107.304] },
	"D75": { "2": [94.972,100,122.638], "10": [94.416,100,120.641] },
	// Fluorescent
	"F2": { "2": [99.187,100,67.395], "10": [103.280,100,69.026] },
	"F7": { "2": [95.044,100,108.755], "10": [95.792,100,107.687] },
	"F11": { "2": [100.966,100,64.370], "10": [103.866,100,65.627] }
	};

/***********************************************************************/
})();