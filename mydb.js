/**
 * Created by asus on 2017/8/6.
 */

//引入mongoose模块
var mongoose=require('mongoose')

//数据库连接地址  链接到myStudent数据库
var DB_URL='mongodb://localhost:27017/myStudent'
//数据库连接
mongoose.connect(DB_URL)

//连接成功终端显示消息
mongoose.connection.on('connected',function () {
    console.log('mongoose connection open to '+DB_URL)
})
//连接失败终端显示消息
mongoose.connection.on('error',function () {
    console.log('mongoose error ')
})
//连接断开终端显示消息
mongoose.connection.on('disconnected',function () {
    console.log('mongoose disconnected')
})

//创建一个Schema  每一个schema会一一对应mongo中的collection
var schema=mongoose.Schema

//实例化一个Schema
var studentSchema=new schema(
    {
        //设置studentSchema信息的数据格式
        name:{type:String},
        sex:{type:String},
        age:{type:Number},
        phone:{type:String},
        email:{type:String},
        other:{type:String},
    },
    //{versionKey: false}是干嘛用？如果不加这个设置，我们通过mongoose第一次创建某个集合时，
    // 它会给这个集合设定一个versionKey属性值，我们不需要，所以不让它显示
    {
        versionKey:false
    }
)

//生成一个具体user的model并导出
//第一个参数是集合名，在数据库中会自动加s
//把Model名字字母全部变小写和在后面加复数s
var student=mongoose.model('student',studentSchema)
//将Student的model导出
module.exports=student
