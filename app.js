/**
 * Created by asus on 2017/8/6.
 */

var expres=require('express')
var bodyParser=require('body-parser')
var student=require('./mydb')

var app=expres()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(expres.static('www'))

// 允许跨域访问／／／
app.all('/api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'x-Request-with')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '4.15.2')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()   //执行下一个中间件。
})

//首页展示获取数据
app.post('/index',function (req,res) {
    //mongoose 数据查找
    student.find({}).exec(function (error,data) {
        if (error){
            console.log('数据获取失败'+error)
        }
        else{
            res.json({
                status:'y',
                message:'查询成功',
                //传递返回的数据
                data:data
            })
        }
    })
})

//修改页面 获取数据
app.post('/modify',function (req,res) {
    //mongoose根据条件进行查找
    student.find({_id: req.body.id}).exec(function (error,data) {
        console.log('2')
        if (error){
            console.log('数据获取失败'+error)
        }
        else{
            console.log(data)
            res.json({
                status:'y',
                message:'查询成功',
                data:data
            })
            console.log(4)
        }
    })
})

//修改提交修改数据库
app.post('/modifyStu',function (req,res) {
    console.log('1')
    console.log(req.body)
    //查询的条件
    var whereStr={_id:req.body.id}
    //更新的内容
    var updateStr={
        $set:{
            name:req.body.name,
            sex:req.body.sex,
            age: req.body.age,
            phone:req.body.phone,
            email:req.body.email,
            other:req.body.other,

        }
    }
    //对数据库进行更新
    student.update(whereStr,updateStr,function (error) {
        if (error){
            console.log('数据修改失败:'+error)
            res.json({
                status:'y',
                message:'修改失败',
                data:req.body
            })
        }
        else{
            console.log('数据修改成功')
            res.json({
                status:'y',
                message:'修改成功',
                data:req.body
            })
        }
    })
})

//删除数据库其中的项
app.post('/del',function (req,res) {
    //mongoose根据指定条件进行删除
    student.remove({_id: req.body.id},function(error){
        if (error){
            console.log('数据获取失败'+error)
            res.json({
                status:'y',
                message:'删除不成功',
            })
        }
        else{
            res.json({
                status:'y',
                message:'删除成功',
            })
        }
    })
})

//导航栏search操作
app.post('/findName',function (req,res) {
    console.log(req.body.searchName)
    student.find({name: req.body.searchName}).exec(function (error,data) {
        if (error){
            console.log('查询失败'+error)
            res.json({
                status:'y',
                message:'查询失败',
            })
        }
        else{
            res.json({
                status:'y',
                message:'查询成功',
                data:data
            })
        }
    })
})

//添加数据库操作
app.post('/addStu',function (req,res) {
    console.log(req.body)
    //实例化一个student
    var newStu=new student({
        name:req.body.name,
        sex:req.body.sex,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email,
        other:req.body.other,

    })
    //对实例化的内容进行保存
    newStu.save(function (error) {
        if (error){
            console.log('数据添加失败:'+error)
            res.json({
                status:'y',
                message:'添加失败',
                data:req.body
            })
        }
        else {
            console.log('数据添加成功')
            res.json({
                status:'y',
                message:'添加成功',
                data:req.body
            })
        }
    })
})

//服务器监听端口
app.listen(3000,()=>{
    console.log('node is ok')
})
