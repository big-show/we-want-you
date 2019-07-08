import React ,{ Component } from 'react';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import Logo from '../logo/logo';
import { Redirect } from 'react-router-dom';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
@connect(
    state=>state.user,
    {login}
)
class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
          user:"",
          pwd:"",
        };
        this.register=this.register.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    register()
    {
        console.log(this.props);
        this.props.history.push('/register')
    }
    handleInputChange(type,val)
    {
        this.setState({
            [type]:val
        })
    }
    handleClick()
    {
        this.props.login(this.state);
    }
    render()
    {
        return(
            <div>
                {this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}
                <Logo></Logo>
                {this.props.errMsg?<p className='err_msg'>{this.props.errMsg}</p>:null}
                <WingBlank>
                    <List>
                        <InputItem onChange={(v)=>{this.handleInputChange('user',v)}}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={(v)=>{this.handleInputChange('pwd',v)}}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleClick}>登陆</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}
export default Login;