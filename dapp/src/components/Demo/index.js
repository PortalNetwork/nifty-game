import React from 'react';
import classnames from 'classnames/bind';
import style from './demo.css';
const cx = classnames.bind(style);

export default class extends React.Component {
  render() {
    return (
      <div className="demo">

        <div className="gameCard">
            <div className="gameCard">
                <div className="c_bg"></div>
                <div className="c_user"></div>
                <div className="c_number"></div>
            </div>
            <div className="BackCard">
            
            </div>
        </div>

      </div>
    )
  }
}
