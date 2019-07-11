import React ,{ Component }  from 'react';
import {WhiteSpace,Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
@withRouter
class UserCard extends Component{

    handleClick(v)
    {
        this.props.history.push(`/chat/${v._id}`);
    }
    render()
    {
        return (
            <div>
                <WhiteSpace/>
                {this.props.userList.map(v=>(
                    v.avatar?<Card full key={v._id} onClick={()=>this.handleClick(v)}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../../img/${v.avatar}.png`)}
                            extra={v.title}
                        />
                        <Card.Body>
                            {v.type==='boss'?<div>公司:{v.company}</div>:null}
                            <div>{v.desc}</div>
                            {v.type==='boss'?<div>薪水:{v.money}</div>:null}
                        </Card.Body>
                    </Card>:null
                ))}
            </div>
        )
    }
}
export default UserCard;