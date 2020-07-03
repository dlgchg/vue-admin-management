# vue-admin-management
 
学习Vue路由在登录权限中动态配置路由选项

在router中创建一个默认路由和一个异步路由,路由中的meta属性配置roles属性,roles中决定使用匹配使用者.

```json
{
    meta: { title: "e", roles: ["admin", "editor"] }
}
```

在路由导航守卫中进行权限判断,分配路由.
根据cookie判断用户是否登录,登录后进行用户权限筛选匹配路由

```JavaScript
const routes = await store.dispatch('getRoutes')
router.addRoutes(routes)
next({...to, replace: true})
```