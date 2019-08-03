import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  render() {
    const { title = "", isShadow, isFixed, history } = this.props;
    let classNames = "";
    classNames += isShadow ? "shadow " : "";
    classNames += isFixed ? "fixed " : "";

    return (
      <header id="common-header" className={classNames}>
        <img
          src={require("../../assets/images/arrow-left.png")}
          alt="返回"
          onClick={() => history.goBack()}
        />
        <span>{title}</span>
        <div />
      </header>
    );
  }
}

export default withRouter(Header);
