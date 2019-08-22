import React, {Component} from "react"
import {Link} from "react-router-dom"
import {observer, inject} from "mobx-react"
import {FiChevronRight} from "react-icons/fi"
import {IoIosMegaphone} from "react-icons/io"
import {GoMailRead} from "react-icons/go"

import userCenterImg from '../../assets/images/user-center.png'
import {HOME} from '../../assets/static'
import Dialog from "../../components/common/Dialog"
import Header from '../../components/common/Header'
import NoData from "../../components/common/NoData"
import {formatDate} from "../../utils/format"
import './Index.scss'

@inject('userStore')
@inject('personStore')
@inject('noticeStore')
@inject('productStore')
@observer
class Index extends Component {
  state = {
    products: [],
  }

  componentDidMount() {
    const {userStore, personStore, noticeStore, productStore} = this.props
    noticeStore.getNotices()
    if (userStore.isOnline) {
      personStore.getSpecial()
      productStore.getProducts().then(productId => {
        personStore.getDepositRecords({productId, status: 0})
      })
    }
  }

  render() {
    const {history, userStore, personStore, noticeStore, productStore} = this.props;
    const {newestNotice} = noticeStore
    const {depositRecords} = personStore
    const {currentProduct} = productStore
    const hasRecords = userStore.isOnline && depositRecords && depositRecords.length > 0

    return (
      <div id="home">
        <section className="section-banner">
          <Header
            title={HOME.TITLE}
            icon={userCenterImg}
            onHandle={() => {
              history.push("user-center");
            }}
          />
          <p onClick={() => history.push('/notices')}>
            <IoIosMegaphone className="megaphone"/>
            <span>
              公告：{newestNotice ? newestNotice.title : '暂无公告'}
            </span>
          </p>
          <ul className="tabs">
            <li onClick={() => history.push(userStore.isOnline ? '/home/bargain' : '/login')}>
              <div className="text">
                {userStore.isOnline ? <b>{personStore.allUsableSpecial}</b> : <span>登录查看</span>}
                <br/>
                <small>可用特价额度</small>
              </div>
              <FiChevronRight className="icon"/>
            </li>
            <li
              onClick={() => history.push(userStore.isOnline ? '/home/inviter-friend' : '/login')}>
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
          {hasRecords ? <ul className="list">
            {depositRecords.map((record, key) =>
              <li key={key}>
                <div className="main">
                  <small>
                    {formatDate(record.addTime)}
                    &nbsp;
                    {record.remark}
                  </small>
                  {record.amount} {currentProduct.productName}
                  {/*<span>消耗 58.59 USDT</span>*/}
                </div>
                <div className="aside">
                  <time>{formatDate(record.unlockTime)}</time>
                  返还日期
                </div>
              </li>
            )}
          </ul> : <NoData msg="每天存一笔，天天有钱赚！"/>}

        </section>
        <Dialog
          show={false}
          title="温馨提示"
          msg="参与定存需先进行身份认证哦"
        />
      </div>
    )
  }
}

export default Index
