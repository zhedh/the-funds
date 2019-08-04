import {Component} from "react";
import {withRouter} from "react-router";

class InterceptRouter extends Component {
  componentDidMount() {
    const {history, location} = this.props;
    if (location.pathname === '/') {
      history.push('/home');
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(InterceptRouter);
