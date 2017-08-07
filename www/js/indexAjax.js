/**
 * Created by asus on 2017/8/6.
 */

$(function () {
    $.ajax({
        type:'post',
        url:'/index',
        success:function (res) {
            var strHtml=template('showStu',res.data)
            $('#tb').html(strHtml)


            $('.del').click(function (event) {
                event.preventDefault()
                var id=$(this).data('index')
                $.ajax({
                    type:'post',
                    url:'/del',
                    dataType:'json',
                    data:{
                        id: id
                    },
                    success:function (res) {
                        $('.modal-body').text(res.message)
                        $('.modal').modal('show').on('hidden.bs.modal',function () {
                            if (res.message == '删除成功'){
                                location.href='index.html'
                            }
                        })
                    },
                    error:function (jqXHR) {
                        console.log(jqXHR.status)
                    }
                })
            })
        },
        error:function (jqXHR) {
            console.log(jqXHR.status)
        }
    })

    $('#findN').click(function (event) {
        event.preventDefault()
        $.ajax({
            type:'post',
            url:'/findName',
            data:{
                searchName:$('#search').val()
            },
            success:function (res) {
                console.log(res.data)
                var strHtml=template('showStu',res.data)
                $('#tb').html(strHtml)
            },
            error:function (jqXHR) {
                $('.modal-body').text(res.message)
                $('.modal').modal('show').on('hidden.bs.modal',function () {
                    if (res.message == '查询失败'){
                        location.href='index.html'
                    }
                })
            }
        })
    })
})
