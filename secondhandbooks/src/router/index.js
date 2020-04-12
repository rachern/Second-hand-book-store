import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    //首页
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    //登录注册页
    path: '/LoginRegister',
    name: 'LoginRegister',
    props: true,
    component: () => import('../views/LoginRegister.vue'),
    meta: {title: '登录注册'}
  },
  {
    //购物车页面
    path: '/ShoppingCart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue'),
    meta: {title: '我的购物车'}
  },
  {
    //书籍列表展示页
    path: '/Classification/:id',
    name: 'Classification',
    component: () => import('../views/Classification.vue'),
    meta: {name: 'Classification'}
  },
  {
    //商品详情页
    path: '/CommodityDetail/:id',
    name: 'CommodityDetail',
    component: () => import('../views/CommodityDetail.vue'),
    meta: {name: 'CommodityDetail'}
  },
  {
    //征书墙
    path: '/AskingWall',
    name: 'AskingWall',
    component: () => import('../views/AskingWall.vue'),
    children: [
      {
        //征书信息
        path: '',
        component: () => import('../components/askingWall/askingWall_askingMessage.vue'),
        meta: {name: 'AskingWall',title: '征书墙'}
      },
      {
        //发布征书信息
        path: 'postMessage',
        name: 'postMessage',
        component: () => import('../components/askingWall/askingWall_postMessage.vue'),
        meta: {title: '发布证书信息'}
      }
    ]
  },
  {
    //书籍竞拍
    path: '/BookAuction',
    name: 'BookAuction',
    component: () => import('../views/BookAuction.vue'),
    meta: {title: "书籍竞拍"}
  },
  {
    //发布书籍信息
    path: '/PublishBook',
    name: 'PublishBook',
    component: () => import('../views/PublishBook.vue'),
    meta: {title: '发布书籍信息'}
  },
  {
    //个人中心
    path: '/PersonalCenter',
    name: 'PersonalCenter',
    component: () => import('../views/PersonalCenter'),
    children: [
      {
        //首页
        path: '',
        component: () => import('../components/personalCenter/home/personalCenter_home'),
        meta: {title: '个人中心'}
      },
      {
        //订单页
        path: 'order/:type',
        name: 'order',
        component: () => import('../components/personalCenter/home/personalCenter_order'),
        meta: {name: 'order',title: '我的订单'}
      },
      {
        //我的发布
        path: 'myPublish',
        meta: {title: '我的发布'}
      },
      {
        //我的收藏
        path: 'myCollection',
        meta: {title: '我的收藏'}
      },
      {
        //我的竞拍
        path: 'myAuction',
        meta: {title: '我的竞拍'}
      },
      {
        //我的征书
        path: 'myAskingBook',
        meta: {title: '我的征书'}
      },
      {
        //账户设置
        path: 'accountSettings',
        name: 'accountSettings',
        component: () => import('../components/personalCenter/accountSettings/personalCenter_accountSettings'),
        redirect: 'accountSettings/changePassword',
        children: [
          {
            //修改密码
            path: 'changePassword',
            name: 'changePassword',
            component: () => import('../components/personalCenter/accountSettings/personalCenter_changePassword'),
            meta: {title: '修改密码'}
          },
          {
            //个人信息
            path: 'personalInformation',
            name: 'personalInformation',
            component: () => import('../components/personalCenter/accountSettings/personalCenter_personalInformation'),
            meta: {title: '个人信息'}
          },
          {
            //收货地址
            path: 'address',
            name: 'address',
            component: () => import('../components/personalCenter/accountSettings/personalCenter_address'),
            meta: {title: '收货地址'}
          }
        ]
      },
      {
        //消息
        path: 'message',
        name: 'message',
        component: () => import('../components/personalCenter/message/personalCenter_message'),
        redirect: 'message/systemMessage',
        children: [
          {
            //系统消息
            path: 'systemMessage',
            name: 'systemMessage',
            component: () => import('../components/personalCenter/message/personalCenter_systemMessage'),
            meta: {title: '系统消息'}
          },
          {
            //互动消息
            path: 'interactiveMessage',
            name: 'interactiveMessage',
            component: () => import('../components/personalCenter/message/personalCenter_interactiveMessage'),
            meta: {title: '互动消息'}
          }
        ]
      }
    ]
  },
  {
    //后台管理
    path: '/Admin',
    name: 'Admin',
    component: () => import('../views/Admin')
  }
]

const router = new VueRouter({
  routes
})

export default router
