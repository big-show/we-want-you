import React,{Component} from 'react';
import {connect} from 'react-redux'
import {getInitUserList} from "../../redux/chatuser.redux";
import UserCard from "../usercard/usercard";
@connect(
    state=>state.chatuser,
    {getInitUserList}
)
class Genius extends Component{


    componentDidMount()
    {
        this.props.getInitUserList('boss');
    }
    render()
    {
        // console.log(this.props.userList);
        return (
            <div>
                <UserCard userList={this.props.userList}></UserCard>
            </div>
        )
    }
}
export default Genius;