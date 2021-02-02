/**
 * 用户创建
 */
import React, { Component } from "react";
import { message, Input, Button, Upload, Form,} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";


import { registe } from "../../http/index";
import {beforeUpload} from "../../util/upload";




class AdminCreate extends Component {
  state = {
    userName: "",
    password: "",
    avatar: "",
    gender: 0,
    loading: false,
  };
  //图片上传
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const imgUrl = info.file.response.imgUrl;
      // Get this url from response in real world.
      this.setState({
        avatar: imgUrl,
        loading: false,
      });
    }
  };


  //保存数据
  save = async () => {
    const { avatar, password, gender, userName } = this.state;
    if (!userName.trim()) {
      return message.error("用户名长度不能为空");
    }
    if (!password.trim()) {
      return message.error("密码长度不能为空");
    }
    if (password.length < 6) {
      return message.error("密码长度应大于六位");
    }
    if (!/[a-z]+/i.test(password)) {
      return message.error("密码应含有字母");
    }
    let res;
    if(avatar){
      res = await registe({ avatar, password, gender, userName ,isAdmin:true});
    }else
    {
      res = await registe({ password, gender, userName ,isAdmin:true});
    }
    this.setState({
      avatar:'',
      password:'',
      gender:'',
      userName:'',
    });
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    message.success("保存成功", 1);
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    const { avatar,userName, password } = this.state;
    return (
      <div>
        <div  className="jumpUrl m-15">
          <Form.Item
            label="用户名"
          >
            <Input
              value={userName}
              placeholder="请输入用户名"
              allowClear
              onChange={(e) => {
                this.setState({
                  userName: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>
        <div className="jumpUrl m-15">
          <Form.Item
            label="密码"
          >
            <Input
              value={password}
              placeholder="请输入密码"
              allowClear
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>
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
            {avatar ? (
              <img src={avatar} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="save">
          <Button type="primary" onClick={this.save}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default AdminCreate;
