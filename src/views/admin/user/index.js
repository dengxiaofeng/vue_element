/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 22:03:30
*/
const User = function(resolve, reject) {
$.get('src/views/admin/user/index.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
             tableOption: {}, //表格设置属性
             tableData: [], //表格的数据
             tablePage: 1,
             tableLoading: false,
             tabelObj: {},
             page: {
               total: 0, //总页数
               currentPage: 1, //当前页数
               pageSize: 10 //每页显示多少条
             },
             grade: {
               box: false,
               check: []
             }
          }
       },
       created() {
         //初始化数据格式
         this.tableOption = userOption;
         this.handleList();
         this.$store.dispatch('GetMenuAll').then(data => {})
       },
       watch: {},
       mounted() {},
       computed: {
       	   permission:function () {
       	   	 return this.$store.getters.permission
       	   },
       	   menuAll:function() {
       	   	 return this.$store.getters.menuAll
       	   }
       },
       props: [],
       methods: {
          findByvalue(dic, value) {
            return this.$refs.crud.findByvalue(dic, value);
          },
          handleAdd() {
            this.$refs.crud.rowAdd();
          },
          handleList() {
            this.tableLoading = true;
            this.$store
            .dispatch("GetUserData", { page: `${this.tablePage}` })
            .then(data => {
               setTimeout(() => {
                 this.tableData = data.tableData;
                 this.page = {
                   total: data.total,
                   pageSize: data.pageSize
                 };
                 this.tableLoading = false;
               }, 1000);
            });
         },
         handleSave(row, done) {
           this.tableData.push(row);
           this.$message({
             showClose: true,
             message: "添加成功",
             type: "success"
           });
           done();
         },
         handleDel(row, index) {
           this.$confirm(`是否确认删除序号为${row.name}`, "提示", {
             confirmButtonText: "确定",
             cancelButtonText: "取消",
             type: "warning"
           })
             .then(() => {
               this.tableData.splice(index, 1);
               this.$message({
                 showClose: true,
                 message: "删除成功",
                 type: "success"
               });
             })
             .catch(err => {});
         },
         handleUpdate(row, index, done) {
            this.tableData.splice(index, 1, row);
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            done();
         }
       }
    })
  })
}