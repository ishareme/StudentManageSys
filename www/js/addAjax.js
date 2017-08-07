/**
 * Created by asus on 2017/8/6.
 */

$(function () {

    //添加表单验证方法   手机号的验证
    $.validator.addMethod('isPhone',function (value,ele) {
        var length=value.length
        var reg=/^1[34578]\d{9}$/
        if (length >= 11 && reg.test(value)){
            return true
        }
        else {
            return false
        }
    })

    //对表单进行验证
    $('#addForm').validate({
        debug:true,
        //验证的规则
        rules:{
            name:{
                required:true,
                minlength:3
            },
            age:{
                required:true
            },
            phone:{
                required:true,
                isPhone:true
            },
            email:{
                required:true,
                email:true
            }
        },
        //错误的提示信息
        messages:{
            name:{
                required:'姓名不能为空',
                minlength:'姓名不能少于3位'
            },
            age:{
                required:'年龄不能为空'
            },
            phone:{
                required:'手机号不能为空',
                isPhone:'手机号格式错误'
            },
            email:{
                required:'邮箱不能为空',
                email:'邮箱格式错误'
            }
        },
        //正确时执行的函数
        submitHandler:function (form) {
            //ajax请求
            $.ajax({
                type:'post',
                url:'/addStu',
                dataType:'json',
                //表单数据序列化
                data:$(form).serialize(),
                //ajax请求成功操作
                success:function (res) {
                    $('.modal-body').text(res.message)
                    //显示出模态框
                    $('.modal').modal('show').on('hidden.bs.modal',function () {
                        if (res.message == '添加成功'){
                            location.href='index.html'
                        }
                    })
                },
                //ajax请求失败操作
                error:function (jqXHR) {
                    console.log(jqXHR.status)
                }
            })
        },

    })
})