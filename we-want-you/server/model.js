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