/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 22:04:18
*/
const Generator = function(resolve, reject) {
$.get('src/views/table/generator.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
              tableOption: tableOption,
              formOption: formOption,
              DIC: DIC,
              tableForm: {
                width: "100%",
                dic: []
              },
              form: {
                column: []
              },
              result: "",
              dicData: {
                box: false,
                check: [],
                list: []
              }
          }
       },
       created() {
         this.init();
       },
       watch: {
         form: {
           handler(n, o) {
             this.handleResult();
           },
           deep: true
         },
         tableForm: {
            handler(n, o) {
              for (let o in this.tableForm) {
                this.form[o] = this.tableForm[o];
              }
              this.handleResult();
            },
            deep: true
         }
       },
       mounted() {},
       computed: {},
       props: [],
       methods: {
         init() {
           this.tableOption.dic = ["CRUDTYPE", "VAILDATA"];
         },
         handleResult() {
           let form = JSON.parse(JSON.stringify(this.form));
           form.column.forEach(ele => {
             for (let o in ele) {
               if (validatenull(ele[o])) {
                 delete ele[o];
               }
             }
           });
           const result = JSON.stringify(form, null, 2);
           this.result = result;
        },
        handleDicSbumit() {
           this.tableForm.dic = ["CRUDTYPE", "VAILDATA"].concat(this.dicData.check);
           this.tableOption.dic = this.tableForm.dic;
           this.dicData.list = [];
           this.tableOption.dic.forEach(ele => {
              this.dicData.list.push({
                label: ele,
                value: ele
              });
           });
          this.tableOption.column[this.tableOption.column.length - 1].dicData = this.dicData.list;
          this.dicData.box = false;
        },
        handleAddColumn() {
          this.$refs.crud.rowAdd();
        },
        handleSave(row, done) {
          this.form.column.push(row);
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          done();
        },
        handleUpdate(row, index, done) {
          this.form.column.splice(index, 1, row);
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          done();
        },
        handleDel(row, index) {
          this.$confirm(`是否确认删除`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.form.column.splice(index, 1);
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
            })
            .catch(err => {});
        }
      }
    })
  })
}