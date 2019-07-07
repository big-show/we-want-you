import React,{ Component } from 'react';
import Logo from '../logo/logo';
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile';

class Register extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            type:'boss'
        }
    }
    render()
    {
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type=="boss"}>Boss</RadioItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type=="genius"}>牛人</RadioItem><WhiteSpace/>
                        <Button type='primary'>提交</Button>
            </List>
                </WingBlank>

            </div>
        )
    }
}

export default Register;