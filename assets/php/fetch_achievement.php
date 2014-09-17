<?php

include "init.php";

$sql = "SELECT field, bool, num FROM masterreq";
$query = mysql_query($sql) or die(mysql_error());

$data = mysql_fetch_array($query);

$sub = array();
$result = array();
$curnum = $data[2];
$curfield = $data[0];

while ($row = mysql_fetch_array($query)) {
	if ($row[0] == $curfield) {
		array_push($sub, $row[1]);
	} else {
		array_push($result, [$curfield, $sub, $curnum]);
		$sub = array();
		$curfield = $row[0];
		$curnum = $row[2];
		array_push($sub, $row[1]);
	}
}
array_push($result, [$curfield, $sub, $curnum]);
echo json_encode($result);

?>