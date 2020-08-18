$(function () {
    //1. 点击去注册账号，显示注册区域，隐藏登录区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //2. 点击去登录，显示登录区域，隐藏注册区域
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 3.自定义验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6~16位,且不能输入空格'
        ],
        repwd: function (value) {   //此时的value值为repwd的内容
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return "两次密码不一致"
            }
        }
    })
    // 4.注册功能
    var layer = layui.layer;
    $('.reg-box').on('submit', function (e) {
        // 清除表单的默认行为
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟点击事件
                $('#link_login').click();
                // 要清空注册里面的内容,下次点击不然还显示上次的内容
                $('#form_reg')[0].reset();
            }
        })
    })
    // 5.登录功能（给form标签绑定事件，button按钮触发提交事件）
    $('#form_login').submit(function (e) {
        // 阻止表单的默认行为
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // 校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 保存token
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = "/index.html";
            }
        })
    })

})