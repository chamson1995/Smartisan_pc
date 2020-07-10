
function addCart(category_id){
    var reg = /^\d{7}/;

    $.ajax({
        type: "post",
        url: "/myphpcart",
        data: {
            option:"addcart",
            categoryid:parseInt(reg.exec(category_id))
        },
        dataType: "json",
        success: function (response) {
            console.log(1)
            console.log(response);
        }
    });
}
function getCart(fn=()=>{}){
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
            var reg = /^\d{7}/;
            var ids = "";
            var count = []
            ``
            if(response.code){
                response.data.forEach(category => {
                    ids += reg.exec(category.category_id)+",";
                    count.push(category.count)
                });
                console.log(ids)
                var cart = new Cart(ids,count,".list-container")
            }else{
                $(".list-container").append(
                    "<div class='cart-empty'>"+
                        "<p class='desc'>"+
                            "购物车为空"+
                        "</p>"+
                        "<p class='desc-prompt'>"+
                            "您还没有选购任何商品，现在前往商城选购吧！"+
                        "</p>"+
                    "</div>"
                )
            }
        }
    });
}
function delCart(category_id){
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



class Cart{
    constructor(ids,count,selector=""){
        this.ids = ids;
        this.count = count;
        this.selector = selector;
        this.getSmartisanCart(this.ids)
    }
    getSmartisanCart(ids){
        var _this = this;
        $.ajax({
            url: "/smartisan_cart",
            data: "ids="+ids,
            dataType: "json",
            success: function (response) {
                var list = response.data.list.sort(function(a,b){
                    return b.id-a.id;
                })
                console.log(list)
                _this.setAll(list)
                _this.setDelClick()
            }
        });
    }
    setAll(list){
        console.log("setAll执行")
        var lis = ""
        var totalPrice = 0
        list.forEach( (li ,index)=>{
            totalPrice += parseInt(li.price)*parseInt(this.count[index]);
            lis += 
                    "<li data-index='"+index+"' category-id='"+li.id+"' class='cart-item'>"+
                        "<img class='cart-picture' src='"+li.sku_info[0].ali_image+"?x-oss-process=image/resize,w_78'>"+
                        "<div class='cart-detail d-flex flex-column justify-content-center'>"+
                            "<p class='title'>"+
                                li.name+
                            "</p>"+
                            "<p class='attrs'>"+
                                "<span class='attr'>数学家哈密顿首次发现四元数</span></p>"+
                            "<p class='cart-price'>"+
                                "<span class='price'>"+li.price+"</span>"+
                                "<span class='count'>x"+this.count[index]+"</span>"+
                            "</p>"+
                        "</div>"+
                        "<div class='delete-button'></div>"+
                    "</li>";
        })
        var all = 
        "<div class='cart-list-wrapper'>"+
            "<ul class='cart-list' >"+
                lis+
            "</ul>"+
            "<div class='money-panel'>"+
                "<div class='total-content'>"+
                    "<p class='total-count'>"+
                        "共 <strong>"+list.length+"</strong> 件商品"+
                    "</p>"+
                    "<p class='total-money'>"+
                        "合计: <span class='money'>"+parseInt(totalPrice)+".00</span>"+
                    "</p>"+
                "</div>"+
                "<button type='button' class='btn btn-primary'>"+
                    "<span>去购物车</span>"+
                "</button>"+
            "</div>"+
        "</div>";
        $(this.selector).empty().append(all);
    }
    setDelClick(){
        $('.delete-button').on('click',function(){
            var id =$(this).parents("li.cart-item").attr("category-id");
            delCart(id);
            $(this).parents("li.cart-item").remove()
            if(!$(".cart-drawer-wrapper .cart-item").size()){
                $(".list-container").empty().append(
                    "<div class='cart-empty'>"+
                        "<p class='desc'>"+
                            "购物车为空"+
                        "</p>"+
                        "<p class='desc-prompt'>"+
                            "您还没有选购任何商品，现在前往商城选购吧！"+
                        "</p>"+
                    "</div>"
                )
            }
        })
    }
}