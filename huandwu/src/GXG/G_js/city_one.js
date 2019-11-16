import React, { Component } from 'react'
import "../G_css/city_one.css"
// import {Link} from "react-router-dom"


export class city_one extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         dw_data:"",
         rm_data:[],
         sy_data:[],
         sy_zm_data:[]
      }
      this.get_dingweidata=this.get_dingweidata.bind(this)
      this.get_remendata = this.get_remendata.bind(this)
      this.get_suoyoudata = this.get_suoyoudata.bind(this)
      this.sort_sydata = this.sort_sydata.bind(this)
    //   this.jp_souch_city = this.jp_souch_city(this)
      this.jp_loginin = this.jp_loginin.bind(this)
    }

    //函数部分

    //定位城市信息获取
    get_dingweidata(){
        console.log(1);
      fetch("https://elm.cangdu.org/v1/cities?type=guess",{
          method:"get"
      }).then((res)=>{
         return res.json()
      }).then((data)=>{
         console.log(data);
         this.setState({
             dw_data:data
         })
      }).catch((err)=>{
         console.log(err)
      })
    }
    //热门城市信息获取
    get_remendata(){
        fetch("https://elm.cangdu.org/v1/cities?type=hot",{
            method:"get"
        }).then((res)=>{
           return res.json()
        }).then((data)=>{
           console.log(data);
        this.setState({
            rm_data:data
        })
        }).catch((err)=>{
           console.log(err)
        })
    }
    //所有城市信息获取
    get_suoyoudata(){
        fetch("https://elm.cangdu.org/v1/cities?type=group",{
          method:"get"
      }).then((res)=>{
         return res.json()
      }).then((data)=>{
         console.log(data);
         this.setState({
             sy_data:data
         },()=>{
             this.sort_sydata()
         })
      }).catch((err)=>{
         console.log(err)
      })
    }
    //所有城市信息排序函数
    sort_sydata(){
        var newarr = Object.keys(this.state.sy_data).sort();
        var newObj={}
        for (var i in newarr){
            // newarr[i]=this.state.sy_data[newarr[i]]
            newObj[newarr[i]]=this.state.sy_data[newarr[i]]
        }
        this.setState({
            sy_data:newObj
        })
    }
    //路由跳转
    jp_souch_city(v){
        console.log(v)
        this.props.history.push({
             pathname:"/lcy_search",
             state:{
                 citydata:v
             }
          }
        )
    }
    
    //登录跳转
    jp_loginin(){
        this.props.history.push({
            pathname:"/login_one"
        })
    }

    //钩子函数部分
   //WARNING! To be deprecated in React v17. Use componentDidMount instead.
   componentWillMount() {
       //定位城市
       this.get_dingweidata();
       //热门城市
       this.get_remendata();
       //所有城市
       this.get_suoyoudata();
   }
   
   componentDidMount() {
       
   }

    render() {
        console.log(this.state.dw_data);
        console.log(typeof(this.state.rm_data));
        console.log(this.state.sy_data);
        console.log(this.state.sy_zm_data);
        return (
            <div>
                <span><i className="el-icon-delete"></i></span>
                {/* 导航窗口 */}   
                <p id="p_title">
                    <span id="sp_R" onClick={this.jp_loginin} >
                           <i className="el-icon-circle-check"></i>
                    </span>
                    <span id="sp_L" >
                        ele.me
                    </span>
                </p>
                {/* 定位城市 */}
                <ul id="ul_dw" >
                    <li id="li_dw_0">当前定位城市: <span>定位不准时请在城市列表中选择</span> </li>
                    <li id="li_dw_1" onClick={this.jp_souch_city.bind(this,this.state.dw_data)}>
                        <span id="sp_dw_0" >{this.state.dw_data?"":this.state.dw_data.name}</span> 
                        <span id="sp_dw_1" ><i className="el-icon-arrow-right"></i></span>
                    </li>
                </ul>
                {/* 热门城市 */}
                <div id="rm">
                    <p id="p_rm">热门城市</p>
                    {
                        this.state.rm_data.map((v,i)=>{
                            return (
                               <span onClick={this.jp_souch_city.bind(this,v)} key={i}>{v.name}</span>
                            )
                        })
                    }
                </div>
                {/* 所有城市 */}
                <div id="sy">
                    {
                         Object.keys(this.state.sy_data).map((v,i)=>{
                             return (
                                 <div key={i}>
                                       <p  className="p_sy">{v}</p>
                                       {
                                           
                                           this.state.sy_data[v].map((y,x)=>{
                                               return (
                                                    <span onClick={this.jp_souch_city.bind(this,y)} key={x}>{y.name}</span>
                                                )
                                           })
                                        }
                                 </div>
                             )
                         })
                    }
                </div>
            </div>
        )
    }
}

export default city_one
