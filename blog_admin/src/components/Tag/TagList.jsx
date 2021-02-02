/**
 * 标签列表及编辑
 */
import React,{Component} from 'react'
import {Form, Input, Modal, Table,  Tag, Button, message} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'

import {deleteOne, getList, updateOne} from "../../http";

export default class TagList extends  Component{
  state = {
    dataSource: [],
    tag_name: '',
    index:'',
    id:'',
    visible: false,
  }

  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "标签名称",
      dataIndex: "tag_name",
      key: "tag_name",
      render: (text, record, index) => (
        <Tag color="blue">{record.tag_name}</Tag>
      ),
    },
    {
      title: "标签序号",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => (
        <Tag color="blue">{record.index}</Tag>
      ),
    },
    {
      title: "创建日期",
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
    this.getTagList()
  }

  getTagList = async ()=>{
    const res = await getList("tag");
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    let data = res.data.data;
    let result = res.data.data;
    result.forEach((v, i) => {
      v.createAt = dayjs(v.createdAt).format('YYYY-MM-DD HH:MM')
      v.key = i + 1;
    });
    this.setState({
      dataSource: result,
      data
    });
  }

  delete = (text, record, index) => {
    const id = record._id;
    console.log(record)
    const { tag_name } = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除分类${tag_name}吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        await deleteOne("tag", id);
        message.success('数据删除成功',1)
        const res1 = await getList("tag");
        let result = res1.data.data;
        result.forEach((v, i) => {
          v.key = v._id;
        });
        this.setState({
          dataSource: result,
        });
      },
    });
  };



  showModal = (text, record) => {
    const {tag_name,index} = record
    const id = record._id
    this.setState({
      visible: true,
      tag_name,
      id,
      index
    });
  };

  handleOk =async () => {
    const { tag_name ,id,index} = this.state;
    await updateOne({ tag_name ,index}, "tag", id);
    this.getTagList()
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

  render() {
    const {dataSource,tag_name,index} = this.state
        return (
          <div>
              <Table
                bordered
                dataSource={dataSource} columns={this.columns} />
              <Modal
                cancelText="取消"
                okText="编辑"
                title="分类编辑"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                  <div className="m-15">
                      <Form.Item
                        label="标签名称"
                      >
                          <Input
                            value={tag_name}
                            placeholder="请重新修改标签名称"
                            allowClear
                            onChange={(e) => {
                                this.setState({
                                    tag_name:e.target.value
                                })
                            }}
                          />
                      </Form.Item>
                  </div>
                <div className="m-15">
                  <Form.Item
                    label="标签序号"
                  >
                    <Input
                      value={index}
                      placeholder="请重新修改标签名称"
                      allowClear
                      onChange={(e) => {
                        this.setState({
                          index:e.target.value
                        })
                      }}
                    />
                  </Form.Item>
                </div>
              </Modal>
          </div>
        )
    }
}
