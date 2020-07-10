<?php
    require("./model/_connect.php");
    require("./model/check.php");

    $uid = $_COOKIE["userid"];
    $token = $_COOKIE["token"];
    $option = $_REQUEST["option"];
    $categoryid = $_REQUEST["categoryid"];

    if($check_rows>0){
        if($option=="getcart"){
            $sql = "SELECT * FROM cart WHERE `user_id` = '$uid' ORDER BY `category_id` DESC";
            $result = mysqli_query($conn,$sql);
            if(mysqli_num_rows($result)>0){	
                $arr = mysqli_fetch_all($result,MYSQLI_ASSOC);
                echo json_encode(array("code"=>1,"data"=>$arr));
            }else{	
                echo json_encode(array("code"=>0));
            }
        }
        if($option == "addcart"){
            $sql = "SELECT * FROM `cart` WHERE `category_id`=$categoryid";
            $res = mysqli_query($conn,$sql);
            $rows = mysqli_num_rows($res);
            if($rows>0){
                $row = mysqli_fetch_assoc($res);
                $num = $row['count']+1;
                $sql = "UPDATE `cart` SET `count`=$num WHERE `category_id`=$categoryid";
            }else{
                $sql = "INSERT INTO `cart` (`user_id`,`category_id`,`count`) VALUES ('$uid','$categoryid',1)";
            }
            $result = mysqli_query($conn,$sql);
            if($result){
                echo json_encode(array("code"=>1,"msg"=>"添加成功"));
            }else{
                echo json_encode(array("code"=>0,"msg"=>"添加失败"));
            }
        }
        if($option=="delcart"){
            $sql = "DELETE FROM `cart` WHERE `user_id`=$uid AND `category_id`=$categoryid";
            $result = mysqli_query($conn,$sql);
            if($result){
                echo json_encode(array("code"=>1,"msg"=>"删除成功","category_id"=>$categoryid));
            }else{
                echo json_encode(array("code"=>0,"msg"=>"删除失败"));
            }
        }
        if($option=="delallcart"){
            $sql = "DELETE FROM `cart` WHERE `user_id`=$uid";
            $result = mysqli_query($conn,$sql);
            if($result){
                echo json_encode(array("code"=>1,"msg"=>"清空成功"));
            }else{
                echo json_encode(array("code"=>0,"msg"=>"清空失败"));
            }
        }
    }else{
        echo json_encode(array("code"=>1,"msg"=>"你还没有登陆"));
    }

    mysqli_close($conn);

?>