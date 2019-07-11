import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Result,List,Button,Modal} from 'antd-mobile';
import cookies from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {logoutSubmit}
    )
class User extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        const alert = Modal.alert;
        alert('注销登录', '确定退出吗???', [
            {text: '取消', onPress: () => console.log('取消')},
            {text: '确认', onPress: () => {
                cookies.erase('userid');
                this.props.logoutSubmit();
                }},
        ])
    }
    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = List.Item.Brief;
        return this.props.user ? (
            <div>
                <Result
                    img={<img src={require(`../../img/${props.avatar}.png`)} style={{width: 50}} alt="没头像"/>}
                    title={props.user}
                    message={<div>{props.type === 'boss' ? props.company : null}</div>}
                />
                <List renderHeader={() => "简介"}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资:{props.money}</Brief> : null}
                    </Item>
                </List>
                <Button type='primary' onClick={this.logout}>退出登录</Button>
            </div>
        ) : <Redirect to={this.props.redirecTo}/>;
    }
}
export default User;