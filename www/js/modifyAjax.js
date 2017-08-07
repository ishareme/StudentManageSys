/**
 * Created by asus on 2017/8/6.
 */

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

$(function () {
    var url = location.href;
    var id = url.substring(url.indexOf("?")+1,url.length);
    console.log(id)
    $.ajax({
        type:'post',
        url:'/modify',
        dataType:'text',
        data:id,
        success:function (res) {
            var myData=JSON.parse(res)
            console.log(myData.data)
            var strHtml=template('showOneStu',myData.data)
            $('#studentOne').html(strHtml)

            $('#modifyBtn').click(function (event) {
                $('#modifyForm').validate({
                    debug:true,
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
                    submitHandler:function (form) {
                        var id = url.substring(url.indexOf("?")+4,url.length);
                        $.ajax({
                            type:'post',
                            url:'/modifyStu',
                            dataType:'json',
                            data:{
                                name: $('#name').val(),
                                sex: $('input[name="sex"]:checked').val(),
                                age: $('#age').val(),
                                phone: $('#phone').val(),
                                email: $('#email').val(),
                                other: $('#other').val(),
                                id: id
                            },
                            success:function (res) {
                                $('.modal-body').text(res.message)
                                $('.modal').modal('show').on('hidden.bs.modal',function () {
                                    if (res.message == '修改成功'){
                                        location.href='index.html'
                                    }
                                })
                            },
                            error:function (jqXHR) {
                                console.log(jqXHR.status)
                            }
                        })
                    },

                })
            })
        },
        error:function (jqXHR) {
            console.log(jqXHR.status)
        }
    })

})

