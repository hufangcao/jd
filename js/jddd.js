/**
 * Created by 11498 on 2018/1/9.
 */
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
    var $mask=$('#mask');//获取黄矿
    var maskWidth=$mask.width();//黄矿的宽高
    var maskHeight=$mask.height();//透明
    var $maskTop=$('#maskTop');
    var mImgWidth=$maskTop.width();//中图的宽高
    var mImgHeight=$maskTop.height();
    var $largeImg=$('#largeImg');//获取大图
    var $largeImgContainer=$('#largeImgContainer');//大图容器
    $maskTop.hover(function () {//绑定移动事件 用透明盒子 空标签加载速度快
      $mask.show();
      $largeImg.show();
      $largeImgContainer.show();
      var srcM=$('#mediumImg').attr('src');//获得中途的src
      var srcL=srcM.replace('m.jpg','l.jpg');//拼串
      $largeImg.attr('src',srcL);//与大图连接
      var LimgWidth=$largeImg.width();//大图的宽高
      var LimgHeight=$largeImg.height();
      $largeImgContainer.css({//设置图片的容器是图片的4分支1
        width:LimgWidth/2,
        height:LimgHeight/2
      });
      $maskTop.mousemove(function (event) {//鼠标事件 一旦触发一直回掉
        var top=0;
        var left=0;
        var offsetleft=event.offsetX;//获取鼠标相对于小方框的位置
        var offsettop=event.offsetY;
        left=offsetleft-(maskWidth/2);//修正小方框的位置 实际是向上右方向移动了小黄框 也是小黄框的位置
        top=offsettop-(maskHeight/2);
        if(left<0){//判断小黄框的边界值
          left=0;
        }else if(left>mImgWidth-maskWidth){
          left=mImgWidth-maskWidth;
        }
        if(top<0){
          top=0;
        }else if(top>mImgHeight-maskHeight){
          top=mImgHeight-maskHeight;
        }
        $mask.css({//目的 改变小黄框的位置；
          left:left,
          top:top
        })
        left=-(left/mImgWidth)*LimgWidth;//大图的偏移量；
        top=-(top/mImgHeight)*LimgHeight;
        $largeImg.css({//大图的偏移量；
          left:left,
          top:top
        })
      })
    },function () {//移除隐藏
      $mask.hide();
      $largeImg.hide();
      $largeImgContainer.hide();
    })

  }
  function movePic() {
    var $backward = $('#preview>h1>a:first');//获取两个按钮
    var $forward = $('#preview>h1>a:last');
    var $list = $('#icon_list');//获取图片总数；
    var img_count = 0;//计数器 记录左侧有几张图片
    var show_img = 5;//显示图片个数
    var img_width = 62;//图片的宽度；
    var img = $list.children().length;
    if (img > show_img) {
      $forward.attr('class', 'forward');//如果图片没达到显示区域 就不会加类
    }
    $forward.click(function () {
      var nowClass = $(this).attr('class');//获取当前的class
      if (nowClass !== 'forward_disabled') {
        img_count++;
        //点击一张图片
        if (img_count ===img - show_img) {//判断是否还有照片  没有的话 没有点的
          $forward.attr('class', 'forward_disabled')
        }
        $backward.attr('class', 'backward');//另一边的按钮也可以点击  改变样式
        $list.css('left', -img_count * img_width); //移动的距离；
      }
    })
    $backward.click(function () {
      var nowClass = $(this).attr('class');
      if (nowClass !== 'backward_disabled') {
        img_count--;
        if (img_count === 0) {
          $backward.attr('class', 'backward_disabled');
        }
        $forward.attr('class', 'forward');
        $list.css('left', -img_count * img_width);
      }
    })
  }

    function mediumImg() {
      $('#icon_list>li').hover(function () {

        var src = $(this).children().attr('src');
        var srcMedium = src.replace('.jpg', '-m.jpg');
        $('#mediumImg').attr('src', srcMedium);
        $(this).addClass('hoveredThumb');
      }, function () {
        $(this).removeClass('hoveredThumb');
      })
    }

    function products() {
      $('.main_tabs>li').click(function () {
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
        var $div = $('#product_detail').children('div:not(:first)');
        var index = $(this).index();
        $div.hide();
        $div.eq(index).show();
      })
    }


    function minicart() {
      $('#minicart').hover(function () {
        $(this).addClass("minicart");
        $(this).children('div').show();
      }, function () {
        $(this).removeClass("minicart");
        $(this).children('div').hide();
      })
    }


    function address() {
      $('#store_select').hover(function () {
        $('#store_content,#store_close').show()
      }, function () {
        $('#store_content,#store_close').hide();
      })
      $('#store_close').click(function () {
        $('#store_content,#store_close').hide()
      })
      $('#store_tabs>li').click(function () {
        $(this).addClass('hover');
        $(this).siblings().removeClass('hover')
      })
    }

    function share() {
      var isopen = false;
      $('#shareMore').click(function () {
        if (isopen) {
          $('#dd').css('width', '155px');
          $(this).prevAll(':lt(2)').hide();
          $(this).children().removeClass('backword')
        } else {
          $('#dd').css('width', '200px');
          $(this).prevAll(':lt(2)').show();
          $(this).children().addClass('backword')
        }
        isopen = !isopen;
      })
    }

    function search() {
      $('#txtSearch').on('focus keyup', function () {
        var val = $.trim($(this).val());
        if (val) {
          $('#search_helper').show()
        }
      }).blur(function () {
        $('#search_helper').hide()
      })
    }

    function subMenu() {
      $('#category_items>.cate_item').hover(function () {
        $(this).children('div').show()
      }, function () {
        $(this).children('div').hide()
      })
    }

    function howHide() {  //1
      $('[name=show_hide]').hover(function () {
        var id = $(this).attr('id');
        $('#' + id + '_items').show();
      }, function () {
        var id = $(this).attr('id');
        $('#' + id + '_items').hide();
      })
    }
  })