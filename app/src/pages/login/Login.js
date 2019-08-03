import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { Link } from "react-router-dom";
import { REG, TOAST_DURATION } from "../../utils/constants";
import Header from "../../components/common/Header";
import "./Login.scss";
class Login extends Component {
  state = {
    number: "",
    password: "",
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

  onSubmit = () => {
    const { history } = this.props;
    const { number, password } = this.state;
    if (number === "") {
      Toast.info("请输入邮箱/手机号", TOAST_DURATION);
      return;
    }

    if (!REG.EMAIL.test(number) && !REG.MOBILE.test(number)) {
      Toast.info("账号输入错误", TOAST_DURATION);
      return;
    }

    if (password === "") {
      Toast.info("请输入密码", TOAST_DURATION);
      return;
    }
    if (!REG.PASSWORD.test(password)) {
      Toast.info("密码输入错误", TOAST_DURATION);
      return;
    }
    // 吊登陆接口，成功后前往首页
    history.push("/");
  };

  onSetType = type => {
    this.setState({ type });
  };

  render() {
    const { number, password, type } = this.state;
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
          <p>
            <Link to="/forget-password/1">忘记密码？</Link>
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
