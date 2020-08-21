$(function () {
    // 1.1获取用户信息
    getUserInof();

    // 3.退出
    var layer = layui.layer;
    $("#btnLogout").on('click', function () {
        // 框架提供的提示框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地的token
            localStorage.removeItem('token');
            // 2.页面跳转
            location.href = "/login.html";
            // 框架自动关闭询问框
            layer.close(index);
        });
    })

})

// 1.0获取用户信息（封装到入口函数的外面了）
// 原因：后面的页面还要调用
function getUserInof() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // console.log(res)
            // 请求成功，渲染用户头像信息
            renderAvatar(res.data)
        }
    })
}

// 2.封装用户头像渲染页面
function renderAvatar(user) {
    // 用户名，（昵称优先，没有的话用username）
    // console.log(user)
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 2.用户头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text);
    }
}
