import axios from 'axios';
import {getRedirectPath} from "../util";
//action
const REGISTER_SUCCESS = 'user/register_success';
const ERR_MSG = 'user/err_meg';
const LOGIN_SUCCESS = 'user/login_success';
const LOAD_DATA = 'user/load_data';
//reducer
const defaultState={
  redirecTo:'',
  isAuth:false,
  user:'',
  pwd:'',
  type:'',
  errMsg:''
};
export default function userReducer(state=defaultState , action)
{
    switch (action.type)
    {
        case REGISTER_SUCCESS:
            return {...state,isAuth:true,redirecTo:getRedirectPath(action.data),...action.data};
        case LOGIN_SUCCESS:
            return {...state,...action.data,redirecTo:getRedirectPath(action.data)}
        case ERR_MSG:
            return {...state,isAuth:false,errMsg:action.msg};
        case LOAD_DATA:
            return {...state,...action.data};
        default:
            return state;
    }
};

//actionCreator

function errMsg(data)
{
    return {type:ERR_MSG,msg:data};
}
function registerSucc(data)
{
    return {type:REGISTER_SUCCESS,data}
}
function loginSucc(data)
{
    return{type:LOGIN_SUCCESS,data}
}
export function loadDataSucc(data)
{
    return {type:LOAD_DATA,data}
}
export function login({user,pwd}){
    if(!user||!pwd)
        return errMsg("用户名和密码不能为空");
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(loginSucc(res.data.data))
                }
                else
                {
                    dispatch(errMsg(res.data.msg));
                }
            })
    }
}
export function register({user,pwd,repeatPwd,type}){
    if(!user||!pwd)
        return errMsg("用户名和密码必须输入");
    if(pwd!==repeatPwd)
        return errMsg("密码和确认密码必须相同");
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then((res)=>{
                if(res.status===200&&res.data.code===0) {
                    dispatch(registerSucc({user, pwd, type}));
                }
                else
                    dispatch(errMsg(res.data.msg));
            })
    }
}