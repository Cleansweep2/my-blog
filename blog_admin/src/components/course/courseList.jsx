/**
 * 时间轴列表及编辑页面
 */
import React,{Component} from 'react'
import {Button, Form, Input, message, Modal, Select, Table, Tag} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'

import {getList, deleteOne,  updateOne} from "../../http";

const {Option} = Select



export default class CourseList  extends  Component{
  state = {
    dataSource:[],
    title:'',
    content:'',
    start:'',
    end:'',
    id:'',
    is_finish:1,
    loading: false,
  };

  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title:'标题',
      dataIndex: "title",
      key: "title",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      render: (text, record, index) => (
        <div style={{maxWidth:400}}>
          {record.content}
        </div>
      ),
    },
    {
      title: "开始时间",
      dataIndex: "start",
      key: "start",
      render: (text, record, index) => (
        <span>{dayjs(record.start).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: "结束时间",
      dataIndex: "end",
      key: "end",
      render: (text, record, index) => (
        record.end ? <span>{dayjs(record.end).format('YYYY-MM-DD')}</span> : <Tag color="error"></Tag>
      ),
    },
    {
      title: "是否完成",
      dataIndex: "is_finish",
      key: "is_finish",
      render: (text, record, index) => (
        record.is_finish === 0 ? <Tag color="success" >节点已完成</Tag> : <Tag color="error">节点未完成</Tag>
      ),
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

  showModal = (text, record, index) => {
    const {title,content,is_finish,start,end} = record
    const id = record._id
    this.setState({
      visible: true,
      title,
      content,
      is_finish,
      start,
      end,
      id
    });
  };

  handleOk =async () => {
    const {title,content,is_finish,start,end,id} = this.state;
    await updateOne({ title,content,is_finish,start,end,}, "course", id);
    this.getCourseList()
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

  delete = (text, record, index) => {
    const id = record._id;
    const { title } = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除节点${title}吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        await deleteOne("course", id);
        message.success('数据删除成功',1)
        this.getCourseList()
      },
    });
  };

  //保存
   componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async ()=>{
    const res = await getList('course')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    const result = res.data.data
    result.forEach((v, i) => {
      v.key = v._id;
    });
    this.setState({
      dataSource: result,
    });
  }

  render() {
     const {dataSource,title,content,start,end,is_finish} = this.state
    return (
    <div>
      <Table
        bordered
        dataSource={dataSource} columns={this.columns} />
      <Modal
     cancelText="取消"
     okText="编辑"
     title="节点编辑"
    visible={this.state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
      >
        <div className="m-15">
      <Form.Item
    label="是否完成"
      >
        <Select
          style={{minWidth:300}}
          value={is_finish}
          showSearch
          allowClear
          placeholder="是否完成"
          optionFilterProp="children"
          onChange={(is_finish)=>{
            this.setState({
              is_finish,
            })
          }}
        >
          <Option value={0} >
            完成
          </Option>
          <Option value={1} >
            未完成
          </Option>
        </Select>
     </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="标题"
          >
            <Input
              value={title}
              placeholder="请输入修改后的时间轴标题"
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
              placeholder="请输入修改后的时间轴内容"
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
              placeholder="请输入修改后的节点开始时间 格式为 YYYY-MM-DD HH:MM"
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
              placeholder="请输入修改后的节点结束时间 格式为 YYYY-MM-DD HH:MM"
              allowClear
              onChange={(e) => {
                this.setState({
                  end:e.target.value
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





