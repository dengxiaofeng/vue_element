/*
* @Author: xiaoc
* @Date:   2018-06-19 16:58:57
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 16:59:07
*/
 const getUserData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: userTableData });
    })
}

 const getRoleData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: roleTableData });
    })
}

 const getDic = (type) => {
    return new Promise((resolve, reject) => {
        resolve({ data: DIC[type] });
    })
}