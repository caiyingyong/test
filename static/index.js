
/**
 * Created by lenovo on 2017/4/20.
 */
getJson('/ceshi',{},function (res) {
    console.log(res)
});

/**
 * 注册
 */
$('#register').click(function () {
    var option = {
        account:$('#account').val(),
        password:$('#password').val()
    };
    postJson('/register',option,function (res) {
        console.log(res);
        if(res.success){
            console.log('注册成功')
        }else {
            console.log('注册失败');
        }
    })
});
