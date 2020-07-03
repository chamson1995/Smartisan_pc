class GoodsList{
    constructor(dataList){
        this.dataList = dataList
    }
    getItem(sku){
        var item = 
            "<section  class='item'>"+
                "<figure class='item-cover'>"+
                    "<img src='"+sku.spuInfo.images+"'>"+
                "</figure>"+
                "<article>"+
                    "<h3>"+ sku.spuInfo.spuTitle +"</h3>"+
                    "<h5 class='txt-product-title'>"+sku.spuInfo.spuSubTitle+"</h5>"+
                "</article>"+
                "<aside class='item-attr-colors'>"+
                "</aside>"+
                "<article class='item-price'>"+
                    "<span>"+sku.spuInfo.discountPrice+"</span>"+
                    "<span class='orignal-price'>"+sku.spuInfo.price+"</span>"+
                "</article>"+
                "<div class='activity-tag'>"+
                (sku.spuInfo.tagText==""? "":("<span class='"+(sku.spuInfo.tagText=="满减"?"red":"yellow")+"'>"+sku.spuInfo.tagText+"</span>"))+
                "</div>"+
                "<div class='markup-tag'></div>"+
            "</section>"
        return item;
    }
    getAll(){
        var all = ""
        this.dataList.forEach(element => {
            all += this.getItem(element);
        });
        return all;
    }
}


// 主体部分商品列表
$.ajax({
    url: "/smartisan_goods_list",
    data: {
        category_id:152,
        page:1,
        sort:"sort",
        num:100,
        type:"shop",
        channel_id:1001
    },
    dataType: "json",
    success: function (response) {
        $('.category-list').empty().append(new GoodsList(response.data.list).getAll());
    }
});

function getGoodsList(page,count){
    
}