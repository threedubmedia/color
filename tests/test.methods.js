module(".methods");



test("Color.prototype.html", function() {
	expect( 2 );
	equals( Color(0xFFFFFFFF).html(), '#FFFFFF', "Color(0xFFFFFFFF).html()" );
	equals( Color(0).html(), 'transparent', "Color(0).html()" );
	});

test("Color.prototype.red", function() {
	expect( 2 );
	equals( Color(0x12345678).red(), 0x12, "Color(0x12345678).red()" );
	equals( Color(0x12345678).red(128)[0], 0x80345678, "Color(0x12345678).red(128)" );
	});

test("Color.prototype.green", function() {
	expect( 2 );
	equals( Color(0x12345678).green(), 0x34, "Color(0x12345678).green()" );
	equals( Color(0x12345678).green(128)[0], 0x12805678, "Color(0x12345678).green(128)" );
	});

test("Color.prototype.blue", function() {
	expect( 2 );
	equals( Color(0x12345678).blue(), 0x56, "Color(0x12345678).blue()" );
	equals( Color(0x12345678).blue(128)[0], 0x12348078, "Color(0x12345678).blue(128)" );
	});

test("Color.prototype.alpha", function() {
	expect( 2 );
	equals( Color(0x12345678).alpha(), 0x78, "Color(0x12345678).alpha()" );
	equals( Color(0x12345678).alpha(128)[0], 0x12345680, "Color(0x12345678).alpha(128)" );
	});

test("Color.prototype.safe", function() {
	expect( 1 );
	equals( Color(0x12345678).safe()[0], 0x00336666, "Color(0x12345678).safe()" );
	});

test("Color.prototype.smart", function() {
	expect( 1 );
	equals( Color(0x12345678).smart()[0], 0x11335577, "Color(0x12345678).smart()" );
	});

test("Color.prototype.short", function() {
	expect( 1 );
	equals( Color(0x12345678).short(), "#135", "Color(0x12345678).short()" );
	});

test("Color.prototype.mix", function() {
	expect( 3 );
	var color = Color(0x80808080);
	equals( color.mix()[0], 0x40404040, "color.mix()" );
	equals( color.mix("#000000")[0], 0x404040C0, "color.mix()" );
	equals( color.mix("#FFFFFF",.9)[0], 0xF2F2F2F2, 'color.mix("#FFFFFF",.9)' );
	});

test("Color.prototype.blend",function(){
	expect( 6 );
	var blend = Color("#FFFFFF").blend();
	equals( blend.hex(0), "#FFFFFF", 'Color("#FFFFFF").blend().hex(0)' );
	equals( blend.hex(1), "#E3E3E3", 'Color("#FFFFFF").blend().hex(1)' );
	equals( blend.hex(3), "#AAAAAA", 'Color("#FFFFFF").blend().hex(3)' );
	equals( blend.hex(5), "#717171", 'Color("#FFFFFF").blend().hex(5)' );
	equals( blend.hex(7), "#393939", 'Color("#FFFFFF").blend().hex(7)' );
	equals( blend.hex(9), "#000000", 'Color("#FFFFFF").blend().hex(9)' );
	});