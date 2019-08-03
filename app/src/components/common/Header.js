import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Header.scss";
class Header extends Component {
  render() {
    const { title = "", history } = this.props;
    return (
      <header id="common-header">
        <img
          src={require("../../assets/images/arrow-left.png")}
          alt=""
          onClick={() => {
            history.goBack();
          }}
        />
        <span>{title}</span>
        <div />
      </header>
    );
  }
}

export default withRouter(Header);
