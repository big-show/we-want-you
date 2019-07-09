import React,{Component} from 'react';
import {Card,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux'
import {getInitUserList} from "../../redux/chatuser.redux";
@connect(
    state=>state.chatuser,
    {getInitUserList}
)
class Boss extends Component{
    // constructor(props)
    // {
    //     super(props);
    //     this.state={
    //     data:[],
    //     }
    // };

    componentDidMount()
    {
        this.props.getInitUserList('genius');
    }
    render()
    {
        // console.log(this.props.userList);
        return (
            <div>
                <WhiteSpace/>
                {this.props.userList.map(v=>(
                    v.avatar?<Card full key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../../img/${v.avatar}.png`)}
                            extra={v.title}
                        />
                        <Card.Body>
                            <div>{v.desc}</div>
                        </Card.Body>
                    </Card>:null
                ))}
        </div>
        )
    }
}
export default Boss;