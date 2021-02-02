import React,{Component} from 'react'
import { Statistic, Row, Col } from 'antd';

import timeDifference from "../../util/time_difference";



export default class Main extends  Component{
  state = {
    time:'',
  }
  componentDidMount() {
    setInterval(()=>{
     const time = timeDifference('2020-08-01 00:00:00')
     this.setState({
        time
      })
    },1000)
  }


    render() {
    const {time} = this.state
        return (
          <div>
              <Row gutter={16}>
                  <Col span={24} style={{ marginTop: 32 }}>
                    <div
                      style={{fontSize:20}}
                    >网站已运行: {time}</div>
                  </Col>
              </Row>
          </div>
        )
    }
}
