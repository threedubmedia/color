module(".core");

test("Color", function() {
	expect( 4 );
	ok( window.Color, "Color is defined" );
	ok( new Color(), "Color is a constructor" );
	ok( Color(0), "Lazy instaniation" );
	ok( Color("$")==null, "Can return null" );
});

test("Color.rgb2int", function(){
	expect( 5 );
	ok( Color.rgb2int, "Color.rgb2int is defined" );
	equals( Color.rgb2int([0,0,0,255]), 0xFF, "Color.rgb2int([0,0,0,255])" );
	equals( Color.rgb2int([0,0,255,255]), 0xFFFF, "Color.rgb2int([0,0,255,255])" );
	equals( Color.rgb2int([0,255,255,255]), 0xFFFFFF, "Color.rgb2int([0,255,255,255])" );
	equals( Color.rgb2int([255,255,255,255]), 0xFFFFFFFF, "Color.rgb2int([255,255,255,255])" );
});

test("Color.extend",function(){
	expect( 3 );
	// run some static tests...
	ok( Color.extend, "Color.extend is defined" );
	Color.extend({  
		testProperty3: 8, 
		testMethod3: function(){ return 3; }  
	});
	equals( new Color().testProperty3, 8, "Extended property exists"  );
	equals( new Color().testMethod3(), 3, "Extended method exists"  );
});

test("Color.format",function(){
	expect( 4 );
	ok( Color.format, "Color.format is defined" );
	ok( Color._formats, "Color._formats is defined" );
	// run some tests...
	var index = Color._formats.length;
	Color.format(function(str){
		if ( str=="_test_" ) return Color.rgb2int([ 11, 30, 77 ]);
	});
	ok( Color._formats[index], "Extended format exists" );
	equals( Color("_test_")[0], 0x0B1E4DFF, "Test format succeeds" );
});

test("Color.rgb",function(){
	expect( 8 );
	ok( Color.rgb, "Color.rgb is defined" );
	equals( Color._formats[0], Color.rgb, "RGB format is cached" );
	equals( Color([56,78,90])[0], 0x384E5AFF, "Color([56,78,90])" );
	equals( Color.rgb([56,78,90])[0], 0x384E5AFF, "Color.rgb([56,78,90])" );
	equals( Color("rgb(17,48,119)")[0], 0x113077FF, "Color('rgb(17,48,119)')" );
	equals( Color.rgb("rgb(17,48,119)")[0], 0x113077FF, "Color.rgb('rgb(17,48,119)')" );
	equals( Color("rgba(56,78,90,128)")[0], 0x384E5A80, "Color('rgba(56,78,90,128)')" );
	equals( Color.rgb("rgba(56,78,90,128)")[0], 0x384E5A80, "Color.rgb('rgba(56,78,90,128)')" );
});

test("Color.hex",function(){
	expect( 8 );
	ok( Color.hex, "Color.hex is defined" );
	equals( Color._formats[1], Color.hex, "HEX format is cached" );
	equals( Color("#123456")[0], 0x123456FF, 'Color("#123456")' );
	equals( Color.hex("#123456")[0], 0x123456FF, 'Color.hex("#123456")' );
	equals( Color("#89ABCDEF")[0], 0x89ABCDEF, 'Color("#89ABCDEF")' );
	equals( Color.hex("#89ABCDEF")[0], 0x89ABCDEF, 'Color.hex("#89ABCDEF")' );
	equals( Color("887766"), null, 'Color("887766")' );
	equals( Color.hex("887766"), null, 'Color.hex("887766")' );	
});

test("Color.prototype.length",function(){
	expect( 2 );
	equals( Color(0).length, 1, 'Color(0).length' );
	equals( Color(0,1,2,3,4).length, 5, 'Color(0,1,2,3,4).length' );
});

/*
test("Color.prototype.i",function(){
	expect( 2 );			 
	equals( Color(7).i, 0, 'Color(7).i' );
	equals( Color(1,2,3,4).index(2).i, 2, 'Color(1,2,3,4).index(2).i' );
	});
*/	
	
test("Color.prototype.push",function(){
	expect( 1 );
	equals( Color(2).push(5)[1], 5, 'Color(2).push(5)[1]' );
});

test("Color.prototype.each",function(){
	expect( 1 );
	var sum = 0;
	Color(1,2,3,4).each(function(i,n){ sum += n; });
	equals( sum, 10, 'Color(1,2,3,4).each(function(i,n){ sum += n; })' );
});
/* 
test("Color.prototype.index",function(){
	expect( 1 );
	equals( Color(0,1,2).index(1).i, 1, 'Color(0,1,2).index(1)' );
});
*/	

test("Color.prototype.rgbArray",function(){
	expect( 1 );
	equals( Color("#0000FF").rgbArray().join(","), "0,0,255,255", 'Color("#0000FF").rgbArray()');
});

test("Color.prototype.rgb",function(){
	expect( 1 );			 
	equals( Color("#00FF00").rgb(), 'rgb(0,255,0)', 'Color("#00FF00").rgb()' );
});
test("Color.prototype.rgba",function(){
	expect( 1 );			 
	equals( Color("#FF0000").rgba(), 'rgba(255,0,0,255)', 'Color("#FF0000").rgba()' );
});
test("Color.prototype.hex",function(){
	expect( 1 );
	equals( Color(0x442200FF).hex(), '#442200', 'Color(0x442200FF).hex()' );
});

test("Color.prototype.toSource",function(){
	expect( 1 );			 
	equals( Color("#FFFFFF").push(255).toSource(), '(Color(4294967295,255))', 'Color("#FFFFFF").push(255).toSource()' );
});
