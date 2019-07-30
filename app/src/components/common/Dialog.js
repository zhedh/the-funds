import React, {PureComponent} from 'react';

class Dialog extends PureComponent {
    render() {
        return (
            <main>
                <div className="box">
                    <h1>提示</h1>
                    <p>参与定存需先进行身份认证哦</p>
                    <aside>
                        <button>取消</button>
                        <button>确定</button>
                    </aside>
                </div>
            </main>
        );
    }
}