import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import homeImage from './images/home-hero-large.jpg';
import homeImage2 from './images/home-hero-2.jpg';
import featured1 from './images/home-featured-1.jpg';
import featured2 from './images/home-featured-2.jpg';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handlePulseClick = this.handlePulseClick.bind(this);
        this.state = {
            f1toggle: false,
            f2toggle: false,
        }
    }

    handlePulseClick(num) {
        if (num == 1) {
            this.setState({f1toggle: !this.state.f1toggle});
        } else {
            this.setState({f2toggle: !this.state.f2toggle});
        }
    }


    render() {
        return (
            <div>
                <Navbar home={true}/>
                <Hero home={true} caption="Create timeless allure with the Spring Summer 2020 collection" image={homeImage}/>
                <div className="featured-items">
                    <div>
                        <img className="featured-item" src={featured1} alt="denise cup chain necklace"/>
                        <span id="pulsing-plus-1" onClick={() => this.handlePulseClick(1)}>
                            <div className="pulse"/>
                            <div className="plus-sign" id="plus-sign-1"/>
                            {this.state.f1toggle ? <h3 id="f1popup" className="white-popup">Denise cup chain necklace<div className="price">$ 790</div></h3> : <></>}
                        </span>
                    </div>
                    <div>
                        <img className="featured-item" src={featured2} alt="chloe c item"/>
                        <span id="pulsing-plus-2" onClick={() => this.handlePulseClick(2)}>
                            <div className="pulse"/>
                            <div className="plus-sign" id="plus-sign-2"/>
                            {this.state.f2toggle ? <h3 id="f2popup" className="white-popup">Chloé c item<div className="price">$ 520</div></h3> : <></>}
                        </span>
                    </div>
                </div>
                <div className="statement-pieces">
                    <h4 className="statement">Accent your summer wardrobe with new statement pieces</h4>
                    <h3 className="link-button button-transparent">Shop now</h3>
                </div>
            </div>
        )
    }
}
