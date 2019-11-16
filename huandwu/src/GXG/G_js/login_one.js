import React, { Component } from 'react'
import "../G_css/login_one.css"
import { Tooltip,Switch } from 'element-react';

import 'element-theme-default';



export class login_one extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_value: "",
            mima_value: "",
            yanzheng_value: "",
            img_data: "",
            mima_type: "password",
            value:false
        }
        this.get_imgdata = this.get_imgdata.bind(this)
        this.kaiguan_bind = this.kaiguan_bind.bind(this)
        this.change_img=this.change_img.bind(this)
        this.get_dl=this.get_dl.bind(this)
        this.get_userdata=this.get_userdata.bind(this)
        this.jp_city = this.jp_city.bind(this)
    }


    //验证码数据请求函数
    get_imgdata() {
        fetch("http://elm.cangdu.org/v1/captchas", {
            method: "post",
            //引用cookie 处理缓存
            credentials:"include",
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data);
            this.setState({
                img_data: data
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    //点击看不清按钮切换验证码函数
    change_img() {
        this.get_imgdata()
    }
    //钩子函数部分
    componentWillMount() {
        this.get_imgdata();
    }
    //双向数据绑定user输入框
    user_bind(e) {
        this.setState({
            user_value: e.target.value
        })
    }
    //双向数据绑定密码框
    mima_bind(e) {
        this.setState({
            mima_value: e.target.value
        })
    }
    //双向数据绑定验证码框
    yanzheng_bind(e) {
        this.setState({
            yanzheng_value: e.target.value
        })
    }
    //开关函数
    kaiguan_bind(){
        this.setState((sta)=>{
           return {
               value:!sta.value
            }
        },()=>{
            if(this.state.value){
                this.setState({
                    mima_type:"text"
                })
            }else{
                this.setState({
                    mima_type:"password"
                })
            }
        })
        
    }
    //登录函数
    get_dl(){
        fetch("https://elm.cangdu.org/v2/login",{
            method:"POST",
            //引用cookie 处理缓存
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username :this.state.user_value,
                password :this.state.mima_value,
                captcha_code:this.state.yanzheng_value
            })
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            this.get_userdata();
        }).catch((err)=>{
            console.log(err)
        })
    }
    //获取用户信息函数
    get_userdata(){
        fetch("https://elm.cangdu.org/v1/user",{
            method:"get"
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    //返回城市列表路由函数
    jp_city(){
        this.props.history.push({
            pathname:"/city_one"
        })
    }

    render() {
        console.log(this.state.user_value);
        console.log(this.state.mima_value);
        console.log(this.state.yanzheng_value);
        console.log(this.state.value);
        return (
            <div>
                {/* 导航部分 */}
                <p id="login_title">
                    <span onClick={this.jp_city}><i className="el-icon-arrow-left"></i></span>
                    <span>密码登录</span>
                </p>
                {/* 输入框部分 */}
                <div id="login_inp">
                    <input value={this.state.user_value} onChange={this.user_bind.bind(this)} type="text" placeholder="用户名"></input>
                    <input value={this.state.mima_value} onChange={this.mima_bind.bind(this)} type={this.state.mima_type} placeholder="密码"></input>
                    <p>
                        <input value={this.state.yanzheng_value} onChange={this.yanzheng_bind.bind(this)} type="text" placeholder="验证码"></input>
                        <span>
                            <img src={this.state.img_data.code} />
                            <button onClick={this.change_img}>看不清 换一张</button>
                        </span>
                    </p>
                        <Switch
                            value={this.state.value}
                            onColor=""
                            offColor=""
                            onValue={true}
                            offValue={false}
                            onChange={this.kaiguan_bind}
                            style={{
                                position:"absolute",
                                top:"0.65rem",
                                left:"3rem",
                            }}
                        >
                        </Switch>
                </div>
                <p className="login_p">温馨提示:未注册过的账号，登录时将自动注册</p>
                <p className="login_p">注册过的用户可凭账号密码登录</p>
                <button id="login_btn" onClick={this.get_dl}>登录</button>
                <p id="login_cz">重置密码?</p>
            </div>
        )
    }
}

export default login_one
