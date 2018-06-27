/*
* @Author: xiaoc
* @Date:   2018-06-19 17:11:11
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 21:14:48
*/
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const lockPage = store.getters.website.lockPage;
router.beforeEach((to, from, next) => {
   NProgress.start() 
  if (store.getters.token) { 
    /* has token*/
    if (store.getters.isLock && to.path != lockPage) {
      next({
        path: lockPage
      })
      NProgress.done();
    } else if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles
          next({ ...to,
            replace: true
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({
              path: '/login'
            })
            NProgress.done();
          })
        })
      } else {
        let flag = true;
        const whiteList = store.getters.website.whiteList
        for (let i = 0; i < whiteList.length; i++) {
          if (new RegExp("^" + whiteList[i].toString() + ".*", "g").test(to.path)) {
            flag = false;
            break;
          }
        }
        if (flag) {
          const value = to.query.src ? to.query.src : to.path;
          const label = to.query.name ? to.query.name : to.name;
          store.commit('ADD_TAG', {
            label: label,
            value: value,
            query: to.query
          });
        }
        next()
      }
    }
  } else {
    /* has no token*/
    let flag = true;
    const whiteList = store.getters.website.whiteList
    for (let i = 0; i < whiteList.length; i++) {
      if (new RegExp("^" + whiteList[i].toString() + ".*", "g").test(to.path)) {
        flag = false;
        break;
      }
    }
    if (!flag) {
      next()
    } else {
      next('/login')
      NProgress.done();
    }
  }
})

//寻找子菜单的父类
function findMenuParent(tag) {
  let tagCurrent = [];
  const menu = store.getters.menu;
  tagCurrent.push(tag);
  return tagCurrent;

}
router.afterEach((to, from) => {
  NProgress.done();
  setTimeout(() => {
    const tag = store.getters.tag;
    setTitle(tag.label);
    store.commit('SET_TAG_CURRENT', findMenuParent(tag));
    //百度统计代码
    var _hmt = _hmt || [];
    (function () {
      //每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?23c7f40fa073fadc2a7f8bfe079fd17f";
      hm.id = "baidu_tj"
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-105756702-2');
  }, 0);
})