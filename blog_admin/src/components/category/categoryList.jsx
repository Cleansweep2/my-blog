/**
 * 分类列表 及编辑
 */
//第三方包
import React, { Component } from "react";
import {Table, Button, Modal, message, Form, Select, Input,Tag} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'

import {getList, deleteOne, updateOne} from "../../http";

const { Option } = Select;

class CategoryList extends Component {
  state = {
    dataSource: [],
    visible: false,
    data:[],
    parent:'',
    name:'',
    id:''

  };

  //列表展示的数据
  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "上级分类",
      dataIndex: "parent",
      key: "parent",
      render: (text, record, index) => (
      <Tag color="blue">{record.parent && record.parent.name}</Tag>
      ),
    },
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <Tag color="green">{record.name}</Tag>
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

  //获取列表
  async componentDidMount() {
    this.getCategoryList()
  }


  //获取分类的列表
  getCategoryList =async () =>{
    const res = await getList("category");
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

  //显示弹出框的时候展示
  showModal = (text, record, index) => {
    const parent = record.parent
    const name = record.name
    const id = record._id
    this.setState({
      visible: true,
      parent:parent ? parent :'',
      name,
      id
    });
  };

  //弹出框确定的时候展示
  handleOk =async () => {
    const { parent, name ,id} = this.state;
    if (parent) {
      await updateOne({ parent, name }, "category", id);
    } else {
      await updateOne({ name }, "category", id);
    }
    this.getCategoryList()
    message.success("修改成功", 1);
    this.setState({
      visible: false,
    });
  };

  //弹出框确定的时候展示
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
    const { name } = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除分类${name}吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        deleteOne("category", id);
        message.success('数据删除成功',1)
        this.getCategoryList()
      },
    });
  };
  render() {
    const { dataSource ,data ,parent,name} = this.state;
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
          <p>
            <Form.Item
              label="父级分类"
            >
              <Select
                value={parent.name}
                showSearch
                placeholder="请重新选择一个上级分类"
                optionFilterProp="children"
                onChange={this.Select}
              >
                {data.map((v, i) => {
                  return (
                    <Option value={v._id} key={v._id}>
                      {v.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </p>
          <div className="m-15">
            <Form.Item
              label="分类名称"
            >
              <Input
                value={name}
                placeholder="请重新选择分类"
                allowClear
                onChange={(e) => {
                  this.setState({
                    name:e.target.value
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

export default CategoryList;
