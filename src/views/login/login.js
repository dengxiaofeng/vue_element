/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 22:04:08
*/
const Login = function(resolve, reject) {
const MSGINIT = "发送验证码",
      MSGERROR = "验证码发送失败",
      MSGSCUCCESS = "${time}秒后重发",
      MSGTIME = 60;
$.get('src/views/login/login.html').then(function(res) { 
    resolve({ // 这里是构造一个component
       template: res,
       data:function(){
          const validateUsername = (rule, value, callback) => {
              if (!isvalidUsername(value)) {
                 callback(new Error("请输入正确的用户名"));
              } else {
                 callback();
              }
          };
          const validateCode = (rule, value, callback) => {
              if (this.code.value != value) {
                this.loginForm.code = "";
                this.refreshCode();
                callback(new Error("请输入正确的验证码"));
              } else {
                callback();
              }
         };
         const validatePhone = (rule, value, callback) => {
             if (isvalidatemobile(value)[0]) {
              callback(new Error(isvalidatemobile(value)[1]));
             } else {
                callback();
            }
        };
        const validatePhoneCode = (rule, value, callback) => {
            if (value.length != 4) {
              callback(new Error("请输入4位数的验证码"));
            } else {
              callback();
            }
        };
        return {
            msg:'测试',
            activeName: "user",
            loginForm: {
                username: "admin",
                password: "123456",
                code: "",
                redomStr: ""
            },
            msgText: MSGINIT,
            msgTime: MSGTIME,
            msgKey: false,
            phoneForm:{
              phone: "17547400800",
              code: ""
            },
            checked: false,
            code: {
              src: "",
              value: "",
              len: 4,
              type: "text"
            },
            loginRules: {
              username: [
                { required: true, trigger: "blur", validator: validateUsername }
              ],
              password: [
                { required: true, message: "请输入密码", trigger: "blur" },
                { min: 6, message: "密码长度最少为6位", trigger: "blur" }
              ],
              code: [
                { required: true, message: "请输入验证码", trigger: "blur" },
                { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
                { required: true, trigger: "blur", validator: validateCode }
              ]
            },
            loginPhoneRules: {
               phone: [{ required: true, trigger: "blur", validator: validatePhone }],
               code: [{ required: true, trigger: "blur", validator: validatePhoneCode }]
            },
            passwordType: "password"
         }
      },
      created:function() {
        this.refreshCode();
      },
      computed: {
        website:function(){
          console.log(this.$store.getters)
          return this.$store.getters.website
        },
        tagWel:function(){
          return this.$store.getters.tagWel
        }
      },
      methods: {
        refreshCode() {
          this.loginForm.redomStr = randomLenNum(this.code.len, true);
          this.code.type == "text"  ? (this.code.value = randomLenNum(this.code.len)) : (this.code.src = `${this.codeUrl}/${this.loginForm.redomStr}`);
          this.loginForm.code = this.code.value;
        },
        showPassword() {
          this.passwordType == "" ? (this.passwordType = "password"): (this.passwordType = "");
        },
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            console.log(this.tagWel.value)
            this.$store.dispatch("LoginByUsername", this.loginForm).then(res => {
                this.$router.push({ path: this.tagWel.value });
            });
         });
       },
       handlePhoneLogin() {
         this.$refs.phoneForm.validate(valid =>{
            this.$router.push("/home")
         })
       }
      }
    })
  })
}