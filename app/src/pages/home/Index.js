import React, {Component} from 'react';
import {FaUser} from 'react-icons/fa';
import {IoIosMegaphone} from 'react-icons/io';

import './Index.scss'


class Index extends Component {
    render() {
        return (
            <main>
                <section className="section-banner">
                    <h1>
                        <FaUser className="fa-user"/>
                        中募基金
                    </h1>
                    <p>
                        <IoIosMegaphone className="megaphone"/>
                        公告：关于开放ZBX基金定存说明
                    </p>
                </section>
            </main>
        );
    }
}

export default Index;