import {Component} from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";

@inject('userStore')
@observer
class InterceptRouter extends Component {
  componentWillMount() {
    const {userStore} = this.props;
    userStore.setUserStatus()
  }

  componentDidMount() {
    // const {history, location, userStore} = this.props;
    // if (location.pathname === '/') {
    //   history.push('/home');
    // }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(InterceptRouter);
