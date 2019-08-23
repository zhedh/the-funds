import React, { Component } from 'react'
import Header from '../../components/common/Header'

class ContactCustomer extends Component {
  componentDidMount() {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.id = 'ze-snippet'
    script.src =
      'https://static.zdassets.com/ekr/snippet.js?key=46514fb7-9da7-4496-b5c3-d942215d5215'
    document.body.appendChild(script)
  }

  render() {
    const { history } = this.props
    return (
      <div id="contact">
        <Header
          title="联系客服"
          isShadow={true}
          onHandle={() => history.push('/user-center')}
        />
      </div>
    )
  }
}
export default ContactCustomer
