<?php  
	$user = 'qshdpwyoayjidf';
	$passwd = '5b2c4dd891985ed6b3f8fed13656ad510b4b9ebb3f6f516a0da747cb9ea9101e';
	$db = 'd5jnscr9b6lic1';
	$port = 5432;
	$host = 'ec2-52-44-209-165.compute-1.amazonaws.com';
	$strCnx = "host=$host port=$port dbname=$db user=$user password=$passwd";
	$cnx = pg_connect($strCnx) or die ("Error de conexion. ". pg_last_error());

?>

