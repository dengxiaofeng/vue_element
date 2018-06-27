/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 22:04:21
*/
const Table = function(resolve, reject) {
$.get('src/views/table/index.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
             tableSearch:{},
             tableOption: tableOption, //表格设置属性
             tableData: [], //表格的数据
             tableRow: {},
             tablePage: 1,
             tableLoading: false,
             tabelObj: {},
             formJson: "",
             user: {},
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
          this.formJson = JSON.stringify(tableOption, null, 2);
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
       	 tip() {
           this.$notify({
             message: "点击事件"
           });
         },
         formate() {
            let p = new Promise((resolve, reject) => {
              resolve(JSON.parse(this.formJson));
            });
            p.then(data => {
                this.tableOption = data;
                this.formJson = JSON.stringify(data, null, 2);
                this.$notify({
                  message: "数据加载成功",
                  type: "success"
                });
            }).catch(err => {
                this.$notify({
                  center: true,
                  dangerouslyUseHTMLString: true,
                  message: `JSON格式错误<br \>\n${err}`,
                  type: "error"
                });
            });
         },
         handleRefresh(){
            this.handleList(this.tableSearch);
         },
         handleGradeUpdate() {
            this.tabelObj.check = [].concat(this.grade.check);
            this.tabelObj = {};
            this.grade.check = [];
            this.grade.box = false;
         },
         handleGradeCheckChange(data, checked, indeterminate) {
            if (checked) {
              this.grade.check.push(data.id);
            } else {
              this.grade.check.splice(this.grade.check.indexOf(data.id), 1);
            }
         },
         handleRowEdit() {
           this.$refs.crud.rowEdit(this.tableRow, -1);
         },
         handleEdit(row, index) {
           this.$refs.crud.rowEdit(row, index);
         },
         handleGrade(row, index) {
           this.$store.dispatch("GetMenuAll").then(data => {
              this.grade.box = true;
              this.tabelObj = row;
              this.grade.check = this.tabelObj.check;
           });
         },
         formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                  if (j === "timestamp") {
                    return parseTime(v[j]);
                  } else {
                    return v[j];
                  }
                })
            );
         },
         handleCurrentChange(val) {
            this.tablePage = val;
            this.handleList();
         },
         handleSearchChange(form){
            this.tableSearch = form;
            this.$notify({
              showClose: true,
              message: JSON.stringify(this.tableSearch),
              type: "success"
            });
            this.handleList(this.tableSearch);
         },
         handleAdd() {
            this.$refs.crud.rowAdd();
         },
         toggleSelection(row) {
            this.$refs.crud.toggleSelection(row);
         },
         handleList(form) {
            this.tableLoading = true;
            this.$store
                 .dispatch("GetTableData", Object.assign({}, form, { page: `${this.tablePage}` }))
                 .then(data => {
                    setTimeout(() => {
                      this.tableData = data.tableData;
                      this.page = {
                        total: data.total,
                        currentPage: this.tablePage,
                        pageSize: data.pageSize
                      };
                      this.tableLoading = false;
                    }, 1000);
                });
        },
        handleSelectionChange(val) {
             this.tableRow = val[0];
             this.$notify({
               showClose: true,
               message: JSON.stringify(val),
               type: "success"
            });
        },
        handleSave(row, done) {
           this.tableData.push(Object.assign({}, row));
           done();
           setTimeout(() => {
             this.$notify({
               showClose: true,
               message: "添加成功",
               type: "success"
             });
           });
        },
        handleRowDBLClick(row, event) {
           this.$notify({
             showClose: true,
             message: "双击",
             type: "success"
           });
        },
        handleRowClick(row, event, column) {
           this.$notify({
             showClose: true,
             message: "单机",
             type: "success"
           });
        },
        handleRowDel() {
          this.$notify({
            showClose: true,
            message: this.tableRow,
            type: "success"
          });
        },
        handleDel(row, index) {
          this.$confirm(`是否确认删除序号为${row.name}`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
             this.tableData.splice(index, 1);
             this.$notify({
               showClose: true,
               message: "删除成功",
               type: "success"
             });
          }).catch(err => {});
        },
        handleUpdate(row, index, done) {
           this.tableData.splice(index, 1, Object.assign({}, row));
           done();
           setTimeout(() => {
             this.$notify({
               showClose: true,
               message: "修改成功",
               type: "success"
            });
           });
        },
        boxhandleClose(done) {
           this.$notify({
             showClose: true,
             message: "表单关闭前处理事件",
             type: "success"
           });
           done();
        },
        boxhandleOpen(show) {
           this.$notify({
             showClose: true,
             message: "表单打开前处理事件",
             type: "success"
           });
           show();
         }
       }
    })
  })
}