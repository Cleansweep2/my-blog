/**
 * 图片列表及编辑
 */

import React,{Component} from 'react'
import {Button, Form, Input, message, Modal, Table} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'

import {deleteOne, getList, updateOne} from "../../http";


export default class swiperList extends  Component{
  state =  {
    imgUrl:'',
    desc:'',
    _id:'',
    data:[],
    dataSource:[]
  }
  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "图片",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (text, record, index) => (
        <img style={{height:64,width:128}} src={record.imgUrl}/>
      ),
    },
    {
      title: "图片描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "展示地点",
      dataIndex: "localtion",
      key: "localtion",
    },
    {
      title: "图片作者",
      dataIndex: "author",
      key: "author",
      render: (text, record, index) => (
        <div>
          {record.author}
        </div>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, index) => (
        <div>
          <div>
            <Button onClick={()=>this.showModal(text, record, index)} >编辑</Button>
            <Button style={{marginLeft:'5px'}} onClick={() => this.delete(text, record, index)}>删除</Button>
          </div>
        </div>
      ),
    },
  ];

  componentDidMount() {
      this.getImageList()
  }

  //获取所有的图片列表
  getImageList =async () =>{
    const res = await getList("image");
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    let data = res.data.data
    let result = res.data.data;
    result.forEach((v, i) => {
      v.createAt = dayjs(v.createdAt).format('YYYY-MM-DD HH:MM')
      v.key = v._id;
    });
    this.setState({
      dataSource: result,
      data
    });
  }


  showModal = (text, record, index) => {
    const {desc,imgUrl,_id} = record
    this.setState({
      visible: true,
      desc,
      imgUrl,
      _id
    });
  };

  handleOk =async () => {
    const { imgUrl,desc,_id} = this.state;
    await updateOne({ imgUrl,desc}, "image", _id);
    this.getImageList()
    message.success("修改成功", 1);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  Select = (parent) => {
    this.setState({
      parent,
    });
  }

  delete = (text, record, index) => {
    const id = record._id;
    const { desc } = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除轮播图${desc}吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        await deleteOne("image", id);
        message.success('数据删除成功',1)
        this.getImageList()
      },
    });
  };

    render() {
      const { dataSource ,imgUrl,desc} = this.state;
      return (
        <div>
          <Table
            bordered
            dataSource={dataSource} columns={this.columns} />
          <Modal
            cancelText="取消"
            okText="编辑"
            title="轮播图编辑"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div className="m-15">
              <Form.Item
                label="图片地址"
              >
                <Input
                  value={imgUrl}
                  placeholder="请重新选择分类"
                  allowClear
                  onChange={(e) => {
                    this.setState({
                      imgUrl:e.target.value
                    })
                  }}
                />
              </Form.Item>
            </div>
            <div className="m-15">
              {imgUrl ? <div>
                <img  style={{maxWidth:500,maxHeight:500}} src={imgUrl}/>
              </div> : <div>填入路径后会有预览效果哦!</div>}
            </div>
            <div className="m-15">
              <Form.Item
                label="图片描述"
              >
                <Input
                  value={desc}
                  placeholder="请重新选择分类"
                  allowClear
                  onChange={(e) => {
                    this.setState({
                      desc:e.target.value
                    })
                  }}
                />
              </Form.Item>
            </div>
          </Modal>
        </div>
      );
    }
}
