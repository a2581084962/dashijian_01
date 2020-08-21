$(function () {
    // 1.校验表单
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称的长度为1~6位之间"
            }
        }
    })

    // 2.用户渲染
    initUserInfo();
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // 判断
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    //3.重置按钮
    $("#btnReset").on('click', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        // 重新获取信息渲染
        initUserInfo();
    })

    // 4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 成功
                layer.msg('恭喜您，修改成功！');
                // ***调用父框架的全局方法***
                window.parent.getUserInof();
            }
        })
    })
})