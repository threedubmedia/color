<?php include('../common/head.php'); ?>

<p>
	Enter a string to describe a color...<br />
	<input type="text" id="color_value" value="?" />
	<input type="button" id="color_update" value="update" />
</p>

<div id="color_output"></div>

<script type="text/javascript">
jQuery(function($){
	$('#color_update').bind('click',function(){
		var str = $('#color_value').val(),
		num = parseInt( str ),
		arg = num || '"'+ str +'"',
		clr = Color( num || str ),
		methods = ['val','hex','short','rgb','rgba','rgbArray','hsl','hsla','hslArray','toString','toSource'],
		html = [
			'<table cellpadding="0" cellspacing="0">',
			'<thead><tr><td>METHOD</td><td>OUTPUT</td></tr></thead><tbody>'
		];
		if ( clr ){
			html.unshift('<div class="color_sample" style="background:'+ clr.hex() +'">&nbsp;</div>');
			$.each( methods, function( i, method ){
				html.push(
					'<tr>',
						'<td>Color(', arg, ').', method, '()</td>',
						'<td>', JSON.stringify( clr[ method ]() ), '</td>',
					'</tr>'
				);	
			});
		}
		html.push('</tbody></table>');
		$('#color_output').html( html.join('') );
	}).trigger('click');
});
</script>

<style type="text/css">
#color_value, #color_update {
	font-size: 2em;
}
#color_value {
	width: 340px;
	margin: 0;
}
#color_update {
	width: 150px;
	margin: 0;
}
#color_output table {
	border-collapse: collapse;
	width: 500px;
}
#color_output thead td {
	padding: 0 20px;
	color: #CCC;
	font-size: 10px;
}
#color_output tbody td {
	border: 1px solid #CCC;
	padding: 10px 20px;
	background: #E8E8E8;
}
#color_output .color_sample {
	width: 498px;
	padding: 10px 0;
	border: 1px solid #000;
}
</style>

<?php include('../common/foot.php'); ?>