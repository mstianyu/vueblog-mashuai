import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import signin from '../components/admin/signin.vue'
import sidebar from '../components/sidebar.vue'
import article from '../components/admin/article.vue'
import about from '../components/about.vue'
import articleDetail from '../components/articleDetail.vue'
import articleList from '../components/admin/articleList.vue'
import articleEdit from '../components/admin/articleEdit.vue'


export default new Router({
  routes: [
    {path: '/', components: {default: article, sidebar: sidebar}},
    {path: '/article', components: {default: article, sidebar: sidebar}},
    {path: '/about', components: {default: about, sidebar: sidebar}},
    {path: '/articleDetail/:id', components: {default: articleDetail, sidebar: sidebar}},
    {path: '/admin/articleList', components: {default: articleList, sidebar: sidebar}},
    {path: '/admin/articleEdit', component: articleEdit},
    {path: '/admin/articleEdit/:id', component: articleEdit},
    {path: '/admin/signin', component: signin}
  ]
})
