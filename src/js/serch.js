console.log('seach bar ajax')
$(".search-wrapper input").on("input",function(){
    $.ajax({
        url:"/smartisan_hotword",
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
                    $(".search-wrapper .dropdown-container .list").append('<li class="word"><span class="hightlight-text">'+element.split(" ")[0]+' </span> '+ element.split(" ")[1] +'</li>')
                });
            }
        },
        dataType:"json"
    })
})
$(".search-wrapper input").on("blur",function(){
    $(".search-wrapper .dropdown-container").css({display:"none"});
})
