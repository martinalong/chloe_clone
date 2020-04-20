import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import inventoryData from '../data/InventoryData';

export default class ItemBox extends Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.code = props.code;
        this.state = {
            hover: false
        }
    }

    handleMouseEnter() {
        this.setState({hover: true});
    }
    
    handleMouseLeave() {
        this.setState({hover: false});
    }

    render() {
        let {productName, blurb, images, price, details} = inventoryData[this.code];
        if (details.indexOf('Color: ') != -1) {
            details = details.substring(details.indexOf('Color: ') + 7, details.length);
            blurb = blurb.substring(0, blurb.indexOf(' in ') + 4) + details.substring(0, details.indexOf('\n'));
        } else {
            blurb = blurb.substring(0, blurb.indexOf(' in '));
        }
        return (
            <div>
                <Link to={'/item/' + this.code}>
                    <div className='product-wrapper' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <img className='product-image-primary' src={images[0]} alt=""/>
                        <img className={this.state.hover? 'product-image-hover shown-image' : 'product-image-hover hidden-image'} src={images[2]} alt=""/>
                    </div>
                    <div className='catalog-info'>
                        <h3 className='product-name catalog-name'>{productName}</h3>
                        <h4 className='product-blurb catalog-blurb'>{blurb}</h4>
                        <h4 className='price catalog-price'>$ {price}</h4>
                    </div>
                </Link>
            </div>
        )
    }
}
