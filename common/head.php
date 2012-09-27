<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="../common/global.css" rel="stylesheet" type="text/css" />
<script src="../common/jquery-1.6.2.js" type="text/javascript"></script>
<?php 
	$arr = array(
		'Color.core.js',
		'Color.formats.js',
		'Color.methods.js',
		'Color.hsl.js',
		'Color.names.js',
		'Color.names.browser.js',
		'Color.matrix.js'
	); 
	foreach( $arr as $src ){
		echo '<script src="../source/'.$src.'" type="text/javascript"></script>';	
	}
?>
<title>webdev</title>
</head>
<body>
<div id="content">
<!--// PAGE CONTENT >>-->
