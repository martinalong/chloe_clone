import React, { Component } from 'react'
import Navbar from './components/Navbar';

export default class Item extends Component {
    constructor (props) {
        this.data = props.data;
        //should have name, subtitle, price colors and size and stock of each, product details, description, images
    }

    render() {
        return (
            <div>
                <Navbar home={false}/>
            </div>
        )
    }
}