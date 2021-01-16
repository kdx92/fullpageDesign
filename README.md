# Fullpage

Fullpage可以使用原生js实现，主要使用mousewheel事件，判断上滚还是下滚，之后设置每次滚动的高度为屏幕的高度，但是兼容性很差。

fullpage.js是一个基于jQuery的插件。

https://github.com/alvarotrigo/fullPage.js

https://www.dowebok.com/demo/2014/77/

1.固定点位写在fullpage外；
  svg在fullpage前时会由于定位的覆盖，导致图标消失，所以要使用z-index，加大层级；

2.搜索框在屏幕加载完成的动画后才会出现，使用到了回调函数
