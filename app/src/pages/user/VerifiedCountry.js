import React, { Component } from 'react'
import { COUNTRIES_LIST } from '../../utils/constants'
import Header from '../../components/common/Header'
import './VerifiedCountry.scss'

class VerifiedCountry extends Component {
  state = {
    selectedCountry: 'China中国'
  }

  selectCountry = () => {
    const { history } = this.props
    const { selectedCountry } = this.state
    if (selectedCountry === null) return
    history.push(
      `/verified-identity/${
        selectedCountry === 'China中国' ? 'china' : 'foreign'
      }`
    )
  }

  render() {
    const { selectedCountry } = this.state
    return (
      <div id="verified-country">
        <Header title="选择国家" isFixed bgWhite>
          <p className="next-step" onClick={() => this.selectCountry()}>
            下一步
          </p>
        </Header>

        <ul className="country-list">
          {COUNTRIES_LIST.map((country, key) => (
            <li
              key={key.toString()}
              onClick={() => {
                this.setState({ selectedCountry: country })
              }}
            >
              <span>{country}</span>
              {selectedCountry === country && (
                <img
                  src={require('../../assets/images/select-country.png')}
                  alt=""
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default VerifiedCountry
