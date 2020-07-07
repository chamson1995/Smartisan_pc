class GoodsList {
    constructor(dataList,isRefresh) {
        this.dataList = dataList;
        this.isRefresh = isRefresh;
        this.setAll()
        this.setHoverColor()
    }
    getItem(sku,index) {
        var color = ""
        if (sku.skuList.length > 1) {
            sku.skuList.forEach((list,index) => {
                if(list.skuColor!=""){
                    color +=
                        "<figure class = 'outer "+(index==0?"active":"")+"' >"+
                            "<img src = '"+list.skuColor+"?x-oss-process=image/resize,w_20'>"+
                        "</figure>"
                }
            });
        }
        var item =
            "<section  class='item' index='"+ index +"'>" +
                "<figure class='item-cover'>" +
                    "<img src='" + sku.spuInfo.images + "?x-oss-process=image/resize,w_216'>" +
                "</figure>" +
                "<article>" +
                    "<h3>" + sku.spuInfo.spuTitle + "</h3>" +
                    "<h5 class='txt-product-title'>" + sku.spuInfo.spuSubTitle + "</h5>" +
                "</article>" +
                "<aside class='item-attr-colors'>" +
                    color+
                "</aside>" +
                "<article class='item-price'>" +
                    "<span>¥ " + sku.spuInfo.discountPrice + "</span>" +
                    "<span class='orignal-price'>" + sku.spuInfo.price + "</span>" +
                "</article>" +
            "<div class='activity-tag'>" +
            (sku.spuInfo.tagText == "" ? "" : ("<span class='" + (sku.spuInfo.tagText == "满减" ? "red" : "yellow") + "'>" + sku.spuInfo.tagText + "</span>")) +
            "</div>" +
            "<div class='markup-tag'></div>" +
            "</section>"
        return item;
    }
    setAll(){
        var all = ""
        this.dataList.forEach((list,index) => {
            all += this.getItem(list,index);
        });
        if(this.isRefresh) $('.category-list').empty();
        $('.category-list').append(all);
    }
    setHoverColor(){
        var _this = this
        $(".item-attr-colors figure").on("mouseenter",function(e){
            var evt = window.event || e;
            var colorIndex = $(evt.target).index();
            var index = $(this).parent().parent().attr("index")
            console.log(_this.dataList[index].skuList,colorIndex)           

            var thisTitle =  
                "<h3>" + _this.dataList[index].skuList[colorIndex].skuTitle + "</h3>" +
                "<h5 class='txt-product-title'>" + _this.dataList[index].skuList[colorIndex].skuSubTitle + "</h5>" ;
            var thisImage = 
                "<img src='" + _this.dataList[index].skuList[colorIndex].images + "?x-oss-process=image/resize,w_216'>" 
            var thisPrice =
                "<span>¥ " + _this.dataList[index].skuList[colorIndex].discountPrice + "</span>" +
                "<span class='orignal-price'>" + _this.dataList[index].skuList[colorIndex].originalPrice + "</span>"
            $(this).parent()
                .prev().empty().append(thisTitle)
                .prev().empty().append(thisImage)
            $(this).parent()
                .next().empty().append(thisPrice)
            $(this).addClass("active").siblings().removeClass("active")
        })
    }
}


// 主体部分商品列表
$(".item-wrapper ul li a").on('click', function (e) {
    var evt = window.event || e;
    var sortEvent = ["sort", "sales", "price_low", "price_high"]
    scrollLoadGoods = new LoadGoods({
        category_id: 152,
        page: 1,
        sort: sortEvent[$(evt.target).parent().index()],
        num: 15
    }, true)
    $(this).addClass("active")
        .parent().siblings().children("a").removeClass("active")
})

function getGoodsList(getData = {}, isRefresh) {
    console.log("ajax开始请求")
    $.ajax({
        url: "/smartisan_goods_list/v1/search/goods-list",
        data: {
            category_id: getData.category_id,
            page: getData.page,
            sort: getData.sort,
            num: getData.num,
            type: "shop",
            channel_id: 1001
        },
        dataType: "json",
        success: function (response) {
            console.log("ajax完成")
            new GoodsList(response.data.list,isRefresh);
            //pageCount = response.data.pageCount;
        }
    });
}
function LoadGoods(getData,isRefresh){
    var lock = true;
    var pageNum = getData.page;
    var pageCount = 0
    $.ajax({
        url: "/smartisan_goods_list/v1/search/goods-list",
        data: {
            category_id: getData.category_id,
            page: getData.page,
            sort: getData.sort,
            num: getData.num,
            type: "shop",
            channel_id: 1001
        },
        dataType: "json",
        success: function (response) {
            new GoodsList(response.data.list,isRefresh);
            pageCount = response.data.pageCount;
        }
    });
    return function(isRefresh){
        if(lock){
            lock = false;
            new Promise(function(resolve,reject){
                console.log("Promise执行了")
                pageNum+=1;
                if(pageNum <= pageCount){
                    $.ajax({
                        url: "/smartisan_goods_list/v1/search/goods-list",
                        data: {
                            category_id: getData.category_id,
                            page: pageNum,
                            sort: getData.sort,
                            num: getData.num,
                            type: "shop",
                            channel_id: 1001
                        },
                        dataType: "json",
                        success: function (response) {
                            console.log("ajax完成")
                            new GoodsList(response.data.list,isRefresh);
                            resolve()
                        }
                    });
                }
            }).then(function(){
                lock = true;
                console.log("then   完成")
            }).catch(function(){
                
            })
        }
    }
}

//形成闭包,储存page页数
var scrollLoadGoods = new LoadGoods({
    category_id: 152,
    page: 1,
    sort: "sort",
    num: 15
}, true)
$(window).scroll( function(e) { 
    var evt = window.event || e;
    var distance = $(".category-list").height()+$(".category-list").offset().top - ( $(window).scrollTop() + $(window).height())
    console.log(distance)
    if(distance<100){
        scrollLoadGoods(false)
    }
} );