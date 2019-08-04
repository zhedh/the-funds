import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import Header from '../../components/common/Header'
import './VerifiedUpload.scss'

class VerifiedUpload extends Component {
  state = {
    cardFront: null,
    cardBack: null,
    cardHold: null
  }
  render() {
    const { cardFront, cardBack, cardHold } = this.state
    const isDisabled =
      cardFront === null || cardBack === null || cardHold === null

    return (
      <div id="verified-upload">
        <Header title="身份认证" />

        <ul className="notices">
          <li>
            请确保照片完整，清晰可见，格式为jpg、jpeg或png，需小于2M。证件必须在有效期限内。
          </li>
          <li>
            请上传手持证件照片，照片中需附一张白纸写有（“中募基金”），确保您的脸部清晰可见，所有证件详细信息都清晰可读，否则将影响您的审核进度。
            字样和当前日期
          </li>
        </ul>

        <div className="upload-content">
          <p>Id card/passport front photo</p>
          <img src={require('../../assets/images/card-front.png')} alt="" />
        </div>
        <div className="upload-content">
          <p>Id card/passport on the back</p>
          <img src={require('../../assets/images/card-back.png')} alt="" />
        </div>
        <div className="upload-content">
          <p>Hold id/passport photo</p>
          <img src={require('../../assets/images/card-hold.png')} alt="" />
        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common upload-img ${
            isDisabled ? 'btn-common__disabled' : ''
          }`}
          disabled={isDisabled}
          onClick={this.onSubmit}
        >
          提交审核
        </Button>
      </div>
    )
  }
}
export default VerifiedUpload
