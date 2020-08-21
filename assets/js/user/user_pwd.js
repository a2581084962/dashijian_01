$(function () {
    // 1.定义校验规则
    var form = layui.form;
    form.verify({
        // 1.1 密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 1.2新旧密码不重复
        samepwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '原密码和新密码不能一致';
            }
        },
        // 1.3 两次密码必须一样
        rePwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return "两次密码不一致";
            }
        }
    })

    // 表单提交，修改密码
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 成功
                layui.layer.msg('修改密码成功！');
                $('.layui-form')[0].reset();
            },
        })
    })
})