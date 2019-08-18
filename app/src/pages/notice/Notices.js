import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import dayjs from 'dayjs'
import Header from '../../components/common/Header'
import noDataImg from '../../assets/images/no-data.png'
import './Notices.scss'

@inject('noticeStore')
@observer
class Notices extends Component {

  componentDidMount() {
    const {noticeStore} = this.props
    noticeStore.getNotices()
  }

  render() {
    const {history, noticeStore} = this.props

    return (
      <div id="notices">
        <Header
          title="公告列表"
          isShadow
          isFixed
          onHandle={() => history.push('/user-center')}
        />
        <section>
          {noticeStore.notices.length ? (
            noticeStore.notices.map(notice => (
              <ul
                key={notice.id}
                className="list-item"
                onClick={() => (window.location.href = notice.linkUrl)}
              >
                <li>{notice.title}</li>
                <li>{dayjs(notice.addTime * 1000).format('YYYY-MM-DD HH:mm')}</li>
              </ul>
            ))
          ) : (
            <div className="no-data">
              <img src={noDataImg} alt="空"/>
              <p>暂无数据</p>
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default Notices
