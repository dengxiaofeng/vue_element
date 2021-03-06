/*
* @Author: xiaoc
* @Date:   2018-06-19 17:16:15
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 21:15:36
*/
axios.defaults.timeout = 10000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
let cfg, msg;
msg = '服务器君开小差了，请稍后再试';
//HTTPrequest拦截
axios.interceptors.request.use(config => {
	NProgress.start()
	return config
}, error => {
	console.log('err' + error)// for debug
	return Promise.reject(error)
})
//HTTPresponse拦截
axios.interceptors.response.use(data => {
	NProgress.done();
	return data
}, error => {
	NProgress.done();
	return Promise.reject(new Error(msg));
})
