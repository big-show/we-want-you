import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:8080');

//action
//获取聊天列表
const MSG_LIST='msg_list';
//读取信息
const MSG_RECV='msg_recv';
//更新未读消息:
const UPDATE_UNREAD = 'UPDATE_unread';
//reducer
const defaultState={
    chatmsg:[],
    unread:0,
    users:{},
};

export default function chat(state=defaultState,action) {
    switch (action.type)
    {
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read&&action.userid===v.to).length,users:action.users};
        case MSG_RECV:
            //console.log(action.payload.to);
            const n=action.userid===action.payload.to?1:0;
            //console.log(n);
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n};
        case UPDATE_UNREAD:
            return {...state,chatmsg:state.chatmsg.map(v=>{
                       if(v.from===action.from&&action.userid===v.to)
                       {
                           v.read=true;
                       }
                       return v;
                }),unread:state.unread-action.readNum};
        default:
            return state;
    }
}
//actionCreator
function msgList(msgs,users,userid)
{
    return{type:MSG_LIST,payload:msgs,users,userid}
}
function getRecvMsg(msg,userid)
{
    return {type:MSG_RECV,payload:msg,userid}
}
function getUnread(userid,from,readNum)
{
    //console.log("getUnread");
    return {type:UPDATE_UNREAD,userid,from,readNum}
}
export function recvMsg()
{
    return (dispatch,getState)=> {
        socket.on('recvmsg', function (data) {
            const userid=getState().user._id;
            dispatch(getRecvMsg(data,userid));
        })
    }
}
//更新未读消息
export function upDateUnread(from)
{
    return (dispatch,getState)=>{
        const userid=getState().user._id;
        //console.log("页面用户:",userid);
        axios.post('/user/updateUnread',{userid,from})
            .then(res=>{
                if(res.status===200&&res.data.code===0)
                    dispatch(getUnread(userid,from,res.data.num))
            })
    }
}
export function sendMsg({from,to,msg}) {
    return dispatch=>{
        socket.emit('sendMsg',{from,to,msg})
    }
}
export function getMsgList() {
    return (dispatch,getState)=>{

        axios.get('/user/getmsglist')
            .then(res => {
                //console.log(getState());
                const userid=getState().user._id;
                //console.log(userid);
                if (res.status === 200 && res.data.code === 0)
                    dispatch(msgList(res.data.msgs,res.data.users,userid))
            })
    }
}