var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
var config = require('../serverConfig')

mongoose.connect(config.url)

console.log("[db] start to connect db...")

//文章model 这里规定的内容，就是数据库实际存储内容，其他地方无法随意添加
mongoose.model('Article', new mongoose.Schema({
    // id: {type: String, isRequired: true},
    title: {type: String, isRequired: true},
    content: {type: String, isRequired: true},
    author: {type: String, isRequired: true},
    createTime: {type:String, isRequired: true},    
    user: {type: ObjectId, ref: 'User'},
    comments:[{//评论的一个数组
        user: {type: ObjectId, ref: 'User'},//评论人
        content: {type: String},//评论的内容
        createTime: {type: String, isRequired: true}//评论的时间
    }],    
}))

//文章model 这里规定的内容，就是数据库实际存储内容，其他地方无法随意添加
mongoose.model('User',new mongoose.Schema({
    username:{type:String,isRequired:true},
    password:{type:String,isRequired:true},
    email:{type:String,isRequired:true},
    token:{type:String,isRequired:true},
    list:{type:Object,default:[]},
    avatar:{type:String,default:'http://www.qdaily.com/images/missing_face.png'}//头像
}))

//在程序的任何地方都可以调用此方法,设置为全局
global.Model = function(modelName) {
    return mongoose.model(modelName)
}