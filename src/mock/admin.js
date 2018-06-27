/*
* @Author: xiaoc
* @Date:   2018-06-16 11:27:27
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 11:38:10
*/
let userList = []
for (let i = 0; i < 2; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    name: Mock.mock('@cname'),
    username: Mock.mock('@last'),
    ueditor: `<h3>${Mock.mock('@cname')}<h3>`,
    grade: [0, 1],
    state: 0,
    date: dateFormat(new Date()),
  }))
}
const userTableData = {
  total: 11,
  pageSize: 10,
  tableData: userList
};


let roleList = []
for (let i = 0; i < 2; i++) {
  roleList.push(Mock.mock({
    id: '@increment',
    name: Mock.mock('@cname'),
    date: dateFormat(new Date()),
    check: [1, 3, 5]
  }))
}
const roleTableData = {
  total: 11,
  pageSize: 10,
  tableData: roleList
};
