import React, {Component} from 'react';
import Header from "../../components/common/Header";
import {chineseCapital} from "../../utils/common";
import './GeneralizeDetail.scss'

const USERS = [
  {
    id: 1,
    email: 'dlab@163.com',
    time: '2019-02-14 14:45'
  }, {
    id: 2,
    email: 'dlab@163.com',
    time: '2019-02-14 14:45'
  }, {
    id: 3,
    email: 'dlab@163.com',
    time: '2019-02-14 14:45'
  }, {
    id: 4,
    email: 'dlab@163.com',
    time: '2019-02-14 14:45'
  }, {
    id: 5,
    email: 'dlab@163.com',
    time: '2019-02-14 14:45'
  }, {
    id: 6,
    email: 'dlajdj43b@163.com',
    time: '2019-02-14 14:45'
  }, {
    id: 7,
    email: '32332dlab@163.com',
    time: '2019-02-14 14:45'
  }, {
    id: 8,
    email: 'dla4345b@163.com',
    time: '2019-02-14 14:45'
  },
];


class GeneralizeDetail extends Component {
  state = {
    title: '一代推荐',
    users: USERS
  };

  componentDidMount() {
    const {match} = this.props;
    const {id} = match.params;
    this.setState({title: chineseCapital(id) + '代推荐'});
  }

  render() {
    const {title, users} = this.state;
    return (
      <div id="generalize-detail">
        <Header
          title={title}
          isShadow={true}
          isFixed={true}
        />
        <ul>
          <li>
            <span>用户</span>
            <time>推广时间</time>
          </li>
          {users.map(user =>
            <li key={user.id}>
              <span>{user.email}</span>
              <time>{user.time}</time>
            </li>)
          }
        </ul>

      </div>
    );
  }
}

export default GeneralizeDetail;
