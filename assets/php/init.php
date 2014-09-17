<?php

$host ="localhost";
$user = "root";
$passwd = "";
$database = "uapdb";

mysql_connect($host, $user, $passwd) or die(mysql_error());
mysql_select_db($database);

?>