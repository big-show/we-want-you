import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
//import Login from "../../container/login/login";
@connect(
    state=>state,
)
class Msg extends Component{
    getListItem(arr)
    {
        return arr[arr.length-1];
    }
    render()
    {
        const Item = List.Item;
        const Brief = Item.Brief;
        const chatGroup={};
        this.props.chat.chatmsg.forEach(v=>{
            chatGroup[v.chatid]=chatGroup[v.chatid]||[];
            chatGroup[v.chatid].push(v);
        });
        const chatGroupValue = Object.values(chatGroup).sort((a,b)=>
        {
            const aLast = this.getListItem(a).create_time;
            const bLast = this.getListItem(b).create_time;
            return bLast-aLast;
        });
        //console.log(chatGroupValue);
        const userid=this.props.user._id;
        return (
            <div>
                {chatGroupValue.map(v=>{
                    const unreadNum=v.filter(v=>!v.read&&v.to===userid).length;
                    const targetId=userid===v[0].to?v[0].from:v[0].to;
                    const userinfo=this.props.chat.users;
                    if(!userinfo[targetId])
                        return null;
                    const name=userinfo[targetId].name;
                    const avatar = userinfo[targetId].avatar;
                    const msg=this.getListItem(v);
                    //console.log(msg.content);
                    return(
                        <List key={msg._id}>
                            <Item key={v._id}
                                thumb={<img src={require(`../../img/${avatar}.png`)} alt='头像'/>}
                                  extra={<Badge text={unreadNum}></Badge>}
                                  arrow='horizontal'
                                  onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                            >
                                {msg.content}
w                                <Brief>{name}</Brief>
                            </Item>
                        </List>
                    )
                }
                )
                }

            </div>
        )
    }
}
export default Msg;