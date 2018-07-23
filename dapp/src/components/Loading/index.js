import React, { Component } from 'react';
import './Loading.css';
import loading from "../../images/loading.png";
export default class extends Component{
    render() {
        return (
            <div className="loading"><img src={loading} /></div>
        )
    }
}