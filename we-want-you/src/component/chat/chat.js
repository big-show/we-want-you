import React,{Component} from 'react';
import {List,InputItem,NavBar,Icon,Grid,Button} from 'antd-mobile';
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
            //console.log('不存在数据，加载数据');
        }
        console.log("component Did Mount");
        this.fixCarousel();

    }
    componentWillUnmount()
    {
       // console.log("Chat component : willunMount");
        const to =this.props.match.params._id;
        //console.log("From who:",to);
        this.props.upDateUnread(to);
    }
    fixCarousel()
    {
        setTimeout(function(){
           window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleButtonClick()
    {
        //console.log('点击一次');
        const from=this.props.user._id;
        const to = this.props.match.params._id;
        const msg = this.state.text;
        //alert(msg);
        this.setState({text:''});
        this.props.sendMsg({from,to,msg});
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
        const Item =List.Item;
        const chatId=getChatId(userid,this.props.user._id);
        //console.log("chatMsg all-------" ,this.props.chat.chatmsg);
        //this.props.chat.chatmsg()
        let chatMsg = this.props.chat.chatmsg.filter((v)=>(v.chatid===chatId));
        console.log(" before remove duplicative chatMsg ------",chatMsg);
        //const itemIdContainer =new Map();
        const setChatMsg = new Set(chatMsg);
        chatMsg = Array.from(setChatMsg);
        console.log(" After remove duplicative chatMsg ------",chatMsg);
        //let length =chatMsg.length;
        //console.log(chatMsg.length);
        //console.log(chatMsg);
        return (
            <div id='chat-page'>
                <NavBar
                    type='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack();
                        //this.props.upDateUnread();
                        }}
                >{users[userid].name}
                </NavBar>
                <QueueAnim delay={100}>
                {chatMsg.map((item)=> {
                    //console.log(users);
                    //console.log("item        ",item);
                    //console.log(item.from);
                    const userAvatar=item.from?users[item.from].avatar:this.props.user.avatar;
                    const avatar=require(`../../img/${userAvatar}.png`);
                    //console.log(item);
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
                                  //onTouchend={()=>{ alert('发现点击无效') ;return this.handleClick();}}
                                    onClick={()=>this.handleButtonClick()}
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