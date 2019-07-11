const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const models = {
    user:{
        'user':{type:String,'require':true},
        'pwd':{type:String,'require':true},
        'type':{type:String,'require':true},
        //头像
        'avatar':{type:String},
        //简介
        'desc':{type:String},
        //职位
        'title':{type:String},
        //boss页面的公司和薪酬
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,require:true},
        'content':{type:String,require:true,default:''},
        'create_time':{type:Number,default:new Date().getTime()}
    }

};
for(let m in models)
{
    mongoose.model(m,new mongoose.Schema(models[m]));
}
module.exports = {
    getModel:function (name) {
        return mongoose.model(name);
    }
}