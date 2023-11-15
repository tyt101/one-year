// import的形式拆包

/**
 * import()模块以及它引用的子模块，会分离到一个单独的chunk中。一般借助import()
 * 对路由页面进行动态加载
 * 实现页面代码的拆分
 * 按需加载(
 *  路由按需加载，   component: () => import(/* webpackChunkName: "screen"*/'@/views/xxx.vue')
 *  组件懒加载，
 *  引入包时的按需加载
 * )
 */