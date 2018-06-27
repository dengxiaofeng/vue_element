/*
* @Author: xiaoc
* @Date:   2018-06-19 11:27:22
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-02 09:21:54
*/
 const loginByUsername = (username, password, code, redomStr) => {
    /**
     * 模拟请求
     */
    return new Promise((resolve, reject) => {
        resolve({ data: new Date().getTime() });
    })

   /* let prefix=":";
        let params = new URLSearchParams();
        params.append('scope', 'read');
        params.append('grant_type', 'password');
        params.append('username',username);
        params.append('password',password);
        let token=base64.encode(username+prefix+password);
        axios({
           method:'POST',
           url: baseUrl+'/oauth/token',
           headers: { 
               "Authorization": "Basic "+ token,
               "Content-Type": 'application/x-www-form-urlencoded'
           },
           data:params
        }).then ((response) => {
          resolve({ data:response.data });
        }).catch ((error) => {
           console.log (error)
        })*/
}

 const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: userInfo });
    })
}
 const getMenu = (parentId) => {
    return new Promise((resolve, reject) => {
        if (parentId != 1) parentId = 0;
        resolve({ data: menu[parentId] });
    })
}
 const getMenuAll = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: menu[0] });
    })
}

 const getTableData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: tableData });
    })
}
 const logout = () => {
    return new Promise((resolve, reject) => {
        resolve();
    })
}
