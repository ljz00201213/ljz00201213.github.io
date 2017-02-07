<?php
include"connect.php";
$sql = "select *from person";
$result = mysqli_query($link,$sql);
while($row = mysqli_fetch_assoc($result)){
    $arr[] = $row;
}
$str = json_encode($arr);
echo $str;
mysqli_close($link);
?>