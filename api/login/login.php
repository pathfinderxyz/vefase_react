<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Content-Type: text/html; charset=utf-8");
    include "coneccion.php";

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);        
	$usuario = $dataObject-> usuario;
	$pass =	$dataObject-> clave;
    
    $result=pg_query($cnx,"select * from usuarios where usuario='$usuario' AND password='$pass'"); 
    $datos = pg_fetch_assoc($result);

    if (pg_num_rows($result) > '0'){
        echo json_encode(array('conectado'=>true,'usuario'=>$datos['usuario'], 'username'=>$datos['username'], 'id'=>$datos['id']) );
    } else {
        echo json_encode(array('conectado'=>false, 'error' => 'La datos son incorrecto, vuelva a intentarlo.'));
    }

?>
