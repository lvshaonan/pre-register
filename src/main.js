// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./common/styles/index.scss"

Vue.config.productionTip = false

let enter = localStorage.getItem('xiaohei_index_enter');

if(enter == null){
  console.log(111);
  localStorage.setItem('xiaohei_index_enter', 0);
  router.beforeEach((to, from, next) => {
    if (document.URL.indexOf('index.html?t=') < 0) {
      let timestamp = (new Date()).valueOf()
      window.location.href = '/?t=' + timestamp + '#' + to.fullPath
      next();
    }
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
