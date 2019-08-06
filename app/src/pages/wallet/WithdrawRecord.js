import React, {Component} from 'react';
import Header from '../../components/common/Header';
import './WithdrawRecord.scss'
const RECORDS = [
  {
    address: '90xkd8nkekdnv873jdj474kjsksjsjisshg44',
    time: '2018-09-01',
    value: '900.34',
    order: '345163606838480896',
    status: '待审核'
  }, {
    address: '90xkd8nkekdnv873jdj474kjsksjsjisshg44',
    time: '2018-09-01',
    value: '900.34',
    order: '345163606838480896',
    hash: 'b0bab9…108c3f',
    status: '成功'
  }, {
    address: '90xkd8nkekdnv873jdj474kjsksjsjisshg44',
    time: '2018-09-01',
    value: '900.34',
    order: '345163606838480896',
    status: '拒绝'
  }, {
    address: '90xkd8nkekdnv873jdj474kjsksjsjisshg44',
    time: '2018-09-01',
    value: '900.34',
    order: '345163606838480896',
    status: '提币中'
  },
];

class WithdrawRecord extends Component {
  render() {
    const records = RECORDS;
    return (
      <div id="withdraw-record">
        <Header title="提币记录" isFixed isShadow/>
        <ul>
          {records.map(record =>
            <li>
              <p>
                <label>地址</label>
                <span>{record.address}</span>
              </p>
              <p>
                <label>事件</label>
                <span>{record.time}</span>
              </p>
              <p>
                <label>数量</label>
                <span>{record.value}</span>
              </p>
              <p>
                <label>编号</label>
                <span>{record.order}</span>
              </p>
              {record.hash && <p>
                <label>Hash</label>
                <span>{record.address}</span>
              </p>}
              <p>
                <label>状态</label>
                <span>{record.status}</span>
              </p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default WithdrawRecord;
