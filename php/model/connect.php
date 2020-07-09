<?php

header('content-type:text/html;charset=utf8');
$host = "localhost";
$db_name = "root";
$db_pw = "root";
//创建连接
$conn = mysqli_connect($host,$db_name,$db_pw);
if(mysqli_connect_error()){
	die('连接失败');
}

?>