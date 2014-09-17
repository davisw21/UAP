<?php

include "init.php";

$id = trim($_POST["id"]);

$sql = "SELECT * FROM masterall WHERE name = '".$id."'";
$query = mysql_query($sql) or die(mysql_error());

$info = 0;

while ($row = mysql_fetch_array($query)) {
	$info = [$row[0],$row[3],$row[4],$row[5],$row[6],$row[7],$row[8],$row[9],$row[10],$row[11],$row[12],$row[13]]; 
}

echo json_encode($info);

?>