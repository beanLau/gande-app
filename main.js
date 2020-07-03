import Vue from 'vue'
import App from './App'
import store from './store'
import tui from './common/httpRequest'

import home from './pages/home/index.vue'
Vue.component('home',home)

import archives from './pages/archives/index.vue'
Vue.component('archives',archives)

import updown from './pages/updown/index.vue'
Vue.component('updown',updown)

import build from './pages/build/index.vue'
Vue.component('build',build)

import my from './pages/my/index.vue'
Vue.component('my',my)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
