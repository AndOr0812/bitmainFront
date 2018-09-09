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

function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  }
  else {
    return getComputedStyle(obj, false)[name];
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
