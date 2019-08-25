import React, {Component} from "react"
import {Link} from "react-router-dom"
import {observer, inject} from "mobx-react"
import {Carousel, WingBlank} from "antd-mobile"
import {FiChevronRight} from "react-icons/fi"
import {IoIosMegaphone} from "react-icons/io"
import {GoMailRead} from "react-icons/go"

import {formatDate} from "../../utils/format"
import userCenterImg from '../../assets/images/user-center.png'
import {HOME} from '../../assets/static'
import Dialog from "../../components/common/Dialog"
import Header from '../../components/common/Header'
import NoData from "../../components/common/NoData"
import './Index.scss'

@inject('userStore')
@inject('personStore')
@inject('noticeStore')
@inject('productStore')
@observer
class Index extends Component {
  componentDidMount() {
    const {userStore, personStore, noticeStore, productStore} = this.props
    noticeStore.getNotices()
    if (userStore.isOnline) {
      personStore.getSpecial()
      productStore.getProducts().then(productId => {
        personStore.getDepositRecords({productId, status: 0})
      })
    }

    this.destroyIframe()
  }

  destroyIframe = () => {
    let script = document.querySelector('#ze-snippet')
    let iframe = document.querySelector('iframe')

    if (script) script.remove()
    if (!iframe) return
    //把iframe指向空白页面，这样可以释放大部分内存。
    iframe.src = 'about:blank'

    try {
      iframe.contentWindow.document.write('')
      iframe.contentWindow.document.clear()
    } catch (e) {
    }

    //把iframe从页面移除
    iframe.parentNode.removeChild(iframe)
  }

  render() {
    const {history, userStore, personStore, noticeStore, productStore} = this.props;
    const {notices} = noticeStore
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
          <div className="notice-carousel" onClick={() => history.push('/notices')}>
            <label>
              <IoIosMegaphone className="megaphone"/>
              公告：
            </label>
            {notices.length ? <WingBlank>
              <Carousel
                className="carousel"
                vertical
                dots={false}
                dragging={false}
                swiping={false}
                autoplay
                infinite>
                {notices.map(notice =>
                  <div key={notice.id} className="item">
                    {notice.title}
                  </div>
                )}
              </Carousel>
            </WingBlank> : <span className="item">暂无公告</span>}

          </div>
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
            {/*<Link to={userStore.isOnline ? '/home/deposit-history' : '/login'}>*/}
            {/*定存中*/}
            {/*</Link>*/}
            <span>定存中</span>
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
