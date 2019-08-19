import React from "react";
import noDataImg from "../../assets/images/no-data.png";
import './NoData.scss'

function NoData(props) {
  return <div className="no-data">
    <img src={noDataImg} alt="空"/>
    <br/>
    {props.msg}
  </div>
}

export default NoData
