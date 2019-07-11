import React,{ Component } from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {register} from "../../redux/user.redux";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
@connect(
    state=>state.user,
    {register}
)


class Register extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            user:'',
            pwd:'',
            repeatPwd:'',
            type:'boss'
        };
        this.handleInputSubmit=this.handleInputSubmit.bind(this);
    }
    handleInputChange(key,val)
    {
        this.setState({
            [key]:val
        })
    }
    handleInputSubmit()
    {
        this.props.register(this.state);
    }
    render()
    {
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                {this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        {this.props.errMsg?<p className='err_msg'>{this.props.errMsg}</p>:null}
                        <InputItem onChange={v=>this.handleInputChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password'onChange={(v)=>this.handleInputChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={(v)=>this.handleInputChange('repeatPwd',v)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type==="boss"} onChange={(v)=>this.handleInputChange('type','boss')}>Boss</RadioItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type==="genius"} onChange={(v)=>this.handleInputChange('type','genius')}>牛人</RadioItem><WhiteSpace/>
                        <Button type='primary' onClick={this.handleInputSubmit}>提交</Button>
            </List>
                </WingBlank>

            </div>
        )
    }
}

export default Register;