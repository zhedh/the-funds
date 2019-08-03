import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { Link } from "react-router-dom";
import { REG, TOAST_DURATION } from "../../utils/constants";
import Header from "../../components/common/Header";
import "./Register.scss";
class Register extends Component {
  state = {
    number: "",
    smsCode: "",
    password: "",
    repassword: "",
    inviteCode: "",
    type: "password"
  };

  onNumberChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({ number: value });
  };

  onPasswordChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({ password: value });
  };

  render() {
    const { number, password, type } = this.state;

    return (
      <div>
        <div id="login">
          <Header />
          <div className="login-content">
            <h2>注册</h2>
            <label>
              <input
                className="input-main"
                type="text"
                placeholder="邮箱/手机号"
                value={number}
                onChange={this.onNumberChange}
              />
            </label>
            <label>
              <input
                className="input-main"
                type="text"
                placeholder="邮箱/手机号"
                value={number}
                onChange={this.onNumberChange}
              />
            </label>
            <label>
              <input
                className="input-main"
                type="text"
                placeholder="邮箱/手机号"
                value={number}
                onChange={this.onNumberChange}
              />
            </label>
            <label>
              <input
                className="input-main"
                type={type}
                placeholder="密码"
                value={password}
                onChange={this.onPasswordChange}
              />
              {type === "text" && (
                <img
                  src={require("../../assets/images/open-pwd.png")}
                  alt=""
                  onClick={() => this.onSetType("password")}
                />
              )}
              {type === "password" && (
                <img
                  src={require("../../assets/images/close-pwd.png")}
                  alt=""
                  onClick={() => this.onSetType("text")}
                />
              )}
            </label>
          </div>
          <Button
            activeClassName="btn-common__active"
            className="btn-common btn-common__bottom"
            onClick={this.onSubmit}
          >
            立即注册
          </Button>
        </div>
      </div>
    );
  }
}

export default Register;
