import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export const constantRoutes = [
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
    //书籍列表展示页
    path: '/Classification/:id',
    name: 'Classification',
    component: () => import('../views/Classification.vue'),
    meta: {name: 'Classification'}
  },
  {
    //书籍搜索结果页
    path: '/FindBooksResult/:query',
    name: 'FindBooksResult',
    component: () => import('../views/FindBooksResult'),
    meta: {name: 'FindBooksResult',title: '书籍搜索结果'}
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
      }
    ]
  }
]

export const asyncRoutes = [
  {
    //购物车页面
    path: '/ShoppingCart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue'),
    meta: {title: '我的购物车', roles: ['user', 'admin', 'superAdmin']}
  },
  {
    //征书墙
    path: '/AskingWall',
    name: 'AskingWall',
    component: () => import('../views/AskingWall.vue'),
    meta: {roles: ['user', 'admin', 'superAdmin']},
    children: [
      {
        //征书信息
        path: '',
        component: () => import('../components/askingWall/askingWall_askingMessage.vue'),
        meta: {name: 'AskingWall',title: '征书墙', roles:['user', 'admin', 'superAdmin']}
      },
      {
        //发布征书信息
        path: 'postMessage',
        name: 'postMessage',
        component: () => import('../components/askingWall/askingWall_postMessage.vue'),
        meta: {title: '发布证书信息', roles:['user', 'admin', 'superAdmin']}
      }
    ]
  },
  // {
  //   //书籍竞拍
  //   path: '/BookAuction',
  //   name: 'BookAuction',
  //   component: () => import('../views/BookAuction.vue'),
  //   meta: {title: "书籍竞拍"}
  // },
  {
    //发布书籍信息
    path: '/PublishBook',
    name: 'PublishBook',
    component: () => import('../views/PublishBook.vue'),
    meta: {title: '发布书籍信息', roles:['user', 'admin', 'superAdmin']}
  },
  {
    //个人中心
    path: '/PersonalCenter',
    name: 'PersonalCenter',
    component: () => import('../views/PersonalCenter'),
    meta: {roles:['user', 'admin', 'superAdmin']},
    children: [
      {
        //首页
        path: '',
        component: () => import('../components/personalCenter/home/personalCenter_home'),
        meta: {title: '个人中心', roles:['user', 'admin', 'superAdmin']}
      },
      {
        //订单页
        path: 'order/:type',
        name: 'order',
        component: () => import('../components/personalCenter/home/personalCenter_order'),
        meta: {name: 'order',title: '我的订单', roles:['user', 'admin', 'superAdmin']}
      },
      {
        // 订单详情
        path: 'orderDetail/:id',
        name: 'orderDetail',
        component: () => import('../components/personalCenter/home/orderDetail'),
        meta: {name: 'orderDetail', title: '订单详情', roles:['user', 'admin', 'superAdmin']}
      },
      {
        //我的发布
        path: 'myPublish',
        name: 'myPublish',
        component: () => import('../components/personalCenter/myPublish'),
        meta: {title: '我的发布', name: 'myPublish', roles:['user', 'admin', 'superAdmin']}
      },
      {
        //我的收藏
        path: 'myCollection',
        name: 'myCollection',
        component: () => import('../components/personalCenter/myCollection'),
        meta: {title: '我的收藏', name: 'myCollection', roles:['user', 'admin', 'superAdmin']}
      },
      // {
      //   //我的竞拍
      //   path: 'myAuction',
      //   meta: {title: '我的竞拍'}
      // },
      {
        //我的征书
        path: 'myAskingBook',
        name: 'myAskingBook',
        component: () => import('../components/personalCenter/myAskingBook'),
        meta: {title: '我的征书', name: 'myAskingBook', roles:['user', 'admin', 'superAdmin']}
      },
      {
        //账户设置
        path: 'accountSettings',
        name: 'accountSettings',
        component: () => import('../components/personalCenter/accountSettings/personalCenter_accountSettings'),
        redirect: 'accountSettings/changePassword',
        meta: {roles:['user', 'admin', 'superAdmin']},
        children: [
          {
            //修改密码
            path: 'changePassword',
            name: 'changePassword',
            component: () => import('../components/personalCenter/accountSettings/personalCenter_changePassword'),
            meta: {title: '修改密码', roles:['user', 'admin', 'superAdmin']}
          },
          {
            //个人信息
            path: 'personalInformation',
            name: 'personalInformation',
            component: () => import('../components/personalCenter/accountSettings/personalCenter_personalInformation'),
            meta: {title: '个人信息', roles:['user', 'admin', 'superAdmin']}
          },
          {
            //收货地址
            path: 'address',
            name: 'address',
            component: () => import('../components/personalCenter/accountSettings/personalCenter_address'),
            meta: {title: '收货地址', roles:['user', 'admin', 'superAdmin']}
          }
        ]
      },
      {
        //消息
        path: 'message',
        name: 'message',
        component: () => import('../components/personalCenter/message/personalCenter_message'),
        redirect: 'message/systemMessage',
        meta: {roles:['user', 'admin', 'superAdmin']},
        children: [
          {
            //系统消息
            path: 'systemMessage',
            name: 'systemMessage',
            component: () => import('../components/personalCenter/message/personalCenter_systemMessage'),
            meta: {title: '系统消息', roles:['user', 'admin', 'superAdmin']}
          },
          {
            //互动消息
            path: 'interactiveMessage',
            name: 'interactiveMessage',
            component: () => import('../components/personalCenter/message/personalCenter_interactiveMessage'),
            meta: {title: '互动消息', roles:['user', 'admin', 'superAdmin']}
          }
        ]
      }
    ]
  },
  {
    //后台管理
    path: '/ManagementEnd',
    name: 'ManagementEnd',
    component: () => import('../views/ManagementEnd'),
    meta: {title: '管理端', roles:['admin', 'superAdmin']},
    redirect: '/ManagementEnd/messagePush',
    children: [
      {
        // 轮播图管理
        path: 'carouselMapManagement',
        name: 'carouselMapManagement',
        component: () => import('../components/managementEnd/carouselMapManagement'),
        meta: {title: '轮播图管理', roles:['superAdmin']}
      },
      {
        // 添加书籍分类
        path: 'bookClassificationManagement/add',
        name: 'addBookClassificationManagement',
        component: () => import('../components/managementEnd/addBookClassificationManagement'),
        meta: {title: '添加书籍分类', roles:['superAdmin']}
      },
      {
        // 修改书籍分类
        path: 'bookClassificationManagement/update',
        name: 'updateBookClassificationManagement',
        component: () => import('../components/managementEnd/updateBookClassificationManagement'),
        meta: {title: '修改书籍分类', roles:['superAdmin']}
      },
      {
        // 删除书籍分类
        path: 'bookClassificationManagement/delete',
        name: 'deleteBookClassificationManagement',
        component: () => import('../components/managementEnd/deleteBookClassificationManagement'),
        meta: {title: '删除书籍分类', roles:['superAdmin']}
      },
      {
        // 上架书籍审核
        path: 'bookReview/post',
        name: 'postBookReview',
        component: () => import('../components/managementEnd/postBookReview/postBookReviewList'),
        meta: {title: '上架书籍审核', name: 'postBookReview', roles:['admin', 'superAdmin']}
      },
      {
        // 书籍审核
        path: 'postBookReview/:id',
        name: 'postBookReviewById',
        component: () => import('../components/managementEnd/postBookReview/postBookReviewById'),
        meta: {title: '书籍审核', roles:['admin', 'superAdmin']}
      },
      // {
      //   // 拍卖书籍审核
      //   path: 'bookReview/auction',
      //   name: 'auctionBookReview',
      //   component: () => import('../components/managementEnd/auctionBookReview/auctionBookReviewList'),
      //   meta: {title: '拍卖书籍审核'}
      // },
      // {
      //   // 拍卖审核
      //   path: 'auctionBookReview/:id',
      //   name: 'auctionBookReviewById',
      //   component: () => import('../components/managementEnd/auctionBookReview/auctionBookReviewById'),
      //   meta: {title: '拍卖审核'}
      // },
      {
        // 用户管理
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('../components/managementEnd/userManagement/userManagement'),
        meta: {title: '用户管理', roles:['superAdmin']}
      },
      {
        // 修改用户权限
        path: 'updateRoles/:id',
        name: 'updateRoles',
        component: () => import('../components/managementEnd/userManagement/updateRoles'),
        meta: {title: '修改权限', roles:['superAdmin']}
      },
      {
        // 消息推送
        path: 'messagePush',
        name: 'messagePush',
        component: () => import('../components/managementEnd/messagePush'),
        meta: {title: '消息推送', roles:['admin', 'superAdmin']}
      },
      {
        // 订单管理
        path: 'orderManagement',
        name: 'orderManagement',
        component: () => import('../components/managementEnd/orderManagement'),
        meta: {title: '订单管理', roles:['superAdmin']}
      }
    ]
  },
  {
    // 购物流程
    path: '/ShoppingProcess',
    name: 'ShoppingProcess',
    component: () => import('../views/ShoppingProcess'),
    meta: {title: '购物流程', roles:['user', 'admin', 'superAdmin']},
    children: [
      {
        // 提交订单
        path: 'placeOrder',
        name: 'placeOrder',
        component: () => import('../components/shoppingProcess/placeOrder'),
        meta: {title: '提交订单', name: 'placeOrder', roles:['user', 'admin', 'superAdmin']}
      },
      {
        // 支付
        path: 'payment/:id',
        name: 'payment',
        component: () => import('../components/shoppingProcess/payment'),
        meta: {title: '支付', name: 'payment', roles:['user', 'admin', 'superAdmin']}
      },
      {
        // 确认收货
        path: 'confirmReceipt/:id',
        name: 'confirmReceipt',
        component: () => import('../components/shoppingProcess/confirmReceipt'),
        meta: {title: '确认收货', name: 'confirmReceipt', roles:['user', 'admin', 'superAdmin']}
      },
      {
        // 评价
        path: 'evaluate/:id',
        name: 'evaluate',
        component: () => import('../components/shoppingProcess/evaluate'),
        meta: {title: '评价', name: 'evaluate', roles:['user', 'admin', 'superAdmin']}
      }
    ]
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  router.matcher = newRouter.matcher // reset router
}

export default router
