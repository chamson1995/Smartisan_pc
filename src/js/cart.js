
function addCart(category_id){
    console.log(category_id)
    $.ajax({
        type: "post",
        url: "/myphpcart",
        data: {
            option:"addcart",
            categoryid:category_id
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
}
function getCart(){
    console.log("get")
    $.ajax({
        type: "post",
        url: "/myphpcart",
        data: {
            option:"getcart"
        },
        dataType: "json",
        success: function (response) {
            console.log(response)
            var ids = "";
            response.data.forEach(category => {
                ids += category.category_id;
            });
            getSmartisanCart(ids);
        }
    });
}
function delCart(category_id){
    console.log("del")
    $.ajax({
        type: "post",
        url: "/myphpcart",
        data: {
            option:"delcart",
            categoryid:category_id
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
}
function delAllCart(){
    console.log("delall")
    $.ajax({
        type: "post",
        url: "/myphpcart",
        data: {
            option:"delallcart"
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
}

function getSmartisanCart(ids){
    $.ajax({
        url: "/smartisan_cart",
        data: "ids="+ids,
        dataType: "json",
        success: function (response) {
            console.log(response)
        }
    });
}
