import React,{Component} from 'react';
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile';
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim';
import {getMsgList,sendMsg,recvMsg,upDateUnread} from '../../redux/chat.redux';
import {getChatId} from '../../util';
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,upDateUnread}
)
class Chat extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            text:'',
            msg:[],
            showEmoji:false
        }
    }
    componentDidMount()
    {
        if(!this.props.chat.chatmsg.length) {
            this.props.recvMsg();
            this.props.getMsgList();
        }
        console.log("component Did Mount");
        this.fixCarousel();

    }
    componentWillUnmount()
    {
        console.log("Chat component : willunMount");
        const to =this.props.match.params._id;
        console.log("From who:",to);
        this.props.upDateUnread(to);
    }
    fixCarousel()
    {
        setTimeout(function(){
           window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleClick()
    {
        const from=this.props.user._id;
        const to = this.props.match.params._id;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:''});
    }
    render()
    {
        const emoji =`😄 😃 😀 😊  😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰
                      😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟
                      😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 🎹 ❤ 😂 😍 🙈 🙉 🙊 💥 🐒`.split(' ').filter(v=>v).map(v=>({
                    text:v}));

        const userid =this.props.match.params._id;
        const users = this.props.chat.users;
        if(!users[userid])
            return null;
        const userName = users[userid].name;
        const Item =List.Item;
        const chatId=getChatId(userid,this.props.user._id);
        const chatMsg = this.props.chat.chatmsg.filter((v)=>(v.chatid===chatId));
        //let length =chatMsg.length;
        return (
            <div id='chat-page'>
                <NavBar
                    type='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack();
                        //this.props.upDateUnread();
                        }}
                >
                    {userName}
                </NavBar>
                <QueueAnim delay={100}>
                {chatMsg.map((item)=> {
                    //length--;
                    const avatar=require(`../../img/${users[item.from].avatar}.png`);
                    return item.from === userid?
                        (<List key={item._id}>
                                <Item thumb={avatar}>{item.content}</Item>
                            </List>
                        )
                        : (<List key={item._id}>
                            <Item className='chat-me' extra={<img src={avatar} alt='头像'/>} >{item.content}</Item>
                        </List>)
                })}
                </QueueAnim>
            <div className='stick-footer'>
                <List>
                <InputItem
                    type='text'
                    value={this.state.text}
                    onChange={(v)=>{
                        this.setState({
                            text:v
                        })
                    }}
                    extra={
                        <div>
                            <span style={{marginRight:10,fontSize:20}}
                                  onClick={()=>{
                                      this.setState({
                                          showEmoji:!this.state.showEmoji,
                                      });
                                      this.fixCarousel();
                                  }}>
                                😄
                            </span>
                            <span style={{color:'#108ee9'}}
                                  onClick={()=>this.handleClick()}
                            >发送
                            </span>
                        </div>}
                >
                </InputItem>
                </List>
                {this.state.showEmoji? <Grid
                    data={emoji}
                    columnNum={9}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(el)=>{
                        this.setState({
                            text:this.state.text+el.text,
                        })
                    }}
                />:null}
             </div>
            </div>
        )
    }
}
export default Chat;