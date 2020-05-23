import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'  //从cookie中获取token
import getPageTitle from '@/utils/getPageTitle' //获取网页名称

//白名单，不需要验证token
const whiteList = ['/', '/LoginRegister', '/AskingWall']
//因为动态路由，需要正则匹配的名单
const whiteList2 = ['/Classification', '/CommodityDetail', '/FindBooksResult']

router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()
    document.title = getPageTitle(to.meta.title)
    console.log(to)

    //判断token是否存在
    if(hasToken) {
        if(to.path === '/LoginRegister') {
            next({ path: '/' })
        } else {
            //判断角色是否存在
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            // debugger
            if(hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await store.dispatch('user/getInfo')
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    router.addRoutes(accessRoutes)
                    // console.log(roles)
                    // this.$socket.emit('username', username)
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next({name:'LoginRegister',params:{select:'login',redirect:to.path}})
                }
            }
        }
    } else {
        //token不存在，判断路由是否在白名单
        if(whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            const isWhite = whiteList2.some(value => {
                return to.path.match(value)
            })
            if(isWhite) {
                next()
            } else {
                //路由不在白名单，说明需要token，跳转到登录页
                next({name:'LoginRegister',params:{select:'login',redirect:to.path}})
            }
        } 
    }
})