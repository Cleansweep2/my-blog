/**
 * 时间轴创建页面
 */

import React,{Component} from 'react'
import {Button, Form, Input, message,Select } from "antd";

import {addData} from "../../http";

const {Option} = Select

export default class CreateCourse extends  Component{
  state = {
    title:'',
    content:'',
    is_finish:1,
    start:'',
    end:'',
    loading: false,
  };
  //保存
  save = async () => {
    const { title , content ,is_finish,start,end} = this.state;
    const res = await addData({ title , content ,is_finish,start,end},'course');
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    this.setState({
      title:'' ,
      content:'',
      start:'',
      end:'',
    })
    message.success('保存成功', 1);
  };

  //选择是否完成的时候触发
  Select = (is_finish) =>{
    this.setState({
      is_finish,
    })
  }
  render() {
    const { title,content,start,end} = this.state;
    return (
      <div>
        <div className="m-15">
            <Select
              style={{minWidth:300}}
              showSearch
              allowClear
              placeholder="是否完成"
              optionFilterProp="children"
              onChange={this.Select}
            >
                  <Option value={0} >
                    完成
                  </Option>
              <Option value={1} >
                未完成
              </Option>
            </Select>
        </div>
        <div className="m-15">
          <Form.Item
            label="标题"
          >
            <Input
              value={title}
              placeholder="请输入时间轴标题"
              allowClear
              onChange={(e) => {
                this.setState({
                  title:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="内容"
          >
            <Input
              value={content}
              placeholder="请输入时间轴内容"
              allowClear
              onChange={(e) => {
                this.setState({
                  content:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="开始时间"
          >
            <Input
              value={start}
              placeholder="请输入节点开始时间 格式为 YYYY-MM-DD HH:MM"
              allowClear
              onChange={(e) => {
                this.setState({
                  start:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="结束时间"
          >
            <Input
              value={end}
              placeholder="请输入节点结束时间 格式为 YYYY-MM-DD HH:MM"
              allowClear
              onChange={(e) => {
                this.setState({
                  end:e.target.value
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
    );
  }
}
