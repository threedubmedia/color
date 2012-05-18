module(".names");

test("Color.learn", function() {
	expect( 4 );
	ok( Color._int2names, "Color._int2names is defined" );
	ok( Color._name2int, "Color._name2int is defined" );
	Color.learn( 1, "testColor" );
	equals( Color._int2names[1], "testColor,", "learned color name is cached" );
	equals( Color._name2int["testcolor"], 1, "learned color code is cached" );
	});

test("Color.names",function(){
	expect( 6 );
	Color.learn( 2, "testColor2" );
	equals( Color("testColor2")[0], 2, "Color('testColor2')" );
	equals( Color.names("testColor2")[0], 2, "Color.names('testColor2')" );
	equals( Color("red")[0], 0xFF0000FF, "Color('red')" );
	equals( Color.names("red")[0], 0xFF0000FF, "Color.names('red')" );
	equals( Color("blue")[0], 0x0000FFFF, "Color('blue')" );
	equals( Color.names("blue")[0], 0x0000FFFF, "Color.names('blue')" );
	});

test("Color.search",function(){
	expect( 6 );
	Color.learn( 3, "test_color3" );
	equals( Color("test_c")[0], 3, "Color('test_c')" );
	equals( Color.search("test_c")[0], 3, "Color.search('test_c')" );
	equals( Color("bla")[0], 0x000000FF, "Color('bla') = 'black'" );
	equals( Color.search("bla")[0], 0x000000FF, "Color.search('bla')" );
	equals( Color("blu")[0], 0x0000FFFF, "Color('blu') = 'blue'" );
	equals( Color.search("blu")[0], 0x0000FFFF, "Color.search('blu')" );
	});

test("Color.prototype.name",function(){
	expect( 2 );
	equals( Color(0x00FF00FF).name(), "Lime", "Color(0x00FF00FF).name()" );
	equals( Color(4).name("testColor4").name(), "testColor4", "Color(4).name('testColor4')" );
	});