import React, { Component } from 'react';
import logo from '../images/logo.png';
import './indexUi.css';
export default class className extends Component{
    render() {
        return (
            <div className="ui_item">
                <div className="ui cloud"></div>
                <div className="ui cloud2"></div>
                <div className="ui ladder"></div>
                <div className="ui tree1"></div>
                <div className="ui tree2"></div>
                <div className="ui footer"></div>
                <div className="ui start1"></div>
                <div className="ui start2"></div>
                <div className="ui start3"></div>
                <img className="logo" src={logo} />
                <div className="ui Elf0"></div>
                <div className="ui Elf1"></div>
                <div className="ui Elf2"></div>
                <div className="ui Elf3"></div>
                <div className="ui fruit1"></div>
                <div className="ui fruit2"></div>
            </div>
        )
    }
}