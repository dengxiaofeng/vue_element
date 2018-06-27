/*
* @Author: xiaoc
* @Date:   2018-06-19 12:10:31
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 12:10:38
*/
const admin = {
    state: {

    },
    actions: {
        GetUserData({ commit, state, dispatch }, page) {
            return new Promise((resolve, reject) => {
                getUserData(page).then(res => {
                    const data = res.data;
                    resolve(data);
                })
            })
        },
        GetRoleData({ commit, state, dispatch }, page) {
            return new Promise((resolve, reject) => {
                getRoleData(page).then(res => {
                    const data = res.data;
                    resolve(data);
                })
            })
        },

    },
    mutations: {

    }

}