import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Header from '../../components/common/Header'
import './ContactUs.scss'
import { inject, observer } from 'mobx-react'

@inject('userStore')
@observer
class ContactUs extends Component {
  render() {
    const {history} = this.props
    return (
      <div id="contact-us">
        <Header
          title="联系我们"
          isShadow={true}
          onHandle={() => history.push('/user-center')}
        />
        <main>
          技术邮箱：nttcte@sohu.com
          <br/>
          <br/>
          市场邮箱：nttcma@sohu.com
        </main>
      </div>
    )
  }
}

export default ContactUs
