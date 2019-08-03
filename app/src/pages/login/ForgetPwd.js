import React, { Component, Fragment } from "react";
import { Button, Toast } from "antd-mobile";
import { REG, COUNT_DOWN, TOAST_DURATION } from "../../utils/constants";
import Header from "../../components/common/Header";
import "./ForgetPwd.scss";
class ForgetPwd extends Component {
  state = {
    number: "",
    smsCode: "",
    password: "",
    repassword: "",
    repwdType: "password",
    pwdType: "password",
    count: COUNT_DOWN,
    isGetSms: true
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onNumberChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({ number: value });
  };

  onSmsCodeChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({ smsCode: value });
  };

  onPasswordChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({ password: value });
  };

  onRepasswordChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({ repassword: value });
  };

  codeCountDown = () => {
    let count = this.state.count;

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({ isGetSms: true, count: COUNT_DOWN });
        clearInterval(this.timer);
        return;
      } else {
        this.setState({ isGetSms: false, count: count-- });
      }
    }, 1000);
  };

  getSmsCode = async () => {
    await this.codeCountDown();
    // 调发送接口
  };

  onSubmit = () => {
    const { history } = this.props;
    const { number, smsCode, password, repassword } = this.state;
    const step = window.location.pathname.split("/")[2];
    if (step === "1") {
      if (number === "") {
        Toast.info("请输入邮箱/手机号", TOAST_DURATION);
        return;
      }

      if (!REG.EMAIL.test(number) && !REG.MOBILE.test(number)) {
        Toast.info("账号输入错误", TOAST_DURATION);
        return;
      }

      if (smsCode === "") {
        Toast.info("请输入验证码", TOAST_DURATION);
        return;
      }
      if (!REG.SMSCODE.test(smsCode)) {
        Toast.info("验证码输入错误", TOAST_DURATION);
        return;
      }

      history.replace(`/forget-password/2`);
      return;
    }

    if (step === "2") {
      if (password === "") {
        Toast.info("请输入密码", TOAST_DURATION);
        return;
      }
      if (!REG.PASSWORD.test(password)) {
        Toast.info("密码最少8位，字母加数字", TOAST_DURATION);
        return;
      }
      if (repassword === "") {
        Toast.info("请再次输入密码", TOAST_DURATION);
        return;
      }
      if (password !== repassword) {
        Toast.info("两次密码不一致", TOAST_DURATION);
        return;
      }

      Toast.info("密码已重置，请重新登录", TOAST_DURATION, () => {
        history.push(`/login`);
      });
    }
  };
  render() {
    const {
      number,
      smsCode,
      password,
      repassword,
      count,
      isGetSms,
      pwdType,
      repwdType
    } = this.state;
    const {
      history: { location }
    } = this.props;
    const step = location && location.pathname.split("/")[2];
    return (
      <div id="forget-pwd">
        <Header />
        <div className="main-content">
          {step === "1" && (
            <Fragment>
              <h2> {step === "1" ? "找回密码" : "设置交易密码"}</h2>
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
                  maxLength={6}
                  placeholder="验证码"
                  value={smsCode}
                  onChange={this.onSmsCodeChange}
                />
                <span
                  className={`sms-code  ${!isGetSms ? `event-none` : ""}`}
                  onClick={this.getSmsCode}
                >
                  {isGetSms ? "获取验证码" : <span>{`${count}s`}</span>}
                </span>
              </label>
            </Fragment>
          )}

          {step === "2" && (
            <Fragment>
              <h2>
                重置密码
                <br />
                <small>8-20位字符，不可以是纯数字。</small>
              </h2>
              <label>
                <input
                  className="input-main"
                  type={pwdType}
                  placeholder="密码"
                  value={password}
                  onChange={this.onPasswordChange}
                />
                {pwdType === "text" && (
                  <img
                    src={require("../../assets/images/open-pwd.png")}
                    alt=""
                    onClick={() => this.setState({ pwdType: "password" })}
                  />
                )}
                {pwdType === "password" && (
                  <img
                    src={require("../../assets/images/close-pwd.png")}
                    alt=""
                    onClick={() => this.setState({ pwdType: "text" })}
                  />
                )}
              </label>
              <label>
                <input
                  className="input-main"
                  type={repwdType}
                  placeholder="再次输入密码"
                  value={repassword}
                  onChange={this.onRepasswordChange}
                />
                {repwdType === "text" && (
                  <img
                    src={require("../../assets/images/open-pwd.png")}
                    alt=""
                    onClick={() => this.setState({ repwdType: "password" })}
                  />
                )}
                {repwdType === "password" && (
                  <img
                    src={require("../../assets/images/close-pwd.png")}
                    alt=""
                    onClick={() => this.setState({ repwdType: "text" })}
                  />
                )}
              </label>
            </Fragment>
          )}
        </div>
        <Button
          activeClassName="btn-common__active"
          className="btn-common"
          onClick={this.onSubmit}
        >
          下一步
        </Button>
      </div>
    );
  }
}

export default ForgetPwd;
