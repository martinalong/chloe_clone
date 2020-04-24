import React, { Component } from 'react'
import logo from '../images/chloe-logo.svg';
import {Link} from 'react-router-dom';

export default class Hero extends Component {
    constructor(props) {
        super(props);
        this.caption = props.caption;
        this.image = props.image;
        this.state = {
            home: props.home,
        }
    }

    render() {
        if (this.state.home) {
            return (
                <div className="hero-container">
                    <div className="overlay">
                        <img src={logo} className="logo-home"/>
                        <h2 className="home-caption">{this.caption}</h2>
                        <Link to="/shop/chloe"><h3 className="link-button hero-button">Discover new arrivals</h3></Link>
                    </div>
                    <img className="hero clipped" src={this.image} alt=""/>
                </div>
            )
        }
        return (
            <div>
                <div className="overlay">
                    <h2 className="catalog-caption">{this.caption}</h2>
                </div>
                <img className="hero" src={this.image} alt=""/>
            </div>
        )
    }
}
