import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'  //从cookie中获取token
import getPageTitle from '@/utils/getPageTitle' //获取网页名称

//白名单，不需要验证token
const whiteList = ['/', '/LoginRegister', '/AskingWall']
//因为动态路由，需要正则匹配的名单
const whiteList2 = ['/Classification', '/CommodityDetail']

router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()
    document.title = getPageTitle(to.meta.title)
    console.log(to)

    if(hasToken) {
        if(to.path === '/LoginRegister') {
            next({ path: '/' })
        } else {
            const hasRoles = store.get.roles && store.get.roles.length > 0
            if(hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await store.dispatch('user/getInfo')
                } catch (error) {
                    await store.dispatch('user/resetToken')
                }
            }
        }
    } else {
        if(whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            const isWhite = whiteList2.some(value => {
                return to.path.match(value)
            })
            if(isWhite) {
                next()
            } else {
                next({name:'LoginRegister',params:{select:'login',redirect:to.path}})
            }
        } 
        
    }
})