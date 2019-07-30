import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import "./Login.scss";
class Login extends Component {
  render() {
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
            />
          </label>
          <label>
            <input className="input-main" type="password" placeholder="密码" />
            <img src={require("../../assets/png/open-pwd.png")} alt="" />
          </label>
          <p>
            <Link to="/find-password">忘记密码？</Link>
            <Link to="/register">注册</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
