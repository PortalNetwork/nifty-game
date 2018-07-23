import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import Contract from './Contract';
import SendTransactoin from './SendTransaction';
import Card from './Card/Card';
import {Warning} from './Warning/Warning';
import {Top} from './Top/Top';
import './App.css';
import title from "../images/title.png";
import title2 from "../images/title2.png";
import logo from '../images/logo.png';
import {TweenMax} from "gsap/TweenMax";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
    };
    this.setWeb3 = this.setWeb3.bind(this);
  }

  setWeb3(web3) {
    this.setState({web3});
  }

  Elffn = e =>{
    let wElf = document.querySelector(".Elf0").clientWidth;
    let hElf = document.querySelector(".Elf0").clientHeight;
    let scaleInt = e.pageX > window.innerWidth / 2 ? -1 : 1;

    TweenMax.to(".Elf0", 0.3, 
      { 
          left: e.pageX - (wElf / 2 ), 
          top: e.pageY - (hElf / 2 ),
          scaleX: scaleInt
      }
    )
  }
  
  componentDidMount(){
    
    window.addEventListener("mousemove", this.Elffn);

  }

  render() {
    return (
      <div className="App">
        {/*<Top/>*/}
        {/*<Health {...this.props} />*/}
        {/*<SendTransactoin {...this.props} {...this.state}/>*/}
        {
          /*
          <Card {...this.props}/>
        <Contract {...this.props} {...this.state} />
          */
        }
        <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
        <Warning {...this.props}/>

        <div className="titlebox">
          <img className="title" src={title}/>
          <img className="title2" src={title2}/>
          <a className="gameplay"></a>
        </div>

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
    );
  }
}

export default App;
