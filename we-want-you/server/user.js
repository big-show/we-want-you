const utils = require('utility');
const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter={pwd:0,__v:0};
Router.get('/list',(req,res)=>{
   //User.remove({},(e,d)=>{});
   User.find({},(err,doc)=>{
      res.json(doc);
   })
});
Router.post('/login',function (req,res) {
    const{user,pwd} = req.body;
    console.log(user,pwd);
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc)=>
    {
        if(!doc) {
            return res.json({code: 1, msg: "用户名或密码错误"});
        }
            res.cookie("userid",doc._id);
            return res.json({code:0,data:doc});
    })
});
Router.post('/register',function (req,res) {
  const {user,pwd,type} = req.body;
  User.findOne({user},function (err,doc) {
      if(doc)
          return res.json({code:1,msg:"用户名已被注册，请重新填写一个"});
      const userModel = new User({user,pwd:md5Pwd(pwd),type});
      userModel.save(function(e,d){
         const {user,type,_id} =d;
         res.cookie('userid',_id);
         return res.json({code:0,data:{user,type,_id}});
      });
  })

});
//处理bossinfo更新信息
Router.post('/update',function (req,res) {
    console.log(req.body);
    const userid=req.cookies.userid;
    if(!userid)
        return res.json({code:1});
    User.findByIdAndUpdate(userid,req.body,(err,doc)=>{
      const data = Object.assign({},{
          user:doc.user,
          type:doc.type,
      },req.body);
      return res.json({code:0,data});
    });
});
Router.get('/info',(req,res)=>{
   const {userid} = req.cookies;
   console.log(userid);
   if(!userid)
       return res.json({code:1});
   User.findOne({_id:userid},_filter,function(err,doc){
       if(err)
       {
           return res.json({code:1,msg:"后端出现错误"})
       }
       if(doc)
       {
           return res.json({code:0,data:doc});
       }
    })
});
function md5Pwd(pwd)
{
    const salt = 'lb_232323_dsdfasd!@#!#!#$#!_';
    return utils.md5(utils.md5(pwd+salt));
}
module.exports = Router;