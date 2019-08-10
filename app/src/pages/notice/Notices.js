import React, {Component} from 'react'
import dayjs from 'dayjs'
import Header from '../../components/common/Header'
import './Notices.scss'
import {OtherApi} from '../../api'
import noDataImg from "../../assets/images/no-data.png";

class Notices extends Component {
  state = {notices: []}

  componentDidMount() {
    this.getNotices()
  }

  getNotices = () => {
    OtherApi.getNotices().then(res => {
      if (res.status === 1) this.setState({notices: res.data})
    })
  }

  render() {
    const {history} = this.props
    const {notices} = this.state

    return (
      <div id="notices">
        <Header
          title="公告列表"
          isShadow
          isFixed
          onHandle={() => history.push('/user-center')}
        />
        <section>
          {notices.length ? notices.map(notice =>
            <ul
              key={notice.id}
              className="list-item"
              onClick={() => window.location.href = notice.linkUrl}>
              <li>{notice.title}</li>
              <li>
                {dayjs(notice.addTime).format('YY-MM-DD HH:mm')}
              </li>
            </ul>
          ) : <div className="no-data">
            <img src={noDataImg} alt="空"/>
            <p>暂无数据</p>
          </div>}
        </section>
      </div>
    )
  }
}

export default Notices
