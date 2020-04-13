import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default class Catalog extends Component {
    constructor (props) {
        this.caption = props.caption;
        this.image = props.image;
    }

    render() {
        return (
            <div>
                <Navbar home={false}/>
                <Hero home={false} caption={this.caption} image={this.image}/>
            </div>
        )
    }
}
