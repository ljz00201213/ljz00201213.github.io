<?php
include "connect.php";
$userName = $_POST['username'];
$passWord = $_POST['password'];
$sql = "insert into  person (username, password) values('$userName','$passWord')";
$result = mysqli_query($link, $sql);
mysqli_close($link);
?>
