<?php

function fetchList($num) {
	$query = mysql_query("SELECT distinct field FROM masterreq WHERE num=".$num);
	while ($rs = mysql_fetch_array($query)) {
		echo "<option value='".$rs["field"]."'>".$rs["field"]."</option>";
	}
}

function fetchDir() {
	$query = mysql_query("SELECT distinct family FROM masterall");
	while ($rs = mysql_fetch_array($query)) {
		echo "<option value='".$rs["family"]."'>".$rs["family"]."</option>";
	}
}

function fetchScheme() {
	$query = mysql_query("SELECT distinct scheme FROM masterschemes");
	while ($rs = mysql_fetch_array($query)) {
		echo "<option value='".$rs["scheme"]."'>".$rs["scheme"]."</option>";
	}
}

?>
