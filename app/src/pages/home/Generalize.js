import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import arrowLeft from '../../assets/images/arrow-left.png';
import arrowRightWhite from '../../assets/images/arrow-right-white.png';
import generalizeUserOne from '../../assets/images/generalize-user-one.png';
import generalizeUserTwo from '../../assets/images/generalize-user-two.png';

import './Generalize.scss'

const GENERALIZE_LIST = [
  {
    id: 1,
    img: generalizeUserOne,
    label: '一代推荐人数',
    count: '16',
  }, {
    id: 2,
    img: generalizeUserTwo,
    label: '二代推荐人数',
    count: '8',
  },
];

class Generalize extends Component {
  state = {
    generalizeList: GENERALIZE_LIST
  };

  toDetail = (id) => {
    const {history} = this.props;
    history.push(`/home/generalize/${id}`);
  };

  render() {
    const {generalizeList} = this.state
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
              300
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
              {generalizeList.map(generalize =>
                <li key={generalize.id} onClick={() => this.toDetail(generalize.id)}>
                  <p>
                    <img src={generalize.img} alt=""/>
                    {generalize.label}
                  </p>
                  <aside>
                    {generalize.count}
                    <img src={arrowLeft} alt=""/>
                  </aside>
                </li>)
              }
            </ul>
          </div>
          <div className="group">
            <label>推荐团队</label>
            <ul className="team">
              <li>
                <span>43</span>
                <small>有效成员</small>
              </li>
              <li>
                <span>V1</span>
                <small>团队等级</small>
              </li>
              <li>
                <span>43</span>
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
