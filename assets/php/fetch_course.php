<?php

include "init.php";

$id = trim($_POST["id"]);

$sql = "SELECT name, title FROM masterall WHERE family = '".$id."'";
$query = mysql_query($sql) or die(mysql_error());
$result = array();

while ($row = mysql_fetch_array($query)) {
	$course = [$row[0], $row[1]]; //Array containing name and title of course
	array_push($result, $course);
}

echo json_encode($result);