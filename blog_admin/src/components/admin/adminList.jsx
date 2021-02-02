/**
 * 用户列表
 */
import React, { Component } from "react";
import {Table, Button, Modal, message, Form, Input,Select} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { getList, deleteOne ,updateOne} from "../../http";
import dayjs from 'dayjs'

const {Option} = Select

class SwiperList extends Component {
  state = {
    dataSource: [],
    visible: false,
    desc:'',
    userName:'',
    password:'',
    isAdmin:false,
    avatar:'',
    _id:''
  };
  //表格中展示的数据
  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "个人描述",
      dataIndex: "desc",
      key: "desc",
      render: (text, record, index) => (
        <div style={{ maxwidth:200}} >
          {record.desc}
        </div>
      ),
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => (
        <img style={{ height: 64, width: 64 ,borderRadius:'50%'}} src={record.avatar} />
      ),
    },
    {
      title: "是否为管理员",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (text, record, index) => (
        <span>{record.isAdmin ? '是':'否'}</span>
      ),
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
          <Button onClick={()=>{this.showModal(record)}} >编辑</Button>
          <Button className="m-5" onClick={() => this.delete(text, record, index)}>删除</Button>
        </div>
      ),
    },
  ];

  //显示弹出框
  showModal = (r) => {
    const {userName,avatar,isAdmin,desc,_id} = r
    this.setState({
      visible: true,
      userName,
      password:'',
      avatar,
      isAdmin,
      desc,_id
    });
  };

  //点击确定
  handleOk = async () => {
    const {userName,password,avatar,isAdmin,desc,_id} = this.state
    await updateOne({userName,password,avatar,isAdmin,desc},'user',_id)
    this.getUserList()
      message.success("修改成功", 1);
    this.setState({
      visible: false,
    });
  };

  //点击取消
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  //当是否为管理员选中时触发
  select2 = (val)=>{
    this.setState({
      isAdmin:val
    })
  }

  //获取列表
  componentDidMount() {
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
    result.forEach((v, i) => {
      v.createAt = dayjs(v.createdAt).format('YYYY-MM-DD HH:MM')
      v.key = v._id
    });
    this.setState({
      dataSource: result,
    });
  }

  //当点击删除的时候触发
   delete = (text, record, index) => {
    const id = record._id;
    const { userName } = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除用户${userName}吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        await deleteOne("user", id);
        message.success('数据删除成功',1)
        const res1 = await getList("user");
        let result = res1.data.data;
        result.forEach((v, i) => {
          v.key = i + 1;
        });
        this.setState({
          dataSource: result,
        });
      },
    });
  };
  render() {
    const { dataSource,userName,password,avatar,isAdmin,desc } = this.state;
    return (
      <div>
        <Table
          pagination={{
            defaultCurrent:1,
            pageSize:5,
            hideOnSinglePage:true
          }}
          dataSource={dataSource} columns={this.columns} />
        <Modal
          bordered
          title="分类编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="jumpUrl m-20">
            <Form.Item
              label="用户名"
            >
              <Input
                value={userName}
                placeholder="修改的用户名"
                allowClear
                onChange={(e) => {
                  this.setState({
                    userName: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </div>
          <div className="jumpUrl m-20">
            <Form.Item
              label="是否为管理员"
            >
              <Select
                value={isAdmin}
                style={{minWidth:300}}
                showSearch
                placeholder="是否为管理员"
                optionFilterProp="children"
                onChange={this.select2}
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
          <div className="jumpUrl m-20">
            <Form.Item
              label="密码"
            >
              <Input
                value={password}
                placeholder="填写修改后的密码"
                allowClear
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </div>
          <div className="jumpUrl m-20">
            <Form.Item
              label="头像"
            >
              <Input
                value={avatar}
                placeholder="修改后的头像路径"
                allowClear
                onChange={(e) => {
                  this.setState({
                    avatar: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </div>
          <div className="jumpUrl m-15">
            {avatar ? <div>
              <img src={avatar}/>
            </div> : <div>填入路径后会有预览效果哦!</div>}
          </div>
          <div className="jumpUrl m-20">
            <Form.Item
              label="个人描述"
            >
              <Input
                value={desc}
                placeholder="请填写修改后的个人描述"
                allowClear
                onChange={(e) => {
                  this.setState({
                    desc: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </div>
        </Modal>
      </div>
    )
  }
}

export default SwiperList;
