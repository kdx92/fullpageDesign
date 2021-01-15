$(function(){
  $('#fullpage').fullpage( {//fullpage方法里面接受json对象形式
    navigation: true,//是否显示项目导航，默认不显示
    loopTop: true,
    loopBottom: true,
    keyboardScrolling: true,
    scrollingSpeed: 400,
  });
});