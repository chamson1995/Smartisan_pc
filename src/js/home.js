
class Banner{
    constructor(selector,bannerList){
        this.selector = selector;
        this.length = bannerList.length
        this.index = 0
        this.timer = null
        this.setBanner(bannerList)
        this.setDots()
    }
    setBanner(bannerList){
        var images = ""
        var dots = ""
        bannerList.forEach( (list,index )=> {
            images += 
            "<a href='"+list.link+"' class='banner-slide"+(index==0?" banner-pagination-bullet-active":"")+"' "+(index==0?"style='opacity:1'":"")+">"+
                "<img alt='banner' class='banner-img' src='"+list.image+"?x-oss-process=image/resize,w_1220'>"+
            "</a>";
            dots += "<span class='banner-pagination-bullet'></span>"
        });
        var bannerContainer = 
                "<div class='banner-container'>"+
                    "<div class='banner-wrapper'>"+
                        images+
                    "</div>"+
                    "<div class='banner-pagination'>"+
                        dots+
                    "</div>"+
                "</div>"
        $(".banner").append(bannerContainer)
    }
    setDots(){
        var _this = this;
        $(".banner-pagination").on('click',function(e){
            var evt = window.event || e;
            _this.index = $(evt.target).index()
            _this.goto(_this.index);
        })
    }
    goto(index){
        index = index%this.length
        $(this.selector+" .banner-wrapper").children().eq(index)
            .css({opacity:1})
            .siblings().css({opacity:0})
        $(this.selector+" .banner-pagination").children().eq(index)
            .addClass("banner-pagination-bullet-active")
            .siblings().removeClass("banner-pagination-bullet-active")
        this.autoplay();
    }
    autoplay(){
        clearInterval(this.timer)
        var _this = this
        _this.timer = setInterval(() => {
            _this.index = (_this.index+1)%_this.length;
            _this.goto(_this.index)
        }, 2500);
    }
}

class HomeActivities{
    constructor(activitiesList){
        this.activitiesList = activitiesList;
        this.setActivities()
    }
    setActivities(){
        var activities = ""
        this.activitiesList.forEach(list => {
            activities += 
                "<figure class='advertise'>"+
                    "<img src='"+list.image+"'>"+
                    "<a href='"+list.link+"' class='ad-click-mask'></a>"+
                "</figure>"
        });
        $(".activities-wrap").append(activities);
    }
}

function _3dHover( selector ){
    var h = $(selector).height();
    var w = $(selector).width();
    $(".banner").on('mousemove',function(e){
        var evt = window.event || e;
        $(selector).css({
            transition:"none",
            // transformOrigin:(3*w/5-evt.offsetX/5)+"px "+-(3*h/5-evt.offsetY/5)+"px " +"0px",
            transform: "rotateX("+-(evt.offsetY-h/2)/h+"deg) rotateY("+(evt.offsetX-w/2)/w+"deg)",
            boxShadow: -(evt.offsetX-w/2)/w*20+"px "+-(evt.offsetY-h/2)/h*20+"px 10px 0 rgba(0,0,0,0.2)"
        })
        // $(".banner .mask").css({
        //     background: "-webkit-radial-gradient("+evt.offsetX+"px "+evt.offsetY+"px,circle,rgba(0, 0, 0, 0) 0%,rgba(255, 255, 255, 0.1) 80%)"
        // })
    })
    $(".banner").on('mouseleave',function(e){
        var evt = window.event || e;
        $(selector).css({
            transition: "0.15s ease-in-out",
            transform: "rotateX(0deg) rotateY(0deg)",
            boxShadow:  "0 0 10px 0px rgba(0,0,0,0.2)"
        })
    })
}
$.ajax({
    url: "/home/product/home",
    dataType: "json",
    success: function (response) {
        var banner = new Banner(".banner",response.data.home_carousel)
        banner.autoplay()
        var activities = new HomeActivities(response.data.home_activities)
        // _3dHover(".banner-container");
    }
});