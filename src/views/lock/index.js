/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 22:04:03
*/
const Lock = function(resolve, reject) {
$.get('src/views/lock/index.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
              passwd: "",
              passwdError: false,
              pass: false
          }
       },
       created() {
       	 this.$store.dispatch('GetUserInfo').then(data => {})
       },
       mounted() {

       },
       computed:{
       	  userInfo:function() {
       	  	return this.$store.getters.userInfo
       	  },
       	  tag:function(){
       	  	return this.$store.getters.tag
       	  },
       	  lockPasswd:function(){
       	  	return this.$store.getters.lockPasswd
       	  }
       },
       methods:{
       	 handleLogout() {
            this.$confirm("是否退出系统, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$store.dispatch("LogOut").then(() => {
                this.$router.push({ path: "/login" });
              });
            });
         },
         handleLogin() {
            if (this.passwd != this.lockPasswd) {
               this.passwd = "";
               this.$message({
                 message: "解锁密码错误,请重新输入",
                 type: "error"
               });
               this.passwdError = true;
               setTimeout(() => {
                 this.passwdError = false;
               }, 1000);
               return;
            }
            this.pass = true;
            setTimeout(() => {
              this.$store.commit("CLEAR_LOCK");
              this.$router.push({ path: resolveUrlPath(this.tag.value || "/") });
            }, 1000);
        }
       }
    })
  })
}