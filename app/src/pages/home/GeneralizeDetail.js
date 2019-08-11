import React, {Component} from 'react';
import dayjs from "dayjs";
import {Toast} from "antd-mobile";
import OtherApi from "../../api/other";
import {chineseCapital} from "../../utils/common";
import Header from "../../components/common/Header";
import './GeneralizeDetail.scss'

class GeneralizeDetail extends Component {
  state = {
    title: '一代推荐',
    users: []
  };

  componentDidMount() {
    const {match} = this.props;
    const {id} = match.params;
    this.setState({title: chineseCapital(id) + '代推荐'});
    this.getSpreadList()
  }

  getSpreadList = () => {
    OtherApi.getSpreadList().then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        return;
      }
      this.setState({users: res.data})
    })
  }

  render() {
    const {title, users} = this.state;

    return (
      <div id="generalize-detail">
        <Header title={title} isShadow isFixed/>
        <ul>
          <li>
            <span>用户</span>
            <time>推广时间</time>
          </li>
          {users.map(user =>
            <li key={user.regTime}>
              <span>{user.phoneNo || user.email}</span>
              <time>{dayjs(user.regTime * 1000).format('YY-MM-DD HH:mm')}</time>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default GeneralizeDetail;
