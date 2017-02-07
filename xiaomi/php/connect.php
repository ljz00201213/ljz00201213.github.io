<?php
header("Content-type: text/html; charset=utf-8");
include "config.php";
##连接数据库
$link = mysqli_connect(DB_HOST ,DB_USER ,DB_PWD ,DB_NAME);
##判断是否成功
if(mysqli_connect_errno($link)){
    exit(mysqli_connect_error($link));
}
##设置字符集
mysqli_set_charset($link ,DB_CHARSET);
?>