import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {OtherApi} from '../../api'
import arrowLeft from '../../assets/images/arrow-left.png';
import arrowRightWhite from '../../assets/images/arrow-right-white.png';
import generalizeUserOne from '../../assets/images/generalize-user-one.png';
import generalizeUserTwo from '../../assets/images/generalize-user-two.png';
import './Generalize.scss'
import {Toast} from "antd-mobile";

class Generalize extends Component {
  state = {
    mySpread: {}
  };

  componentDidMount() {
    this.getMySpread()
  }

  getMySpread = () => {
    OtherApi.getMySpread().then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        return;
      }
      this.setState({mySpread: res.data})
    })
  }

  toDetail = (id) => {
    const {history} = this.props;
    history.push(`/home/generalize/${id}`);
  };

  render() {
    const {mySpread = {}} = this.state
    return (
      <div id="generalize">
        <section className="section-banner">
          <h1>
            <Link to="/home/inviter-friend">
              <img src={arrowRightWhite} alt="返回"/>
            </Link>
            我的推广
          </h1>
          <div className="content">
            <div className="count">
              {(mySpread.recommendCount + mySpread.recommendCount2) || '--'}
              <small>旗下推广总人数</small>
            </div>
          </div>
        </section>
        <section className="section-main">
          <div className="group">
            <label>
              推荐列表
            </label>
            <ul className="list">
              <li onClick={() => this.toDetail(1)}>
                <p>
                  <img src={generalizeUserOne} alt=""/>
                  一代推荐人数
                </p>
                <aside>
                  {mySpread.recommendCount}
                  <img src={arrowLeft} alt=""/>
                </aside>
              </li>
              <li onClick={() => this.toDetail(2)}>
                <p>
                  <img src={generalizeUserTwo} alt=""/>
                  二代推荐人数
                </p>
                <aside>
                  {mySpread.recommendCount2}
                  <img src={arrowLeft} alt=""/>
                </aside>
              </li>
            </ul>
          </div>
          <div className="group">
            <label>推荐团队</label>
            <ul className="team">
              <li>
                <span>{mySpread.teamCount}</span>
                <small>有效成员</small>
              </li>
              <li>
                <span>V{mySpread.teamLevel}</span>
                <small>团队等级</small>
              </li>
              <li>
                <span>{mySpread.rebate}</span>
                <small>返还比例</small>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Generalize;
