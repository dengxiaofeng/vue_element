/*
* @Author: xiaoc
* @Date:   2018-06-16 11:27:35
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 21:51:32
*/

const second = [{
  id: 23,
  label: "环境变量",
  icon: 'icon-dongtai',
  href: '/dev/index',
  meta: {

  },
  children: []
}, {
  id: 14,
  label: "数据展示",
  href: '/exhibition/index',
  icon: 'icon-shujuzhanshi2',
  children: [],
},{
  id: 9,
  label: "系统管理",
  icon: 'icon-liuliangyunpingtaitubiao08',
  meta: {

  },
  children: [{
      id: 20,
      label: "用户管理",
      href: '/admin/user',
      icon: 'icon-yonghuguanli',
      children: []
    }, {
      id: 21,
      label: "角色管理",
      href: '/admin/role',
      icon: 'icon-jiaoseguanli',
      children: []
    },
    {
      id: 22,
      label: "菜单管理",
      href: '/admin/menu',
      icon: 'icon-caidanguanli',
      children: []
    }
  ]
},{
  id: 6,
  label: "表格&表单",
  href: '',
  icon: 'icon-biaoge',
  meta: {},
  children: [{
    id: 16,
    label: "表格",
    href: '/table/index',
    query: {
      a: 1
    },
    icon: 'icon-biaoge',
    meta: {},
    children: []
  }, {
    id: 9,
    label: "生成器",
    href: `/table/generator`,
    icon: 'icon-huanyingye',
    meta: {},
    children: []
  }, {
    id: 9,
    label: "表单",
    href: '/forms/index',
    query: {
      a: 1
    },
    icon: 'icon-biaodan',
    meta: {},
    children: []
  }]
}]

const menu = [second];
