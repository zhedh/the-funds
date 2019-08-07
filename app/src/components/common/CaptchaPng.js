import React, {Component} from 'react';
import {User} from '../../api'
import {Toast} from "antd-mobile";
import {REG, TOAST_DURATION} from "../../utils/constants";
import './CaptchaPng.scss'

class CaptchaPng extends Component {
  state = {
    imgUrl: '',
    captcha: ''
  };

  componentDidMount() {
    this.getCaptchaPng();
  }

  componentWillReceiveProps(nextProps) {
    // this.getCaptchaPng();
  }

  getCaptchaPng = () => {
    User.getCaptchaPng().then(res => {
      let blob = new Blob([res]);
      let src = (window.URL)
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);
      document.querySelector('#captcha').setAttribute('src', src);

      // console.log(src)

      // this.setState({imgUrl: src});
      // this.setState({imgUrl: res});
    });
  };

  sendMailCode = () => {
    const {account, type, confirm} = this.props;
    const {captcha} = this.state;
    User.sendMailCode({
      imgcode: captcha,
      email: account,
      type
    }).then(res => {
      console.log(res);
    });
  };

  sendSmsCode = () => {
    const {account, type, confirm} = this.props;
    const {captcha} = this.state;
    User.sendSmsCode({
      imgcode: captcha,
      prefix: 86,
      phone: account,
      type
    }).then(res => {
      console.log(res);
    });
  };

  onChange = (e) => {
    const {value} = e.target
    this.setState({captcha: value});
  };

  confirm = () => {
    const {account} = this.props;
    const {captcha} = this.state;
    if (!captcha || captcha.length !== 4) {
      Toast.info('请输入4位验证码', TOAST_DURATION);
      return;
    }

    REG.MOBILE.test(account) ?
      this.sendSmsCode() : this.sendMailCode();
  };

  render() {
    const {show} = this.props;
    const {imgUrl, captcha} = this.state;
    return (
      <div className={`captcha-png ${show ? 'show' : ''}`}>
        <main>
          <h1>请输入图形验证码</h1>
          <img id="captcha" src="" alt="图形验证码"/>
          <div className="input-box">
            <input
              type="text"
              placeholder="验证码"
              value={captcha}
              onChange={this.onChange}
            />
            <button onClick={() => this.getCaptchaPng()}>刷新</button>
          </div>
          <button onClick={this.confirm}>确定</button>
        </main>
      </div>
    );
  }
}

export default CaptchaPng;
