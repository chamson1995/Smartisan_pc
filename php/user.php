<?php

    require("./model/_connect.php");

    $un = $_REQUEST['username'];
    $pw = $_REQUEST['password'];
    $option = $_REQUEST['option'];

    $regist_can_str = "SELECT `user_id`  FROM  `user` WHERE `user_name` = '$un' ";
    $regist_str = "INSERT INTO `user` (`user_name`,`password`) VALUES ( '$un' , '$pw' ) ";
    $login_str = "SELECT *  FROM  `user` WHERE `user_name` = '$un' AND `password` = '$pw' ";

    if($option=="regist"){
        $res=mysqli_query($conn,$regist_can_str);
        $result = mysqli_fetch_assoc($res);
        if($result){        
            echo "{code:0,msg:'用户名已被注册'}";
        }else{
            $res=mysqli_query($conn,$regist_str);
            if($res){
                echo "{code:1,msg:'注册成功'}";
            }else{
                echo "{code:0,msg:'注册失败'}";
            }
        }
    }
    if($option=="login"){
        $res=mysqli_query($conn,$login_str);
        $result = mysqli_fetch_assoc($res);
        if($result){
            echo "{code:1,msg:'登陆成功'}";
            setcookie("userid",$result["user_id"],time()+60*60);
            setcookie("token",$result["password"],time()+60*60);
        }else{
            echo "{code:0,msg:'登陆失败'}";
        }
    }
    mysqli_close($conn);
?>