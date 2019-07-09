import React,{ Component } from 'react';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
@connect(
    state=>state.user,
    { update }
)
class Geniusinfo extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            avatar:'',
            title:'',
            company:'',
            money:'',
            desc:'',
        };
    }
    handleChange(key,val)
    {
        this.setState({
            [key]:val,
        })
    }
    render()
    {
        return(
            <div>
                {this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}
                <NavBar mode="dark">牛人信息完成页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imageName)=>{
                        this.setState({
                            avatar:imageName
                        })
                    }}
                >

                </AvatarSelector>
                <InputItem onChange={(v)=>this.handleChange('title',v)}>应聘职位</InputItem>
                <TextareaItem
                    title="个人简介"
                    autoHeight
                    onChange={(v)=>this.handleChange('desc',v)}>
                </TextareaItem>
                <Button type='primary' onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}
export default Geniusinfo;