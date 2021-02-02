/**
 * 个人日记编辑页面
 */

import React,{Component} from 'react'
import { Comment, message,  Tooltip, Button, Form, Input, Modal,Divider,Select} from "antd";
import dayjs from "dayjs";

import {addData,getList,deleteOne} from "../../http";

import {
  PlusOutlined
} from '@ant-design/icons';
const TextArea = Input
const {Option} = Select

export default class MyDiary extends  Component{
  state = {
    visible:false,
    diaryList:[{}],
    title:'',
    content:'',
    author:'',
    data:[]
  }

  componentDidMount() {
    this.getDiaryList()
    this.getUserList()
  }

  //获取用户列表
  getUserList =async ()=> {
    const res = await getList("user");
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    let result = res.data.data;
    result.forEach((v,i)=>{
      if(!v.isAdmin)
      {
        result.splice(i,1)
      }
    })
    this.setState({
      data: result,
    });
  }

  //获取日记列表
  getDiaryList = async ()=>{
    const res = await getList('diary')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    const result = res.data.data
    this.setState({
      diaryList:result
    })
  }

  //删除的时候触发
  delete = async (i)=>{
    const {_id} = this.state.diaryList[i]
    await deleteOne('diary',_id)
    this.getDiaryList()
  }


  //显示弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  //弹出狂确定的时候触发
  handleOk = async () => {
    const {content,author} = this.state
    const res = await addData({content,author},'diary')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 6)
    {
      return message.error(msg, 1);
    }
    this.getDiaryList()
    message.success("日记添加成功", 1);
    this.setState({
      visible: false,
      content:''
    });
  };

  //弹出框取消的时候触发
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  //选择作者的时候触发
  select = (author)=>{
    this.setState({
      author
    })
  }




  render() {
    const {content,diaryList,data} = this.state
    return (
      <div className="my-diary">
        <div className="my-diary-row" style={{borderBottom: '1px solid rgb(240, 240, 240)',paddingBottom:20}}>
          <Button icon={<PlusOutlined />} onClick={()=>this.showModal()}>写日记</Button>
        </div>
        <Modal
          cancelText="取消"
          okText="确定"
          title="日记编写"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ marginBottom: 15 }}>
            <Form.Item
              label="作者"
            >
              <Select
                showSearch
                placeholder="请写入日记作者"
                optionFilterProp="children"
                onChange={this.select}
                allowClear
              >
                {data.map((v) => {
                  return (
                    <Option value={v._id} key={v._id}>
                      {v.userName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="m-15">
            <Form.Item
              label="日记内容"
            >
              <TextArea
                value={content}
                placeholder="请写入日记内容"
                allowClear
                onChange={(e) => {
                  this.setState({
                    content:e.target.value
                  })
                }}
              />
            </Form.Item>
          </div>
        </Modal>
        {
          diaryList.map((v,i)=>{
            return (
              <div
                key={i}
                 style={{width:'60vw',paddingTop:20}}>
                <Comment
                  style={{ marginBottom: 15 }}
                  author={<a>{v.author && v.author.userName}</a>}
                  content={
                    <p style={{fontSize:'15px'}}>
                      {v.content}
                    </p>
                  }
                  datetime={
                    <Tooltip >
                      {dayjs(v.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </Tooltip>
                  }
                />
                <div className="an">
                  <Button type="primary" onClick={()=>{this.delete(i)}} danger>
                    删除
                  </Button>
                </div>
                <Divider dashed />
              </div>
            )
          })
        }
      </div>

    )
  }
}