import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import {Toast} from "antd-mobile"
import Header from "../../components/common/Header"
import './NoticeDetail.scss'

@inject('noticeStore')
@observer
class NoticeDetail extends Component {
  state = {content: ''}

  componentDidMount() {
    const {noticeStore, match} = this.props
    const {id} = match.params
    noticeStore.getNotice(id).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
      }
      this.setState({content: res.data.content})
      console.log(res.data)
    })
  }

  render() {
    const {content} = this.state

    return (
      <div className="notice-detail">
        <Header
          title="公告详情"
          isShadow
          isFixed
          bgWhite
        />
        <div dangerouslySetInnerHTML={{__html: content}}> </div>
        {/*{url && <iframe*/}
        {/*id="iframe-notice"*/}
        {/*// src={url}*/}
        {/*title="公告"*/}
        {/*src="https://www.jb51.net"*/}
        {/*frameborder="0"*/}
        {/*target="_blank">*/}
        {/*</iframe>}*/}
      </div>
    );
  }
}

export default NoticeDetail
