<?php

include "init.php";
include "RequirementsEntity.php";

$id = trim($_POST["id"]);

$sql = "SELECT * FROM masterreq WHERE field = '".$id."'";
$query = mysql_query($sql) or die(mysql_error());
$result = array();

while ($row = mysql_fetch_array($query)) {
	$num = $row[0];
	$field = $row[1];
	$name = $row[2];
	$desc = $row[3];
	$bool = $row[4];

	$arequirement = new RequirementsEntity($num, $field, $name, $desc, $bool);

	array_push($result, $arequirement);
}


echo json_encode($result);