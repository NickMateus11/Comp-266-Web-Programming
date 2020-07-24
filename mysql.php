<?php

$username = "***"; // Fill with creds
$password = "***";
$database = "***";
$hostname = "***";

$dbh = mysql_connect($hostname, $username, $password) or die("Unable to connect to MySQL");
$selected = mysql_select_db($database, $dbh) or die("Could not select database $database");


if (!empty($_GET)) {
	$page = $_GET["page"];
	$query_result = mysql_query("SELECT comment,date FROM comments WHERE page=\"$page\"");

	mysql_close($dbh);

	$res = array();
	$data = array();
	while ($row = mysql_fetch_assoc($query_result)) {
		$data['comment'] = $row['comment'];
		$data['date'] = $row['date'];
		$res[] = $data;
	}
	$response = array();
	$response['comments'] = $res;
	exit(json_encode($response));

} elseif (!empty($_POST)) {
	$page = mysql_real_escape_string($_POST["page"]);
	$comment = mysql_real_escape_string($_POST["comment"]);
	$date = mysql_real_escape_string($_POST["date"]);
	$query_result = mysql_query("INSERT INTO comments(page,comment,date) VALUES(\"$page\",\"$comment\",\"$date\")");

	mysql_close($dbh);

	$response = array();
	if (mysql_affected_rows() != -1) {
		$response['status'] = 200;
	} else {
		$response['status'] = 500;
	}
	exit(json_encode($response));
}

?>
