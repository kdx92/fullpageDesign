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

// 按钮
;/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
      return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
      return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
      var docElem, win,
          box = {top: 0, left: 0},
          doc = elem && elem.ownerDocument;

      docElem = doc.documentElement;

      if (typeof elem.getBoundingClientRect !== typeof undefined) {
          box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
          top: box.top + win.pageYOffset - docElem.clientTop,
          left: box.left + win.pageXOffset - docElem.clientLeft
      };
  }

  function convertStyle(obj) {
      var style = '';

      for (var a in obj) {
          if (obj.hasOwnProperty(a)) {
              style += (a + ':' + obj[a] + ';');
          }
      }

      return style;
  }

  var Effect = {

      // Effect delay
      duration: 750,

      show: function(e, element) {

          // Disable right click
          if (e.button === 2) {
              return false;
          }

          var el = element || this;

          // Create ripple
          var ripple = document.createElement('div');
          ripple.className = 'waves-ripple';
          el.appendChild(ripple);

          // Get click coordinate and element witdh
          var pos         = offset(el);
          var relativeY   = (e.pageY - pos.top);
          var relativeX   = (e.pageX - pos.left);
          var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

          // Support for touch devices
          if ('touches' in e) {
            relativeY   = (e.touches[0].pageY - pos.top);
            relativeX   = (e.touches[0].pageX - pos.left);
          }

          // Attach data to element
          ripple.setAttribute('data-hold', Date.now());
          ripple.setAttribute('data-scale', scale);
          ripple.setAttribute('data-x', relativeX);
          ripple.setAttribute('data-y', relativeY);

          // Set ripple position
          var rippleStyle = {
              'top': relativeY+'px',
              'left': relativeX+'px'
          };

          ripple.className = ripple.className + ' waves-notransition';
          ripple.setAttribute('style', convertStyle(rippleStyle));
          ripple.className = ripple.className.replace('waves-notransition', '');

          // Scale the ripple
          rippleStyle['-webkit-transform'] = scale;
          rippleStyle['-moz-transform'] = scale;
          rippleStyle['-ms-transform'] = scale;
          rippleStyle['-o-transform'] = scale;
          rippleStyle.transform = scale;
          rippleStyle.opacity   = '1';

          rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
          rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
          rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
          rippleStyle['transition-duration']         = Effect.duration + 'ms';

          rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

          ripple.setAttribute('style', convertStyle(rippleStyle));
      },

      hide: function(e) {
          TouchHandler.touchup(e);

          var el = this;
          var width = el.clientWidth * 1.4;

          // Get first ripple
          var ripple = null;
          var ripples = el.getElementsByClassName('waves-ripple');
          if (ripples.length > 0) {
              ripple = ripples[ripples.length - 1];
          } else {
              return false;
          }

          var relativeX   = ripple.getAttribute('data-x');
          var relativeY   = ripple.getAttribute('data-y');
          var scale       = ripple.getAttribute('data-scale');

          // Get delay beetween mousedown and mouse leave
          var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
          var delay = 350 - diff;

          if (delay < 0) {
              delay = 0;
          }

          // Fade out ripple after delay
          setTimeout(function() {
              var style = {
                  'top': relativeY+'px',
                  'left': relativeX+'px',
                  'opacity': '0',

                  // Duration
                  '-webkit-transition-duration': Effect.duration + 'ms',
                  '-moz-transition-duration': Effect.duration + 'ms',
                  '-o-transition-duration': Effect.duration + 'ms',
                  'transition-duration': Effect.duration + 'ms',
                  '-webkit-transform': scale,
                  '-moz-transform': scale,
                  '-ms-transform': scale,
                  '-o-transform': scale,
                  'transform': scale,
              };

              ripple.setAttribute('style', convertStyle(style));

              setTimeout(function() {
                  try {
                      el.removeChild(ripple);
                  } catch(e) {
                      return false;
                  }
              }, Effect.duration);
          }, delay);
      },

      // Little hack to make <input> can perform waves effect
      wrapInput: function(elements) {
          for (var a = 0; a < elements.length; a++) {
              var el = elements[a];

              if (el.tagName.toLowerCase() === 'input') {
                  var parent = el.parentNode;

                  // If input already have parent just pass through
                  if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                      continue;
                  }

                  // Put element class and style to the specified parent
                  var wrapper = document.createElement('i');
                  wrapper.className = el.className + ' waves-input-wrapper';

                  var elementStyle = el.getAttribute('style');

                  if (!elementStyle) {
                      elementStyle = '';
                  }

                  wrapper.setAttribute('style', elementStyle);

                  el.className = 'waves-button-input';
                  el.removeAttribute('style');

                  // Put element as child
                  parent.replaceChild(wrapper, el);
                  wrapper.appendChild(el);
              }
          }
      }
  };


  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
      /* uses an integer rather than bool so there's no issues with
       * needing to clear timeouts if another touch event occurred
       * within the 500ms. Cannot mouseup between touchstart and
       * touchend, nor in the 500ms after touchend. */
      touches: 0,
      allowEvent: function(e) {
          var allow = true;

          if (e.type === 'touchstart') {
              TouchHandler.touches += 1; //push
          } else if (e.type === 'touchend' || e.type === 'touchcancel') {
              setTimeout(function() {
                  if (TouchHandler.touches > 0) {
                      TouchHandler.touches -= 1; //pop after 500ms
                  }
              }, 500);
          } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
              allow = false;
          }

          return allow;
      },
      touchup: function(e) {
          TouchHandler.allowEvent(e);
      }
  };


  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
      if (TouchHandler.allowEvent(e) === false) {
          return null;
      }

      var element = null;
      var target = e.target || e.srcElement;

      while (target.parentElement !== null) {
          if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
              element = target;
              break;
          } else if (target.classList.contains('waves-effect')) {
              element = target;
              break;
          }
          target = target.parentElement;
      }

      return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
      var element = getWavesEffectElement(e);

      if (element !== null) {
          Effect.show(e, element);

          if ('ontouchstart' in window) {
              element.addEventListener('touchend', Effect.hide, false);
              element.addEventListener('touchcancel', Effect.hide, false);
          }

          element.addEventListener('mouseup', Effect.hide, false);
          element.addEventListener('mouseleave', Effect.hide, false);
      }
  }

  Waves.displayEffect = function(options) {
      options = options || {};

      if ('duration' in options) {
          Effect.duration = options.duration;
      }

      //Wrap input inside <i> tag
      Effect.wrapInput($$('.waves-effect'));

      if ('ontouchstart' in window) {
          document.body.addEventListener('touchstart', showEffect, false);
      }

      document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function(element) {
      //FUTURE: automatically add waves classes and allow users
      // to specify them with an options param? Eg. light/classic/button
      if (element.tagName.toLowerCase() === 'input') {
          Effect.wrapInput([element]);
          element = element.parentElement;
      }

      if ('ontouchstart' in window) {
          element.addEventListener('touchstart', showEffect, false);
      }

      element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener('DOMContentLoaded', function() {
      Waves.displayEffect();
  }, false);

})(window);
;Materialize.toast = function (message, displayLength, className, completeCallback) {
  className = className || "";

  var container = document.getElementById('toast-container');

  // Create toast container if it does not exist
  if (container === null) {
      // create notification container
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
  }

  // Select and append toast
  var newToast = createToast(message);

  // only append toast if message is not undefined
  if(message){
      container.appendChild(newToast);
  }

  newToast.style.top = '35px';
  newToast.style.opacity = 0;

  // Animate toast in
  Vel(newToast, { "top" : "0px", opacity: 1 }, {duration: 300,
    easing: 'easeOutCubic',
    queue: false});

  // Allows timer to be pause while being panned
  var timeLeft = displayLength;
  var counterInterval;
  if (timeLeft != null)  {
    counterInterval = setInterval (function(){
      if (newToast.parentNode === null)
        window.clearInterval(counterInterval);

      // If toast is not being dragged, decrease its time remaining
      if (!newToast.classList.contains('panning')) {
        timeLeft -= 20;
      }

      if (timeLeft <= 0) {
        // Animate toast out
        Vel(newToast, {"opacity": 0, marginTop: '-40px'}, { duration: 375,
            easing: 'easeOutExpo',
            queue: false,
            complete: function(){
              // Call the optional callback
              if(typeof(completeCallback) === "function")
                completeCallback();
              // Remove toast after it times out
              this[0].parentNode.removeChild(this[0]);
            }
          });
        window.clearInterval(counterInterval);
      }
    }, 20);
  }
};


// 正则表达式验证手机号
// 手机号11位且以1开头
window.onload = function() {
  var regtel = /^1[3|4|5|6|7|8]\d{9}$/;
  var regqq = /^[1-9]\d{4,}$/; //从10000开始
  var tel = document.querySelector('#tel');
  var qq = document.querySelector('#qq');
  regexp(tel, regtel);
  regexp(qq, regqq);
  function regexp(ele, reg) {
    ele.onblur = function() {
      if (reg.test(this.value)) {
        // console.log('正确的');
        this.nextElementSibling.className = 'right';
        this.nextElementSibling.innerHTML = '<i class = "success_icon"></i>正确';
      } else {
        // console.log('不正确');
        this.nextElementSibling.className = 'wrong';
        this.nextElementSibling.innerHTML = '<i class = "error_icon"></i>不正确';
      }
    }
  }
}
// input
// span class = ""
