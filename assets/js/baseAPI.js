// 1.开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net';
// 1.测试环循服务器地址
//var baseURL='http://ajax.frontend.itheima.net';
// 1.生产环境服务器地址
//var baseURL='http://ajax.frontend.itheima.net';

// 拦截所有的ajax请求，get / post /ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    // 拼接服务器地址
    params.url = baseURL + params.url;
    // alert(params.url)
})