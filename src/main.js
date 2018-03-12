import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import router from './router'
import App from './App.vue'



Vue.prototype.$axios= axios
Vue.use(Vuex);
// 按需引用element
import { Button, Message, MessageBox, Notification, Popover, Tag, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [Button, Message, MessageBox, Notification, Popover, Tag, Input]

components.forEach((item) => {
  Vue.component(item.name, item)
})

const MsgBox = MessageBox
Vue.prototype.$msgbox = MsgBox
Vue.prototype.$alert = MsgBox.alert
Vue.prototype.$confirm = MsgBox.confirm
Vue.prototype.$prompt = MsgBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification


const store = new Vuex.Store({
  state: {
    login:false,
   articleNumber:0
  },
  mutations: {
    //更新用户信息
    islogin(state, islogin) {
      state.login = islogin;
    },
    articleNumbers(state,Number){
      state.articleNumber =Number;
    }
  }
});


new Vue({
  el: '#app',
  store,
  router,
  mounted(){
    this.checkLogin();
    this.getCartCount();
  },
  template: '<App/>',
  //render: h => h(App),
  components: { App }
});//.$mount('#app')