import Vue from 'vue'
import Router from 'vue-router'
import BigVSquare from '../pages/BigVSquare'
import MyPage from '../pages/MyPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/bigVSquare',
      name: 'BigVSquare',
      component: BigVSquare
    },
    {
      path: '/myPage',
      name: 'MyPage',
      component: MyPage
    }

  ]
})
