/**
 * 个人信息的编辑
 */
import React,{Component} from 'react'
import {message, Tag, Button,  Modal, Divider, Select, Form} from "antd";


import {addData,getList,deleteOne,updateOne} from "../../http";
import {
  EditOutlined
} from '@ant-design/icons';
import Editor from "for-editor";



const {Option} = Select

export default class MyInfo extends  Component{
  state = {
    visible:false,
    visible1:false,
    content:'',
    content1:'',
    isShow:'',
    _id:'',
    infos:[],
  }



  componentDidMount() {
    this.getInfo()
  }

  //获取所有个人信息列表
  getInfo = async ()=>{
    const res = await getList('info')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    const result = res.data.data
    this.setState({
      infos:result
    })
  }

  //删除某个个人信息
  delete = async(i)=>{
    const {_id} = this.state.infos[i]
    await deleteOne('info',_id)
    this.getInfo()
    message.success("删除成功", 1);
  }

  //显示弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //弹出框确定的时候触发
  handleOk = async () => {
    const {content,content1} = this.state
    const res = await addData({content,content1},'info')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 6)
    {
      return message.error(msg, 1);
    }else if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    this.getInfo()
    message.success("信息添加成功", 1);
    this.setState({
      visible: false,
      content:'',
      content1: ''
    });
  };


  //弹出框取消的时候触发
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };



  //富文本编辑的时候触发
  handleEditor = (content1) => {
    
    this.setState({
      content1
    })
    setTimeout(()=>{
      let content = document.querySelector('.for-preview').innerHTML
      this.setState({
        content,
      })
    })
  }



  //选择是否在前端展示
  select =async (isShow,id)=>{
    console.log(isShow,id)
    await updateOne({isShow},'info',id)
    await this.getInfo()
    message.success("设置成功", 1);
    this.setState({
      isShow:'',
    })
  }


  render() {
    const {content1,infos,isShow} = this.state
    return (
      <div className="my-diary">
        <div className="my-diary-row" style={{borderBottom: '1px solid rgb(240, 240, 240)',paddingBottom:20}}>
          <Button icon={<EditOutlined />} onClick={()=>this.showModal()}>编写个人信息</Button>
        </div>
        <Modal
          cancelText="取消"
          okText="确定"
          title="个人信息编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div  className="jumpUrl m-15">
            <div  className="my-component m-20">
              <Editor value={content1} onChange={this.handleEditor} />
            </div>
          </div>
        </Modal>
        <div className="my-info-list" style={{marginTop:20,display:'flex','alignItems':'center'}}>
          <div>
            {infos.map((v,i)=>{
              return (
                <div key={v._id}>
                  <div dangerouslySetInnerHTML={{__html: v.content}} className="info-item">
                  </div>
                  <div style={{display:'flex',alignItem:'center',justifyContent:'flex-end',width:'60vw'}}>
                     <span style={{marginRight:'13px'}}>
                        状态:&nbsp;&nbsp;&nbsp; {v.isShow ? <Tag color="green">已在客户端展示</Tag> :<Tag color="red">未在客户端显示</Tag>}
                      </span>
                    <div style={{ marginBottom: 15 }}>
                      <Form.Item
                        label="是否显示"
                      >
                        <Select
                          style={{minWidth:400}}
                          value={isShow}
                          showSearch
                          placeholder="是否在客户端显示此信息， === 注本页信息只能显示一个"
                          optionFilterProp="children"
                          onChange={(isShow)=>{this.select(isShow,v._id)}}
                          allowClear
                        >
                          <Option value={true}>
                            是
                          </Option>
                          <Option value={false}>
                            否
                          </Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <Button className="m-l-20" type="primary" onClick={()=>{this.delete(i)}} danger>
                      删除
                    </Button>
                  </div>
                  <Divider dashed />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}