import React, { Component } from 'react'
import dayjs from 'dayjs'
import Header from '../../components/common/Header'
import { ensureMilliseconds } from '../../utils/common'
import './Notices.scss'
import Other from '../../api/other'

class Notices extends Component {
  state = { notices: [] }
  componentDidMount() {
    this.getNotices()
  }

  getNotices = () => {
    Other.getNotices().then(res => {
      if (res && res.status === 1) {
        console.log(res.data)
        this.setState({
          notices: res.data.map(i => ({
            id: i.id,
            title: i.title,
            linkUrl: i.link_url,
            content: i.content,
            addTime: ensureMilliseconds(Number(i.add_time))
          }))
        })
      }
    })
  }
  render() {
    const { notices } = this.state
    return (
      <div id="notices">
        <Header title="公告列表" isShadow={true} />
        <section>
          {notices.map(notice => (
            <ul
              key={notice.id}
              className="list-item"
              onClick={() => {
                window.location.href = notice.link_url
              }}
            >
              <li>{notice.title}</li>
              <li>
                {dayjs(notice.addTime).format('YY-MM-DD HH:mm')}18-08-07 10:49
              </li>
            </ul>
          ))}
        </section>
      </div>
    )
  }
}

export default Notices
