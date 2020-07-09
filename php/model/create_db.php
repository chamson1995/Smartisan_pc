<?php
require('./_connect.php');

//书写sql语句
$sql = "CREATE DATABASE smartisan;
CREATE table smartisan.user(
	user_id int NOT NULL auto_increment,
    user_name varchar(20),
    password varchar(20),
    PRIMARY KEY  (`user_id`)
);
CREATE table smartisan.cart(
	user_id int NOT NULL,
    category_id int NOT NULL,
    count int NOT NULL,
    PRIMARY KEY  (`user_id`)
);";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>