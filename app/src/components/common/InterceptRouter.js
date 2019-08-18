import {Component} from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";

@inject('userStore')
@observer
class InterceptRouter extends Component {
  componentDidMount() {
    const {history, location, userStore} = this.props;
    // if (location.pathname === '/') {
    //   history.push('/home');
    // }
    userStore.setUserStatus()
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(InterceptRouter);
