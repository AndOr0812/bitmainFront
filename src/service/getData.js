import fetch from '../config/fetch'

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('http://api.map.baidu.com/telematics/v3/weather', {
  location: '湖南'
});
