$(function() {

    // 点击“去登录”的链接
    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 点击“去注册账号”的链接
    $('#link-reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    })

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 验证两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框里的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        };
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                // 模拟人的点击事件
                $('#link-login').click();
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $('.login-box [name=username]').val(),
                password: $('.login-box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!');

                // 将登录成功得到的token字符串,保存到localStorage中
                localStorage.setItem('token', res.token)

                // 跳转到后台主页
                location.href = 'index.html'
            }
        })
    })
})