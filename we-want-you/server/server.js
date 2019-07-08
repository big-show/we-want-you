const express = require('express');
const userRouter = require('./user');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',userRouter);
app.listen(8080,()=>{
   console.log('server started')
});