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

// -----------------------------------------------------------------
// 快递单号输入内容时，上面的大号字体盒子enlarge显示出用户输入的内容
// 表单检测用户输入：需要给表单添加键盘事件
// 同时把快递单号里面的值（value）获取过来赋值给enlarge盒子（innerText）做为内容
// 如果快递单号里面的内容为空，则隐藏enlarge盒子
var enlarge = document.querySelector('.enlarge');
var username = document.querySelector('.username');
username.addEventListener('keyup', function() {
  if (this.value == '') {
    enlarge.style.display = 'none';
  } else {
    enlarge.style.display = 'block';
    enlarge.innerText = this.value;
  }
})
// keyup字先落到文本框，再执行程序
// 长按持续触发使用keydown
// keydown和keypress在文本框里面的特点：他们两个事件触发的时候，文字还没有落入文本框中
// keyuo事件触发的时候，文字已经落入文本框里面了
// keypress不识别功能键，所以删除的时候，删不了enlarge中的内容

// 当输入框失去焦点的时候，就隐藏enlarge盒子
username.addEventListener('blur', function() {
  enlarge.style.display = 'none';
})

// 当输入框获得焦点的时候，就显示enlarge盒子
username.addEventListener('focus', function() {
  if (this.value != '') {
    enlarge.style.display = 'block';
  }
})

// 换背景+导航栏显示更换背景选项
// 1.获取元素
var choose = document.querySelector('.choose');
var imgs = document.querySelector('.choose').querySelectorAll('img');
var picHover = document.querySelector('.picHover');
// 2.1鼠标悬浮并显示图片
picHover.addEventListener('click', function() {
  choose.style.display = 'block';
})
// 2.2循环注册事件
for (var i = 0; i < imgs.length; i++) {
  imgs[i].onclick = function() {
    document.querySelector('.login-header').style.backgroundImage = 'url(' + this.src + ')';
  }
}

// 密码框提示
// 首先判断的事件是表单失去焦点 onblur
// 如果输入正确则提示正确的信息，小图标变为绿色
// 如果输入不是6到16位，则提示错误信息，图标颜色为红色
// 因为里面变化样式较多，则采取className修改样式
// 1.获取元素
var password = document.querySelector('.password');
var message2 = document.querySelector('.message2');
// 2.注册事件，失去焦点
password.onblur = function() {
  // 用户输入的密码长度password.value.length
  if (this.value.length < 6 || this.value.length > 16) {
    message2.className = 'message2 wrong';
    message2.innerHTML = '您输入的位数不是6~16位';
  } else {
    message2.className = 'message2 right';
    // message2.innerHTML = '输入正确';
  }
}


// 用户名提示
var username = document.querySelector('.username');
var message1 = document.querySelector('.message1');
// 用户跳过用户名输入框时出现提示
username.onblur = function() {
  // 用户输入的用户名长度username.value.length
  if (this.value.length < 1) {
    message1.className = 'message2 wrong';
    message1.innerHTML = '请输入用户名';
  } else {
    message1.className = 'message2 right';
    // message1.innerHTML = 'OK';
  }
}
