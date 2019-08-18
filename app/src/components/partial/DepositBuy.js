import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './DepositBuy.scss'
import {Button} from "antd-mobile";
import {inject, observer} from "mobx-react";

@inject('productStore')
@observer
class DepositBuy extends Component {
  render() {
    const {show, productStore} = this.props
    const {productDetail, gears, gearNum, changeGearNum} = productStore
    const hasGears = gears && gears.length > 0
    return (
      <div className={`deposit-buy ${show ? 'show' : ''}`}>
        <div className="current-info show">
          <h2 className="tab-first_h2">ZBX/USDT当前价格: 0.5898</h2>
          <p className="tab-first_p">最新兑价（数据来源：影力所）</p>
        </div>
        <ul className="gears">
          {hasGears && gears.map(gear => (
            <li
              key={gear.num}
              className={gearNum === gear.num ? 'active' : ''}
              onClick={() => changeGearNum(gear.num)}>
              <div className="box">
                <div className="price">
                  {gear.num}
                  <small>{productDetail.productName}</small>
                </div>
                {/*<small>售价{i.usdt}USDT</small>*/}
              </div>
            </li>
          ))}
        </ul>
        <div className="fee">
          <p>
            <span>定存送ZBX特价额度</span>
            <span>{gearNum ? (gearNum/10).toFixed(0) : 0}</span>
          </p>
          <small>手续费费率：{productDetail.serviceCharge}%</small>
        </div>
        <aside>
          <p>
            *您暂未通过实名认证，无法定存 <Link to="/">去认证</Link>
          </p>
          <p>
            *您暂未设置交易密码，无法定存 <Link to="/">去设置</Link>
          </p>
        </aside>
        <Button
          className="btn"
          activeClassName="btn-common__active"
          onClick={this.onDeposit}>
          定投
        </Button>
      </div>
    )
  }
}

export default DepositBuy
