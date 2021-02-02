import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Col, Row, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";

import {verifyToken} from "../http";

import { getInfoSync } from "../redux/actions";

class Login extends Component {
  async componentDidMount() {
    const {tokenA} = localStorage
    if(tokenA)
    {
      const res = await verifyToken()
      const {errCode} = res.data
      if(errCode === 0){
        return this.props.history.push('/main')
      }
    }
  }
  state = {
    userName: "",
    password: "",
  };
  save = async () => {
    const { userName, password } = this.state;
    this.props.getInfoSync({ userName, password });
  };
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { userName, password } = this.state;
      this.props.getInfoSync({ userName, password });
    }
  };
  render() {
    const { user } = this.props;
    if (user.userName) {
      return <Redirect to="/main"></Redirect>;
    }
    return (
      <div style={this.sty}>
        <Row gutter={16} style={{ display: "flex", justifyContent: "center" }}>
          <Col span={8}>
            <div className="content">
              <Card
                style={{ minWidth: 185 }}
                title="管理员登录"
                bordered={false}
              >
                <div className="username">
                  <Input
                    allowClear
                    onChange={(e) => {
                      this.setState({
                        userName: e.target.value,
                      });
                    }}
                    placeholder="请输入用户名"
                    onKeyDown={this.onKeyDown}
                  />
                </div>
                <div className="psw" style={{ margin: "2vh 0" }}>
                  <Input.Password
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value,
                      });
                    }}
                    onKeyDown={this.onKeyDown}
                    placeholder="请输入密码"
                  />
                </div>
                <div
                  className="login"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button type="primary" onClick={this.save}>
                    登录
                  </Button>
                  <span>
                    <Link to="/ChangePwd">修改密码?</Link>
                  </span>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Login.prototype.sty = {
  background: "#ececec",
  padding: "30vh",
  width: "100vw",
  height: "100vh",
};

export default connect((state) => ({ user: state.User }), { getInfoSync })(
  Login
);
