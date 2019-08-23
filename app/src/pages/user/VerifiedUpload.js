import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Toast } from 'antd-mobile'
import Header from '../../components/common/Header'
import './VerifiedUpload.scss'

@inject('authStore')
@observer
class VerifiedUpload extends Component {
  onSubmit = () => {
    const { history, authStore } = this.props
    authStore.submitAuthAudit().then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        return
      }
      history.push('/verified-result')
    })
  }

  render() {
    const { authStore } = this.props
    const { cardFront, cardBack, cardHold } = authStore.photo
    const canSubmit = cardFront && cardBack && cardHold

    return (
      <div id="verified-upload">
        <Header title="身份认证" isFixed bgWhite />

        <ul className="notices">
          <li>
            请确保照片完整，清晰可见，格式为jpg、jpeg或png，需小于2M。证件必须在有效期限内。
          </li>
          <li>
            请上传手持证件照片，照片中需附一张白纸写有（“定投XC”），确保您的脸部清晰可见，所有证件详细信息都清晰可读，否则将影响您的审核进度。
            字样和当前日期
          </li>
        </ul>

        <div className="upload-content">
          <p>身份证/护照正面照</p>
          <img
            src={
              cardFront
                ? cardFront
                : require('../../assets/images/card-front.png')
            }
            alt=""
          />
          <input
            type="file"
            className="upload-photo"
            accept="image/*"
            onChange={e => authStore.changePhotoItem(e, 'cardFront')}
          />
        </div>
        <div className="upload-content">
          <p>身份证/护照反面照</p>
          <img
            src={
              cardBack ? cardBack : require('../../assets/images/card-back.png')
            }
            alt=""
          />
          <input
            type="file"
            className="upload-photo"
            accept="image/*"
            onChange={e => authStore.changePhotoItem(e, 'cardBack')}
          />
        </div>
        <div className="upload-content">
          <p>手持身份证/护照照片</p>
          <img
            src={
              cardHold ? cardHold : require('../../assets/images/card-hold.png')
            }
            alt=""
          />
          <input
            type="file"
            className="upload-photo"
            accept="image/*"
            onChange={e => authStore.changePhotoItem(e, 'cardHold')}
          />
        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common upload-img ${
            !canSubmit ? 'btn-common__disabled' : ''
          }`}
          disabled={!canSubmit}
          onClick={this.onSubmit}
        >
          提交审核
        </Button>
      </div>
    )
  }
}

export default VerifiedUpload
