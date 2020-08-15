$(".search-wrapper input").on("input",function(){
    var kw = $(".search-wrapper input").val()
    $.ajax({
        url:"/smartisan_hotword/v1/search/suggest",
        data:{
            keyword:$(".search-wrapper input").val()
        },
        success:function(data){
            $(".search-wrapper .dropdown-container").css({display:"block"});
            $(".search-wrapper .dropdown-container .list").empty()
            if(data.data.length == 0){
                $(".search-wrapper .dropdown-container").css({display:"none"});
            }else{
                data.data.forEach(element => {
                    var arr = element.split('')
                    var index = element.toLowerCase().indexOf(kw.toLowerCase())
                    arr.splice(index,kw.length,'<span class="hightlight-text">'+kw+'</span>')
                    $(".search-wrapper .dropdown-container .list").append('<li class="word">'+arr.join('')+'</li>')
                });
            }
        },
        dataType:"json"
    })
})
$(".search-wrapper input").on("blur",function(){
    $(".search-wrapper .dropdown-container").css({display:"none"});
})
$(".search-wrapper input").on("focus",function(){
    if($(".search-wrapper .dropdown-container .list li").length >0){
        $(".search-wrapper .dropdown-container").css({display:"block"});
    }
})
