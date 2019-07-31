import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { Link } from "react-router-dom";
import { REG } from "../../utils/constants";
import Header from "../../components/common/Header";
import "./Login.scss";
class Login extends Component {
  state = {
    number: "",
    password: ""
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

  onSubmit = () => {
    const { number, password } = this.state;

    if (number === "") {
      Toast.info("请输入邮箱/手机号");
      return;
    }
    if (!REG.EMAIL.test(number) && !REG.MOBILE.test(number)) {
      Toast.info("账号或密码输入错误");
      return;
    }
    if (password === "") {
      Toast.info("请输入密码");
      return;
    }
    if (!REG.PASSWORD.test(password)) {
      Toast.info("账号或密码输入错误");
      return;
    }
  };
  render() {
    const { number, password } = this.state;
    return (
      <div id="login">
        <Header />
        <div className="login-content">
          <h2>登录</h2>
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
              type="password"
              placeholder="密码"
              value={password}
              onChange={this.onPasswordChange}
            />
            <img src={require("../../assets/png/open-pwd.png")} alt="" />
          </label>
          <p>
            <Link to="/find-password">忘记密码？</Link>
            <Link to="/register">注册</Link>
          </p>
        </div>
        <Button
          activeClassName="btn-common__active"
          className="btn-common btn-common__bottom"
          onClick={this.onSubmit}
        >
          确认
        </Button>
      </div>
    );
  }
}

export default Login;
