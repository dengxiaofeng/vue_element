/*
* @Author: xiaoc
* @Date:   2018-06-19 11:24:17
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-02 09:25:27
*/
const user = {
    state: {
        userInfo: {},
        permission: {},
        roles: [],
        menu: [],
        menuAll: [],
        token: getStore({ name: 'token' }) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit, state, dispatch }, userInfo) {
            const user = encryption({
                data: userInfo,
                type: 'Aes',
                key: 'avue',
                param: ['useranme', 'password']
            });
            return new Promise((resolve, reject) => {
                loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
                    const data = res.data;
                    let token = "091bba44-e8c6-4119-bd27-55730930586b";
                    commit('SET_TOKEN', token);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    setToken(token);
                    resolve();
                })
            })
        },
        //根据手机号登录
        LoginByPhone({ commit, state, dispatch }, userInfo) {
            return new Promise((resolve, reject) => {
               loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    setToken(data);
                    resolve();
                })
            })
        },
        GetTableData({ commit, state, dispatch }, page) {
            return new Promise((resolve, reject) => {
               getTableData(page).then(res => {
                    const data = res.data;
                    resolve(data);
                })
            })
        },
        GetUserInfo({ commit, state, dispatch }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data;
                    console.log(data)
                    commit('SET_USERIFNO', data.userInfo);
                    commit('SET_ROLES', data.roles);
                    commit('SET_PERMISSION', data.permission)
                    resolve(data);
                })
            })
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                getMenu(parentId).then((res) => {
                    const data = res.data;
                    commit('SET_MENU', data);
                    resolve(data);
                })
            })
        },
        //获取全部菜单
        GetMenuAll({ commit }) {
            return new Promise(resolve => {
                getMenuAll().then((res) => {
                    const data = res.data;
                    commit('SET_MENU_ALL', data);
                    resolve(data);
                })
            })
        },

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menu) => {
            const list = menu.filter(ele => {
                if (validatenull(ele.meta)) return true;
                if (validatenull(ele.meta.roles)) return true;
                if (ele.meta.roles.indexOf(state.roles[0]) != -1) {
                    return true;
                } else {
                    return false;
                }
            });
            state.menu = list;
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}