import React, {Component} from 'react';
import {UserApi} from '../../api'
import './Captcha.scss'

class CaptchaPng extends Component {
  state = {
    key: +new Date(),
    imgSrc: 'http://47.75.138.157/api/captchapng/png'
  };

  componentDidMount() {
    this.getCaptchaPng();
  }

  getCaptchaPng = () => {
    const key = +new Date();

    UserApi.getCaptchaPng({key}).then(res => {
      this.setState({key, imgSrc: res})
      this.props.onChangeCaptcha(key);
    });
  };

  render() {
    const {value, onChange} = this.props;
    return (
      <div id="captcha-box">
        <input
          type="text"
          maxLength={4}
          placeholder="图形验证码"
          value={value}
          onChange={onChange}
        />
        <img id="captcha" src={this.state.imgSrc} onClick={this.getCaptchaPng} alt="图形验证码"/>
      </div>
    );
  }
}

export default CaptchaPng;
