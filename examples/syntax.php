<?php include('../common/head.php'); ?>

<p>
	Enter a statement that returns a color...<br />
	<input type="text" id="color_value" value="Color('? > ?')" />
	<input type="button" id="color_update" value="update" />
</p>

<div id="color_output"></div>

<script type="text/javascript">
jQuery(function($){
	$('#color_update').bind('click',function(){
		var html = ['<table cellpadding="0" cellspacing="0">'],
		code = $('#color_value').val(),
		color = new Function('x','return ('+ code +')')();
		if ( color instanceof Color ){
			color.each(function( i ){
				clr = this.get( i );	
				html.push('<tr>',
					'<td style="background:'+ clr.hex() +'"></td>',
					'<td>'+ clr.hex() +'</td>',
					//'<td>'+ clr.hsl() +'</td>',
					//'<td>'+ clr.rgb() +'</td>',
				'</tr>');
			});
		}
		html.push('</table>');
		$('#color_output').html( html.join('') );
	}).trigger('click');
});
</script>

<style type="text/css">

#color_value {
	width: 340px;
}
#color_update {
	
}
#color_output table {
	border-collapse: collapse;
}
#color_output td:first-child {	
	width: 348px;
	padding: 0;
}
#color_output td {	
	padding: 10px;
	border: 1px solid #FFF;
	font: 1em monospace;
}
</style>

<?php include('../common/foot.php'); ?>