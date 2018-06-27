/*
* @Author: xiaoc
* @Date:   2018-06-19 15:34:14
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 22:03:48
*/
var Forms = function (resolve,reject) {
	$.get('src/views//forms/index.html').then(function(res){
        resolve({
        	 template: res,
        	  data() {
                 return {
                      formJson: "",
                      formOption: formOption,
                      formData: {
                        username: "smallwei",
                        name: "smallwei",
                        sex: 0,
                        type: 0,
                        grade: [0, 1]
                      },
                      form: {}
                 };
              },
              created() {
                 this.formJson = JSON.stringify(formOption, null, 2);
              },
              watch: {},
              mounted() {},
              computed: {
              	 permission:function(){
  		             return this.$store.getters.permission
  	             }
              },
              props: [],
              methods:{
              	tip() {
              	  this.$message({
              	  	 message:'点击事件'
              	  })
              	},
              	formate(){
              		let p = new Promise((resolve, reject) => {
              			resolve(JSON.parse(this.formJson))
              		});
              		p.then(data => {
                       this.formOption = data;
                       this.formJson = JSON.stringify(data, null, 2);
                       this.$message({
                         message: "数据加载成功",
                         type: "success"
                       });
                    }).catch(err => {
                       this.$message({
                         center: true,
                         dangerouslyUseHTMLString: true,
                         message: `JSON格式错误<br \>\n${err}`,
                         type: "error"
                       });
                    });
              	}
             },
             handleSubmit(form) {
                if (form) {
                  this.form = form;
                  this.$message({
                    message: form,
                    type: "success"
                  });
                } else {}
            }
        })
   })
}
