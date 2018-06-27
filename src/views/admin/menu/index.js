/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   dengxiaofeng
* @Last Modified time: 2018-06-19 22:03:13
*/
const Menu = function(resolve, reject) {
$.get('src/views/admin/menu/index.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
              form: {},
              obj: {},
              parentForm: {},
              formGrade: true,
              formStatus: ""
          }
       },
       created(){
         this.$store.dispatch('GetMenuAll').then(data => {})
       },
       mounted(){

       },
       computed:{
       	  permission:function(){
       	  	return this.$store.getters.permission
       	  },
       	  menuAll:function(){
       	  	return this.$store.getters.menuAll
       	  }
       },
       methods: {
       	 handleNodeClick(data,checked,indeterminate) {
       	 	this.parentForm = Object.assign({},findParent(this.menuAll, data.id))
       	 	this.formGrade = true
       	 	this.formStatus = ""
       	 	this.obj  = data
       	 	this.form = data
       	 },
       	 handleAdd() {
       	 	this.formGrade = false
       	 	this.formStatus = "add"
       	 	this.form = {}
       	 },
       	 handleEdit() {
       	 	if(validatenull(this.obj)) {
       	 		this.$message({
       	 			showClose: true,
       	 			message:"请选择菜单",
       	 			type:'warning'
       	 		})
       	 		return false
       	 	}
       	 	this.form = Object.assign({},this.obj)
       	 	this.formStatus ="edit"
       	 	this.formGrade = false
       	 },
       	 handleDel() {
       	 	 this.$confirm(`是否确认删除序号为${this.form.label}`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
             }).then(()=>{
             	this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                })
             })
             .catch(err =>{})
       	 },
       	 handleSubmit(){}
       }
     
    })
  })
}