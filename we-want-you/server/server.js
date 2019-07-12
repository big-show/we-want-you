const express = require('express');
const userRouter = require('./user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const model = require('./model');
const Chat = model.getModel('chat');
//socket work with express
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//Chat.remove({},(e,d)=>{});
io.on('connection',function (socket) {
    socket.on('sendMsg',function (data) {
        //console.log(data);
        ///io.emit('recvmsg',data)
        const {from,to,msg}=data;
        const chatid =[from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            //console.log(doc);
            io.emit('recvmsg',Object.assign({},doc._doc));
        });
    })
});
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',userRouter);
server.listen(8080,()=>{
   console.log('server started at 8080')
});