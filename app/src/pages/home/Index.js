import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FiChevronRight} from "react-icons/fi"
import {IoIosMegaphone} from "react-icons/io"
import {GoMailRead} from "react-icons/go"
import Dialog from "../../components/common/Dialog"
import Header from '../../components/common/Header'
import homeNullImg from '../../assets/images/home-null.png'
import userCenterImg from '../../assets/images/user-center.png'
import {ProductApi} from '../../api'
import './Index.scss'
import {Toast} from "antd-mobile";
import {TOAST_DURATION} from "../../utils/constants";

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
    const {history} = this.props;
    const {products} = this.state
    const hasProducts = products && products.length > 0
    return (
      <div id="home">
        <section className="section-banner">
          <Header
            title="中募基金"
            icon={userCenterImg}
            onHandle={() => {
              history.push("user-center");
            }}
          />
          <p>
            <IoIosMegaphone className="megaphone"/>
            公告：关于开放ZBX基金定存说明
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
            <Link to="/home/deposit-history">
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
                1000 ZBX
                <span>消耗 58.59 USDT</span>
              </div>
              <div className="aside">
                <time>2019.07.17</time>
                返还
              </div>
            </li>
          </ul>}
          {!hasProducts && <div className="null">
            <img src={homeNullImg} alt="空"/>
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
