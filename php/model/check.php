<?php
require('./model/_connect.php');
$uid = $_COOKIE["userid"];
$token = $_COOKIE["token"];

$check_str = "SELECT * FROM `user` WHERE `user_id`=$uid AND `password` = $token"; 
$res=mysqli_query($conn,$check_str);
$resData = mysqli_fetch_assoc($res);
$check_rows = mysqli_num_rows($res);

?>