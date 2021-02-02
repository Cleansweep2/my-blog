/**
 * 图片的上传页面 及展示 编辑页面
 */
import React,{Component} from 'react'
import {Button, Form, Input, message, Modal, Table, Upload} from "antd";
import { LoadingOutlined, PlusOutlined ,ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import {beforeUpload} from "../../util/upload";
import { getList} from "../../http";
import ajax from "../../http/ajax";


export default class imgUpload extends  Component{
  state = {
    imgUrl: "",
    loading: false,
    dataSource:[],

  }
  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "文件名",
      dataIndex: "filename",
      key: "filename"
    },
    {
      title: "图片路径",
      dataIndex: "imgUrl",
      key: "imgUrl"
    },
    {
      title: "图片展示",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (text, record, index) => (
        <img src={record.imgUrl} style={{width:100,height:100}}/>
      )
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

  componentDidMount() {
    this.getUploadList()
  }


  //删除图片 及删除后端的存储图片
  delete = (text, record, index) => {
    const { filename ,imgUrl ,_id} = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除路径为${imgUrl}的图片吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        await ajax(`/admin/img/${_id}/${filename}/delete`,{},'delete');
        message.success('数据删除成功',1)
        this.getUploadList("upload");
      },
    });
  }

  getUploadList =async ()=> {
    const res = await getList("upload");

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

  //图片上传
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const imgUrl = info.file.response.imgUrl;
      this.setState({
        imgUrl,
        loading: false,
      });
      this.getUploadList()
    }
  };


    render() {
      console.log('Jin')
      const { imgUrl,dataSource} = this.state;
      const uploadButton = (
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">图片上传</div>
        </div>
      );
        return (
          <div>
            <h3 style={{borderBottom:'1px solid #f1f1f1',paddingBottom:'10px'}}>本机上传</h3>
            <div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://127.0.0.1:3001/admin/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imgUrl ? (
                  <img src={imgUrl} alt="imgUrl" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <div className="m-15" className="jumpUrl">
              <Form.Item
                label="上传路径"
              >
                <Input
                  value={imgUrl}
                  placeholder="这里是上传的路径"
                  allowClear
                />
              </Form.Item>
            </div>
            <h3 style={{borderTop:'1px solid #f1f1f1',borderBottom:'1px solid #f1f1f1',padding:'10px 0'}}>上传图片列表</h3>
            <Table
              pagination={{
                defaultCurrent:1,
                pageSize:4,
                hideOnSinglePage:true
              }}
              dataSource={dataSource} columns={this.columns} />
          </div>
        )
    }
}
