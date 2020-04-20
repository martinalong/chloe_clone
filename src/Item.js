import React, { Component } from 'react'
import Navbar from './components/Navbar';
import inventory from './data/InventoryData';
import Error from './Error';
import {IoIosHeartEmpty as HeartEmpty, IoIosHeart as Heart} from 'react-icons/io';
import {MdPhone as Phone} from 'react-icons/md';
import Parallax from 'react-rellax'

export default class Item extends Component {
    constructor (props) {
        super(props);
        
        this.handleToggle = this.handleToggle.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
        this.addItemToWishlist = this.addItemToWishlist.bind(this);
        //this.addToCart = props.addToCart;
        //this.addToWishlist = props.addToWishlist;
        this.state = {
            slug: this.props.match.params.slug,
            details: false,
            description: false,
            shipping: false,
            inCart: false, //props.inCart(this.code),
            inWishlist: false, //props.inWishlist(this.code),
        };
        this.code = this.state.slug;
        try {
            this.data = inventory[this.code];
        } catch(err) {
            this.data = null;
        }
    }

    handleToggle(toggled) {
        if (toggled == "details") {
            this.setState({details: !this.state.details, description: false, shipping: false});
        } else if (toggled == "description") {
            this.setState({details: false, description: !this.state.description, shipping: false});
        } else if (toggled == "shipping") {
            this.setState({details: false, description: false, shipping: !this.state.shipping});
        }
    }

    addItemToCart() {
        this.setState({inCart: true});
        //this.addToCart(this.code);
    }

    addItemToWishlist() {
        this.setState({inWishlist: !this.state.inWishlist});
        //this.addToWishlist(this.code);
    }

    render() {
        if (!this.data) {
            return (
                <Error/>
            )
        }
        let {productName, blurb, price, details, images} = this.data;
        images = images.map((link, i) => <img className='item-image' src={link} alt="" key={i}/>)
        details = details.trim('\n').split('\n\n');
        for (let i = 0; i < details.length; i++) {
            details[i] = details[i].split('\n').map((item, i) => <h4 className='text-lines' key={i}>{item}</h4>)
        }
        details = details.map((item, i) => <p className='text-paragraphs' key={i}>{item}</p>)

        let description = null;
        if (this.data.hasOwnProperty('description')) {
            description = this.data.description.trim('\n').split('\n\n');
            for (let i = 0; i < description.length; i++) {
                description[i] = description[i].split('\n').map((item, i) => <h4 className='text-lines' key={i}>{item}</h4>)
            }
            description = description.map((item, i) => <p className='text-paragraphs' key={i}>{item}</p>)
        }

        return (
            <div className='whole-page'>
                <Navbar home={false}/>
                <div className='item-page'>
                    <div className='images'>
                        {images}
                    </div>
                    <Parallax className='product-info' speed={-10}>
                        <div>
                            <h3 className='product-name'>{productName}</h3>
                            <h4 className='product-blurb'>{blurb}</h4>
                            <h4 className='product-price'>$ {price}</h4>
                        </div>
                        <h4 className='bag-button' onClick={this.addItemToCart}>{this.state.inCart ? "In bag" : "Add to Bag"}</h4>
                        <h5 className='product-name wishlist' onClick={this.addItemToWishlist}>{this.state.inWishlist ? <Heart className=' heart fill-heart'/> : <HeartEmpty className='heart empty-heart'/>}Wishlist</h5>
                        <div>
                            <h5 className='info-header product-name' onClick={() => this.handleToggle('details')}><span className='info-header-text'>Product Details</span><span className='info-header-plus'>{this.state.details ? "-" : "+"}</span></h5>
                            <h6 className={this.state.details ? 'details show' : 'details hide'}>{details}</h6>
                        </div>
                        {description ? 
                            <div>
                                <h5 className='info-header product-name' onClick={() => this.handleToggle('description')}><span className='info-header-text'>Description</span><span className='info-header-plus'>{this.state.description ? "-" : "+"}</span></h5>
                                <h6 className={this.state.description ? 'details show' : 'details hide'}>{description}</h6>
                            </div> :
                            <div></div>
                        }
                        <div>
                            <h5 className='info-header product-name' onClick={() => this.handleToggle('shipping')}><span className='info-header-text'>Shipping & Returns</span><span className='info-header-plus'>{this.state.shipping ? "-" : "+"}</span></h5>
                            <h6 className={this.state.shipping ? 'details show' : 'details hide'}><p className='text-paragraphs'>Standard Shipping: Free delivery in 5-8 business days</p></h6>
                        </div>
                        <div>
                            <h5 className='info-header product-name'><span className='info-header-text'>May we help?</span></h5>
                            <h6 className='contact-info'><Phone id='phone'/>  Call us at +1 (855) 2030940</h6>
                        </div>
                    </Parallax>
                </div>
            </div>
        )
    }
}