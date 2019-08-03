import React, {Component} from 'react';
import Header from "../../components/common/Header";

import './BargainRecord.scss';

const RECORDS = [
  {
    id: 1,
    time: '2019.07.09 15:00',
    label: '定存100ZBX',
    type: 1,
    value: 10
  }, {
    id: 2,
    time: '2019.07.09 15:00',
    label: '定存200ZBX',
    type: 1,
    value: 10
  }, {
    id: 3,
    time: '2019.07.09 15:00',
    label: '解锁额度',
    type: 0,
    value: 10
  }, {
    id: 4,
    time: '2019.07.09 15:00',
    label: '额度失效',
    type: 0,
    value: 10
  },
]

class BargainRecord extends Component {
  state = {
    records: RECORDS
  };

  render() {
    const {records} = this.state;
    return (
      <div id="bargain-record">
        <Header title="特价额度记录" isFixed isShadow/>
        <ul>
          {
            records.map(record =>
              <li key={record.id}>
                <time>{record.time}</time>
                <p>
                  <span>{record.label}</span>
                  <span>{(record.type === 1 ? '+' : '-') + record.value}</span>
                </p>
              </li>)
          }
        </ul>
      </div>
    );
  }
}

export default BargainRecord;
