import React, { Component } from 'react'
import {Route} from "react-router-dom"

import City_one from "./GXG/G_js/city_one"




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
            </div>
        )
    }
}

export default router
