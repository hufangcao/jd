
$(function () {
  /* 1. 鼠标移入显示,移出隐藏
   目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
   2. 鼠标移动切换二级导航菜单的切换显示和隐藏
   3. 输入搜索关键字, 列表显示匹配的结果
   4. 点击显示或者隐藏更多的分享图标
   5. 鼠标移入移出切换地址的显示隐藏
   6. 点击切换地址tab

   7. 鼠标移入移出切换显示迷你购物车
   8. 点击切换产品选项 (商品详情等显示出来)
   9. 当鼠标悬停在某个小图上,在上方显示对应的中图
   10. 点击向右/左, 移动当前展示商品的小图片
   11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域*/
  howHide();
  subMenu();
  search();
  share();
  address();
  minicart();
  products();
  mediumImg();
   movePic();
   showBig();
   function showBig() {
      var $mask=$('#mask');
      var maskWidth=$mask.width();
      var maskHeight=$mask.height();
      var $maskTop=$('#maskTop');
      var mediumWidth=$maskTop.width();
      var mediumHeight=$maskTop.height();
      var $largeImgContainer=$('#largeImgContainer');
      var $largeImg=$('#largeImg');
      var $mediumImg = $('#mediumImg');
      $maskTop.hover(function () {
       $mask.show();
       $largeImg.show();
       $largeImgContainer.show();
       var src=$mediumImg.attr('src');
        var srcl=src.replace('m.jpg','l.jpg');
       $largeImg.attr('src',srcl);
       var largeWidth=$largeImg.width();
       var largeHeight=$largeImg.height();
       $largeImgContainer.width(largeWidth/2);
       $largeImgContainer.height(largeHeight/2);
      $maskTop.mousemove(function (event) {
       var top=0;
       var left=0;
       var offsetX=event.offsetX;
       var offsetY=event.offsetY;
       left=offsetX-maskWidth/2;
       top=offsetY-maskHeight/2;
       //var largeWidth=$largeImg.width;
       //var largeHeight=$largeImg.height;
       if(left<0){
         left=0
       }else if(left>mediumWidth-maskWidth){
         left=mediumWidth-maskWidth
       }
       if(top<0){
         top=0;
       }else if(top>mediumHeight-maskHeight){
         top=mediumHeight-maskHeight;
       }

       $mask.css({
           top:top,
           left:left,
         })
       left=-left/mediumWidth*largeWidth;
       top=-top/mediumHeight*largeHeight;
       $largeImg.css({
         left:left,
         top:top
       })
     })
   },function () {
    $mask.hide();
    $largeImg.hide();
    $largeImgContainer.hide();
  })
  }
  function movePic() {
      var WIDTH=62;
      var $preview=$('#preview');
      var $forward=$preview.children('h1').children('a:eq(1)');
      var $backward=$preview.children('h1').children('a:eq(0)');
      var img_count=0;
      var currleft=$('#icon_list');
      var num=$('#icon_list').children().length;
      var img_num=5;
      if(num>img_num){
        $forward.attr('class','forward');
      }
    $forward.click(function () {
      var nowclass=$(this).attr('class');//获取当前按钮的class值
      if(nowclass!=='forward_disabled'){//判断是否可点击状态
        img_count++;
        if(img_count===num-img_num){//判断点击的次数 是否与总的图片数减去显示图片数
          $(this).attr('class','forward_disabled');//如果相等 那么就是没有图片了 所以改变可点击状态
        }
        if(img_count>0){//如果点击数目大于0 说明另一侧也可以点击 改变点击状态
      $backward.attr('class','backward');
        }
      currleft.css('left',-img_count*WIDTH);}//最后改变移动的值；
    })
    $backward.click(function () {
      var nowclass=$(this).attr('class');
      if(nowclass!=='backward_disabled'){
        img_count--;
        if(img_count<num-img_num){
          $forward.attr('class','forward')
        }
        if(img_count===0){
          $backward.attr('class','backward_disabled');
        }
        currleft.css('left',-img_count*WIDTH);
        //console.log(currleft.css('left',-img_count*WIDTH))
      }
    })
  }
  function mediumImg() {
    $('#icon_list>li').hover(function () {
       $(this).children().addClass('hoveredThumb');
      var src= $(this).children().attr('src').replace('.jpg','-m.jpg');
       $('#mediumImg').attr('src',src);
    },function () {
      $(this).children().removeClass('hoveredThumb');
    })
  }
  function products() {
    $('.main_tabs>li').click(function () {
       $(this).addClass('current')
      $(this).siblings().removeClass('current');
       //var targetIndex=$(this).index();
       var $div=$('#product_detail').children('div:not(:first) ');
      var targetIndex=$(this).index();
       $div.hide();
       $div.eq(targetIndex).show;
    })
  }
  function minicart() {
    $('#minicart').hover(function () {
      $(this).addClass('minicart');
      $(this).children('div').show();

    },function () {
      $(this).removeClass('minicart');
      $(this).children('div').hide();
    })
  }
  function address() {
    $('#store_select').hover(function () {
      $('#store_content').show();
    },function () {
      $('#store_content').hide();
    })
    $('#store_tabs>li').click(function () {
      $(this).addClass('hover').siblings().removeClass('hover');
    })
  }
  function share() {
     var isOpen=false
    $('#shareMore').click(function () {
      if(isOpen){
        $('#dd').css('width','155');
        $(this).prevAll(':lt(2)').hide()
        $(this).children().removeClass('backword');
      }else{
        $('#dd').css('width','200');
        $(this).prevAll(':lt(2)').show();
        $(this).children().addClass('backword');
      }
      isOpen=!isOpen;
    })
  }
  function search() {
    $('#txtSearch').on('focus keyup',function () {
       var val=$.trim($(this).val());
       if(val){
         $('#search_helper').show()
       }
    }).blur(function () {
      $('#search_helper').hide();
    })
  }
  function subMenu() {
     $('.cate_item').hover(function () {
       $(this).children('div').show()
     },function () {
      $(this).children('div').hide();
     })
  }
  function howHide() {
    $('[name=show_hide]').hover(function () {
      var id = $(this).attr('id');
      $('#' + id + '_items').show();
    }, function () {
      var id = $(this).attr('id');
      $('#' + id + '_items').hide();
    })
  }
})