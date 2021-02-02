/**
 * 分类创建页面
 */
import React, { Component } from "react";
import {message, Input, Button, Select, Form, Modal, Table} from "antd";
import {
  PlusOutlined
} from '@ant-design/icons';

import {addData, deleteOne, getList} from "../../http/index";
import dayjs from "dayjs";

const { Option } = Select;




class Link extends Component {
  state = {
    data:[],
    name:'',
    link:'',
    loading: false,
    visible: false,
    dataSource:[]
  };

  async componentDidMount(){
    await this.getLinks()
  }
  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "友链名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "友链路径",
      dataIndex: "link",
      key: "link"
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      key: "createAt"
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, index) => (
        <div>
          <Button style={{marginLeft:'5px'}} onClick={() => this.delete(text, record, index)}>删除</Button>
        </div>
      ),
    },
  ];

  //删除的时候触发
  delete = async (text, record, index)=>{
    const {_id} = record
    await deleteOne('link',_id)
    this.getLinks()
  }

  //获取分类列表
  getLinks = async ()=>{
    const res = await getList("link");
    const {errCode} = res.data
    const msg = res.data.message
    if (errCode === 7) {
      return message.error(msg, 1);
    }
    let result = res.data.data;
    result.forEach((v, i) => {
      v.createAt = dayjs(v.createdAt).format('YYYY-MM-DD HH:MM')
      v.key = v._id
    });
    this.setState({
      dataSource: result,
    });
  }


  //显示弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  //弹出狂确定的时候触发
  handleOk = async () => {
    const { name , link } = this.state;
    await addData({ name , link},'link');
    this.setState({
      name:'',
      link:''
    })
    this.getLinks()
    message.success("添加友链成功", 1);
    this.setState({
      visible: false,
      name:'',
      link:''
    });
  };

  //弹出框取消的时候触发
  handleCancel = e => {
    this.setState({
      visible: false,
    })

  }


  render() {
    const { name ,  data,link,dataSource} = this.state;
    return (
      <div>
        <div className="my-diary-row" style={{borderBottom: '1px solid rgb(240, 240, 240)',paddingBottom:20}}>
        <Button icon={<PlusOutlined />} onClick={()=>this.showModal()}>添加友链</Button>
        </div>
        <Modal
          cancelText="取消"
          okText="确定"
          title="友链添加"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="m-15">
            <Form.Item
              label="友链名称"
            >
              <Input
                value={name}
                placeholder="请输入友链名称"
                allowClear
                onChange={(e) => {
                  this.setState({
                    name:e.target.value
                  })
                }}
              />
            </Form.Item>
          </div>
          <div className="m-15">
            <Form.Item
              label="友链地址"
            >
              <Input
                value={link}
                placeholder="请输入友链地址"
                allowClear
                onChange={(e) => {
                  this.setState({
                    link:e.target.value
                  })
                }}
              />
            </Form.Item>
          </div>
        </Modal>
        <Table
          pagination={{
            defaultCurrent:1,
            pageSize:4,
            hideOnSinglePage:true
          }}
          dataSource={dataSource} columns={this.columns} />
      </div>
    );
  }
}


export default Link
