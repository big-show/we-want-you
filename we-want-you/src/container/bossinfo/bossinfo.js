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
class Bossinfo extends Component{
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
                <NavBar mode="dark">Boss信息完成页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imageName)=>{
                        this.setState({
                            avatar:imageName
                        })
                    }}
                >

                </AvatarSelector>
                <InputItem onChange={(v)=>this.handleChange('title',v)}>招聘职位</InputItem>
                <InputItem onChange={(v)=>this.handleChange('company',v)}>公司名称</InputItem>
                <InputItem onChange={(v)=>this.handleChange('money',v)}>职位薪水</InputItem>
                <TextareaItem
                    title="职位要求"
                    autoHeight
                 onChange={(v)=>this.handleChange('desc',v)}>
                </TextareaItem>
                <Button type='primary' onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}
export default Bossinfo;