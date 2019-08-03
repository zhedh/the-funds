import React, { Component } from 'react'
import Header from '../../components/common/Header'
import './Notices.scss'

class Notices extends Component {
  render() {
    const { history } = this.props
    return (
      <div id="notices">
        <Header title="公告列表" isShadow={true} />
        <section>
          <ul
            className="list-item"
            onClick={() => {
              history.push('/')
            }}
          >
            <li>开放ZBX基金定存活动</li>
            <li>18-08-07 10:49</li>
          </ul>
        </section>
      </div>
    )
  }
}

export default Notices
