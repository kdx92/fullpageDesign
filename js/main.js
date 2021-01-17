$(function(){
  $('#fullpage').fullpage( {//fullpage方法里面接受json对象形式
    navigation: true,//是否显示项目导航，默认不显示
    loopTop: true,
    loopBottom: true,
    keyboardScrolling: true,
    scrollingSpeed: 400,
 

  // 回调函数滚动到某一屏后的回调函数，接受anchorLink和index两个参数，
  //anchorLink和index两个参数，anchorLink是锚链接的名称，index是序号，从1开始计算
  afterLoad: function(anchorLink, index) {
    if(index == 1) {
      $(".like1").show().animate({height: "50px", bottom: "-360px"}, 3000, "easeInOutBounce");
      }
      if(index == 2) {
        $(".like2").show().animate({height: "80px"}, 1000, "easeInOutElastic");
        }
    
    },


    



  });
});

