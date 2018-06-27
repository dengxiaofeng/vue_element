/*
* @Author: xiaoc
* @Date:   2018-06-16 11:27:46
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 11:28:54
*/
 const userInfo = {
  userInfo: {
    username: 'admin',
    name: 'avue',
    avatar: 'https://gitee.com/uploads/61/632261_smallweigit.jpg',
  },
  roles: ['admin'],
  permission: [
    'sys_crud_btn_add',
    'sys_crud_btn_export',
    'sys_menu_btn_add',
    'sys_menu_btn_edit',
    'sys_menu_btn_del',
    'sys_role_btn1',
    'sys_role_btn2',
    'sys_role_btn3',
    'sys_role_btn4',
    'sys_role_btn5',
    'sys_role_btn6',
  ], //权限级别
}
let List = []
for (let i = 0; i < 5; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: Mock.mock('@cname'),
    username: Mock.mock('@last'),
    type: [0, 2],
    'number|0-100': 0,
    'sex|0-1': 0,
    "grade|1-2": true,
    address: Mock.mock('@cparagraph(1, 3)'),
    check: [1, 3, 4]
  }))
}
const tableData = {
  total: 11,
  pageSize: 10,
  tableData: List
};
