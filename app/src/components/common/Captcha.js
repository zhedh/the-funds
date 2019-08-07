import React, {Component} from 'react';
import {User} from '../../api'
import './Captcha.scss'

class CaptchaPng extends Component {
  componentDidMount() {
    this.getCaptchaPng();
  }

  getCaptchaPng = () => {
    User.getCaptchaPng().then(res => {
      let blob = new Blob([res]);
      let src = (window.URL)
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);
      document.querySelector('#captcha').setAttribute('src', src);
    });
  };

  render() {
    const {value, onChange} = this.props;
    return (
      <div className="captcha-box">
        <input
          type="text"
          placeholder="图形验证码"
          value={value}
          onChange={onChange}
        />
        <img id="captcha" src="" onClick={this.getCaptchaPng} alt="图形验证码"/>
      </div>
    );
  }
}

export default CaptchaPng;
