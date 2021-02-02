/**
 * 标签创建页面
 */
import React,{Component} from 'react'
import {Button, Form, Input, message} from "antd";

import {addData} from "../../http";

class CreateTag extends  Component{
  state = {
    tag_name:'',
    index:'',
  }
  //保存
  save = async () =>{
    const {tag_name,index} = this.state
    const res = await addData({tag_name,index},'tag')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    message.success('保存成功', 1);
    this.setState({
      tag_name:'',
      index:''
    })
  }
    render() {
    const {tag_name,index} = this.state
        return (
          <div>
            <div className="m-15">
              <Form.Item
                label="标签名称"
              >
                <Input
                  value={tag_name}
                  placeholder="请输入标签名称"
                  allowClear
                  onChange={(e) => {
                    this.setState({
                      tag_name:e.target.value
                    })
                  }}
                />
              </Form.Item>
              <Form.Item
                label="标签序号"
              >
                <Input
                  value={index}
                  placeholder="请输入标签序号 数字"
                  allowClear
                  onChange={(e) => {
                    this.setState({
                      index:e.target.value
                    })
                  }}
                />
              </Form.Item>
            </div>
            <div className="save">
              <Button type="primary" onClick={this.save}>
                保存
              </Button>
            </div>
          </div>
        )
    }
}
export default CreateTag