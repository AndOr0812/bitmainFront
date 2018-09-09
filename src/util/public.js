// 防抖
export function _debounce(fn, delay) {

  var delay = delay || 200;
  var timer;
  return function () {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
// 节流
export function _throttle(fn, interval) {
  var last;
  var timer;
  var interval = interval || 200;
  return function () {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  }
}

//运动框架
export function _startMove(obj, attr, iTarget) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var cur = 0;

    if (attr == 'opacity') {
      cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
    }
    else {
      cur = parseInt(getStyle(obj, attr));
    }

    var speed = (iTarget - cur) / 6;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

    if (cur == iTarget) {
      clearInterval(obj.timer);
    }
    else {
      if (attr == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
        obj.style.opacity = (cur + speed) / 100;

        document.getElementById('txt1').value = obj.style.opacity;
      }
      else {
        obj.style[attr] = cur + speed + 'px';
      }
    }
  }, 30);
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  }else if(element.currentStyle){
    target = element.currentStyle[attr];
  }else{
    target = document.defaultView.getComputedStyle(element,null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;

  document.body.addEventListener('scroll',() => {
    loadMore();
  }, false)
  //运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart',() => {
    height = element.offsetHeight;
    setTop = element.offsetTop;
    paddingBottom = getStyle(element,'paddingBottom');
    marginBottom = getStyle(element,'marginBottom');
  },{passive: true})

  //运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove',() => {
    loadMore();
  },{passive: true})

  //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend',() => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  },{passive: true})

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        loadMore();
        moveEnd();
      }else{
        cancelAnimationFrame(requestFram);
        //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight;
        loadMore();
      }
    })
  }

  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback();
    }
  }
}

