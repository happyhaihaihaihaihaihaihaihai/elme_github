/*
 * @Author: your name
 * @Date: 2019-11-16 10:51:21
 * @LastEditTime: 2019-11-16 11:23:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \woshihuge\huandwu\src\router.js
 */
import React, { Component } from 'react'
import {Route} from "react-router-dom"

import City_one from "./GXG/G_js/city_one"
import Lcy_search from "./HUGE/lcy_search"
import Login_one from "./GXG/G_js/login_one"



export class router extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    render() {
        return (
            <div className="one">
                {/* 出口路径 */}
                <Route exact path="/" component={City_one} ></Route>
                <Route path="/city_one" component={City_one} ></Route>
                <Route path="/login_one" component={Login_one}></Route>

                <Route path="/lcy_search" component={Lcy_search} ></Route>
            </div>
        )
    }
}

export default router
