import router from './index'
import store from '../store'
import {getToken} from '../utils/token'

router.beforeEach(async(to, from , next) => {
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next('/')
        } else {
            const hasRoles = store.state.roles && store.state.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                store.commit('setRoles', 'admin')
                const routes = await store.dispatch('getRoutes')
                router.addRoutes(routes)
                next({...to, replace: true})
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})