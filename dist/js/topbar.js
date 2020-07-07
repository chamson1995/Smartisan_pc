
class menuList{constructor(selector){this.selector=selector;this.init();}
show(){$('.sub-panel-wrapper-hide').removeClass('sub-panel-wrapper-hide').addClass('sub-panel-wrapper-show');}
hide(){$('.sub-panel-wrapper-show').removeClass('sub-panel-wrapper-show').addClass('sub-panel-wrapper-hide');}
init(){var _this=this;console.log($(this.selector));$(this.selector).on('mouseleave',function(){_this.hide();});$(this.selector).on('mouseenter',function(){_this.show();});}}
class Category{constructor(categoryArr){this.categoryArr=categoryArr;}
getWrapperItem(title,subList){var item="<li class='item'>"+"<div class='container'>"+"<div class='title'>"+title+"</div>"+"<ul class='category-container' style='width: 202px;'>"+subList+"</ul>"+"</div>"+"</li>";return item;}
getSub(subList){var list="";subList.forEach(sub=>{list+="<li class='category-item' data-id='"+sub.id+"'>"+"<a class='link'>"+"<img src='"+sub.image+"?x-oss-process=image/resize,w_40' class='picture'>"+"<span class='sub-title'>"+sub.name+"</span>"+"</a>"+"</li>";});return list;}
getAll(){var all="";this.categoryArr.forEach(list=>{all+=this.getWrapperItem(list.title,this.getSub(list.sub));});return all;}}
class Goods{constructor(goodsList){this.goodsList=goodsList;}
getSub(subList){var list="";subList.forEach(sub=>{list+="<li class='item'>"+"<a class='link'>"+"<img class='picture' src='"+sub.ali_image+"?x-oss-process=image/resize,w_126'>"+"<p class='name'>"+sub.sku_name+"</p>"+"<p class='price'>"+sub.sell_price+"</p>"+"</a>"+"</li>";});return list;}
getAll(){var all="";all=this.getSub(this.goodsList);return all;}}
function setSecondbar(dataList){var secbar="";dataList.forEach(li=>{secbar+="<li><a href='"+li.url+"' class='title'>"+li.name+"</a></li>";});secbar+="<li><a class='title'>服务</a></li>";$('.title-content').append(secbar);dataList.forEach((li,index)=>{if(li.type=="category"){$('.title-content li a').eq(index).on('mouseover',function(){this.category=new Category(li.list).getAll();$(".category-wrapper").empty();$(".category-wrapper").css({display:'flex'}).siblings().css({display:'none'});$(".category-wrapper").append(this.category);});}
if(li.type=="goods"){$('.title-content li a').eq(index).on('mouseover',function(){this.goods=new Goods(li.list).getAll();$(".goods-container").empty();$(".goods-container").css({display:'flex'}).siblings().css({display:'none'});$(".goods-container").append(this.goods);});}});$('.title-content li a').last().on('mouseenter',function(){$('.service-list').css({display:'flex'}).siblings().css({display:'none'});});}
$.ajax({url:"/smartisan_second_nav/v1/cms/second_nav",success:function(data){setSecondbar(data);}});const menu_list=new menuList(".title-wrapper");