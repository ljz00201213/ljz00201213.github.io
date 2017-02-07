
<?php
include "connect.php";

var_dump($_POST);
if(!empty($_POST)){
$userName = $_POST['username'];
$passWord = $_POST['password'];
$sql = "insert into  person (username, password) values('$userName','$passWord')";

$result = mysqli_query($link, $sql);

?>


<script type='text/javascript'>
    var showInfo = parent.document.getElementById('showInfo');
    showInfo.innerHTML = '注册成功';
    var username = parent.document.getElementById('username');
    var password = parent.document.getElementById('password');
    var sub = parent.document.getElementById('sub');
    username.value = '';
    password.value = '';
</script>