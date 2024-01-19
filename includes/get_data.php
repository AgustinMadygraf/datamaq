<?php
// includes/getData.php
require "includes/database_connection.php";

$sql = "SELECT unixtime, variacion FROM variacion";
$result = $conn->query($sql);
$data = array();

foreach ($result as $row) {
    $data[] = array($row['unixtime'], $row['variacion']);
}

echo json_encode($data);
$conn->close();
?>
