// 获取元素
var login = document.querySelector('.login');
var mask = document.querySelector('.cover');
var link = document.querySelector('#link');
var close = document.querySelector('#close');

// 点击弹出登录框
link.addEventListener('click', function() {
  mask.style.display = 'block';
  login.style.display = 'block';
})

close.addEventListener('click', function() {
  mask.style.display = 'none';
  login.style.display = 'none';
})