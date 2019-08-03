import React, {Component} from 'react';
import {FiChevronLeft} from 'react-icons/fi';

import './Generalize.scss'


class Generalize extends Component {
  render() {
    return (
      <main id="generalize">
        <section className="section-banner">
          <h1>
            <FiChevronLeft className="icon"/>
            我的推广
          </h1>
        </section>

      </main>
    );
  }
}

export default Generalize;
