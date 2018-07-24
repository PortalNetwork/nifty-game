import React from 'react';
import classnames from 'classnames/bind';
import style from './demo.css';
const cx = classnames.bind(style);

export default class extends React.Component {

    state={
        isOpenCard: false
    }

    openCardFn=()=>{
        let bool = !this.state.isOpenCard;
        this.setState({isOpenCard: bool});
    }


    render() {
        return (
            <div className="demo">
                <div className="cardbox" onClick={this.openCardFn}>
                    <div className={cx('gameCard', {OpenCard: this.state.isOpenCard})}>
                        <div className="seeCard">
                            <div className="c_bg"></div>
                            <div className="c_user"></div>
                            <div className="c_number"></div>
                        </div>
                        <div className="BackCard"></div>
                    </div>
                </div>
            </div>
        )
    }
}
