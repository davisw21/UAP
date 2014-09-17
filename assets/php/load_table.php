<?php

include "init.php";

$id = trim($_POST["id"]);

$sql = "SELECT course FROM masterschemes WHERE scheme = '".$id."'";
$query = mysql_query($sql) or die(mysql_error());

$data = mysql_fetch_array($query)[0];

$result = explode(",",$data);

echo(json_encode($result));

?>