/*
 * @Author: your name
 * @Date: 2019-11-14 15:59:58
 * @LastEditTime: 2019-11-15 15:24:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactele\src\lcy_search.js
 */
import React, { Component } from 'react'


import "./lcy_search.css"


import { Button } from 'element-react';
export class lcy_search extends Component {
constructor(props) {
    super(props)

    this.state = {
        id:1 ,
        input:"",
        dataArr:[],
        city:"",
        bol:false,
        historyData:[],
        historyBol:true
    }
    this.search_shuju=this.search_shuju.bind(this)
    this.search_empty=this.search_empty.bind(this)
}

componentWillMount(){
    if(localStorage.asd){
        this.setState({
            historyData:JSON.parse(localStorage.getItem('asd'))
        })
    }else{
        this.setState({
            historyBol:false
        })
    }
    

}

    // fetch网络请求
  search_shuju(){
      this.setState({
          bol:true
      })
      console.log(this.state.id);
       fetch("https://elm.cangdu.org/v1/pois?city_id="+this.state.id+"&keyword="+this.state.input,{method:"get"}).then(
      res=>{
      return res.json();
      }
  ).then(
      data=>{
        //   网络请求到的数据
          console.log(data);
          this.setState({          
             dataArr:data       
         },()=>{
          console.log(this.state.dataArr)
         })
       
      }
  ).catch();
 
}
//获取所选城市
select_city(){
    this.id=localStorage.id;
    fetch("https://elm.cangdu.org/v1/cities/"+this.id,{ method:"get"})
    .then(
        res=>{
        return res.json();
        }
    ).then(
        data=>{
          //   网络请求到的数据
            console.log(data);
            this.setState({
           city:data.name
           },()=>{
            console.log(this.state.dataArr)
           })
         
        }
    ).catch();
}
sendMsg(v){
this.state.historyData.push(v);
console.log(this.state.historyData);
localStorage.setItem("asd",JSON.stringify(this.state.historyData));

}
//清空历史
search_empty(){
    this.setState({
        historyBol:false
    })
   localStorage.asd=[];
}
    render() {
        return (
            <div>
                {/* 搜索页面头部 */}
                <header className="head">
                    <span className="search_left"><i className="el-icon-arrow-left"></i></span>
                    <span className="search_city">郑州</span>
                    <span className="search_changecity">切换城市</span>                  
                </header>
                 {/* 搜索页面输入框和提交按钮 */}
                <center>
                <input value={this.state.input} onChange={e => this.setState({input:e.target.value})} type="text" placeholder="输入学校、商务楼、地址" id="seach_inputbox" />
                <Button onClick={this.search_shuju} className="search_btn">提交</Button>
                </center>
                {/* 搜索出来的地址数据 */}
                <footer>
                    <p className="search_history">搜索历史</p> 
                    { 
                    this.state.historyBol ? <div>
                    {
                       this.state.historyData.map((v,i)=>{
                           return(
                           <div onClick={this.sendMsg.bind(this,v)} className="search_div" key={i}>
                           <p className="p3">{v.name}</p>
                           <p className="p4">{v.address}</p>
                           </div>
                           )                         
                       })    
                       } 
                       <p onClick={this.search_empty} className="p5">清空所有</p> 
                       </div> : null   
                       }     
                </footer>
                {/* 搜索信息 */}
               {
                   this.state.bol ?  <ul className="search_ul">            
                   {
                   this.state.dataArr.map((v,i)=>{
                       return(
                       <li onClick={this.sendMsg.bind(this,v)} className="search_li" key={i}>
                       <p className="p1">{v.name}</p>
                       <p className="p2">{v.address}</p>
                       </li>
                       )                         
                   })    
                   }
             
            </ul> : null
               }
            </div>
        )
    }
}

export default lcy_search
