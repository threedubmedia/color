module(".formats");

test("Color.hexShort", function() {
	
	expect( 1 );
	
	equals( Color('#123')[0], 0x112233FF, "Color('#123')" );
	
	});
	
test("Color.random",function(){
	
	expect( 3 );						 
	
	equals( Color('?').length, 1, "Color('?')" );
	equals( Color('rand').length, 1, "Color('rand')" );
	equals( Color('random').length, 1, "Color('random')" );
	
	});

test("Color.rgbPercent", function() {
	
	expect( 2 );
	
	equals( Color('rgb(100%,50%,80%)')[0], 0xFF7FCCFF, "Color('rgb(100%,50%,80%)')" );
	equals( Color('rgba(100%,50%,80%,10%)')[0], 0xFF7FCC1A, "Color('rgba(100%,50%,80%,10%)')" );
	
	});

test("Color.rgbDecimal", function() {
	
	expect( 2 );
	
	equals( Color('rgb(1,0.5,0.8)')[0], 0xFF80CCFF, "Color('rgb(1,0.5,0.8)')" );
	equals( Color('rgba(1,0.5,0.8,0.1)')[0], 0xFF80CC1A, "Color('rgba(1,0.5,0.8,0.1)')" );
	
	});