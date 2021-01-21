// 获取元素
var login = document.querySelector('.login');
var mask = document.querySelector('.cover');
var link = document.querySelector('#link');
var close = document.querySelector('#close');
var title = document.querySelector('#login-title')
// 点击弹出登录框
link.addEventListener('click', function() {
  mask.style.display = 'block';
  login.style.display = 'block';
})
// 点击关闭登录框
close.addEventListener('click', function() {
  mask.style.display = 'none';
  login.style.display = 'none';
})
// 拖拽
// 1.鼠标按下，获得鼠标在盒子内的坐标
title.addEventListener('mousedown', function(e) {
  var x = e.pageX - login.offsetLeft;
  var y = e.pageY - login.offsetTop;
  // 2.鼠标移动的时候，把鼠标在页面中的坐标，减去鼠标在盒子内的坐标就是模态框的left和top值
  document.addEventListener('mousemove', move)

  function move(e) {
    login.style.left = e.pageX - x + 'px';
    login.style.top = e.pageY - y + 'px';
  }
  // 3鼠标弹起，鼠标移动事件移除
  document.addEventListener('mouseup', function() {
    document.removeEventListener('mousemove', move);
  })
})