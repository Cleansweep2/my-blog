/**
 * 心情语录列表及编辑
 */
import React, { Component } from "react";
import {Table, Button, Modal, message, Form,  Input} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'

import {getList, deleteOne, updateOne} from "../../http";



class SentenceList extends Component {
  state = {
    dataSource: [],
    visible: false,
    data:[],
    content:'',
    author:'',
    blogger:'',
    images:[],
    _id:''
  };
  //展示的表格数据
  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
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
  componentDidMount() {
    this.getSentenceList()
  }

  //获取所有的心情语录
  getSentenceList =async () =>{
    const res = await getList("sentence");
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

  //删除心情语录的时候触发
  delete = (text, record, index) => {
    const id = record._id;
    const { content } = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除名言${content}吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        await deleteOne("sentence", id);
        message.success('数据删除成功',1)
        this.getSentenceList()
      },
    });
  };

  //显示弹出框
  showModal = (text, record, index) => {
    const {content,author,_id,blogger,images} = record
    this.setState({
      visible: true,
      content,
      author,
      blogger,
      _id,
      images
    });
  };


  //点击弹出框确定的时候触发
  handleOk =async () => {
    const { content,author,_id,blogger,images} = this.state;
    await updateOne({ content,author ,blogger,images}, "category", _id);
    this.getSentenceList()
    message.success("修改成功", 1);
    this.setState({
      visible: false,
    });
  };

  //弹出框取消的时候触发
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };


  render() {
    const { dataSource ,content ,author,blogger,images} = this.state;
    return (
      <div>
        <Table
          bordered
          dataSource={dataSource} columns={this.columns} />
        <Modal
          cancelText="取消"
          okText="编辑"
          title="每日一句编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

          <div  className="m-15">
            <Form.Item
              label="标题"
            >
              <Input
                value={blogger}
                placeholder="请输入每日一句标题"
                allowClear
                onChange={(e) => {
                  this.setState({
                    blogger:e.target.value
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
                placeholder="请输入每日一句内容"
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
              label="作者"
            >
              <Input
                value={author}
                placeholder="请输入每日一句作者"
                allowClear
                onChange={(e) => {
                  this.setState({
                    author:e.target.value
                  })
                }}
              />
            </Form.Item>
          </div>
          <div className="m-15">
            {images.map((v,i)=>{
              return (
                <div
                  key = {i}
                >
                  <Form.Item
                    label={'图片链接' + (i + 1)}
                  >
                    <Input
                      value={images[i]}
                      placeholder="请输入图片链接"
                      allowClear
                      onChange={(e) => {
                        const {images} = this.state
                        const val = e.target.value
                        images[i] = val
                        this.setState({
                          images,
                        })
                      }}
                    />
                  </Form.Item>
                  <div style={{textAlign:'end',marginBottom:10,display:'flex',justifyContent:"space-between"}}>
                    <div className="m-15">
                      {images[i] ? <div>
                        <img  style={{maxWidth:500,maxHeight:100}} src={images[i]}/>
                      </div> : <div>填入路径后会有预览效果哦!</div>}
                    </div>
                    <Button type="primary" onClick={()=>{
                      const {images} = this.state
                      images.splice(i,1)
                      this.setState({
                        images,
                      })
                    }}>
                      删除链接
                    </Button>
                  </div>
                </div>
              )
            })}
            <Button type="primary" onClick={()=>{
              const {images} = this.state
              images.push('')
              this.setState({
                images,
              })
            }}>
              添加链接
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SentenceList;
