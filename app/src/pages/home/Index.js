import React, {Component} from "react"
import {Link} from "react-router-dom"
import {observer, inject} from "mobx-react";
import {Toast} from "antd-mobile";
import {FiChevronRight} from "react-icons/fi"
import {IoIosMegaphone} from "react-icons/io"
import {GoMailRead} from "react-icons/go"
import Dialog from "../../components/common/Dialog"
import Header from '../../components/common/Header'
import noDataImg from '../../assets/images/no-data.png'
import userCenterImg from '../../assets/images/user-center.png'
import {ProductApi} from '../../api'
import {TOAST_DURATION} from "../../utils/constants";
import './Index.scss'

@inject('userStore')
@observer
class Index extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = () => {
    const {products} = this.state
    ProductApi.getProductList({
      page: 1,
      row: 30
    }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg, TOAST_DURATION)
        return
      }
      products.push(...res.data)
    })
  }

  render() {
    const {history, userStore} = this.props;
    const {products} = this.state
    const hasProducts = products && products.length > 0

    return (
      <div id="home">
        <section className="section-banner">
          <Header
            title="定投XC"
            icon={userCenterImg}
            onHandle={() => {
              history.push("user-center");
            }}
          />
          <p>
            <IoIosMegaphone className="megaphone"/>
            公告：关于开放XC基金定存说明
          </p>
          <ul className="tabs">
            <li onClick={() => history.push("/home/bargain")}>
              <div className="text">
                <b>128.23</b>
                <br/>
                <small>可用特价额度</small>
              </div>
              <FiChevronRight className="icon"/>
            </li>
            <li onClick={() => history.push("/home/inviter-friend")}>
              <div className="text inviter-award">
                <GoMailRead className="icon"/>
                邀请奖励
              </div>
              <FiChevronRight className="icon"/>
            </li>
          </ul>
        </section>
        <section className="section-main">
          <div className="steps">
            <Link to={userStore.isOnline ? '/home/deposit-history' : '/login'}>
              定存中
            </Link>
            <Link to="/home/rule">
              规则介绍
              <FiChevronRight className="icon"/>
            </Link>
          </div>
          {hasProducts && <ul className="list">
            <li>
              <div className="main">
                <small>2019.07.10 定存</small>
                1000 XC
                <span>消耗 58.59 USDT</span>
              </div>
              <div className="aside">
                <time>2019.07.17</time>
                返还
              </div>
            </li>
          </ul>}
          {!hasProducts && <div className="null">
            <img src={noDataImg} alt="空"/>
            <br/>
            每天存一笔，天天有钱赚！
          </div>}
        </section>
        <Dialog
          show={false}
          title="温馨提示"
          msg="参与定存需先进行身份认证哦"
        />
      </div>
    );
  }
}

export default Index;
