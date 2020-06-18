import React, { Component } from 'react'
import Navbar from './components/Navbar';
import inventory from './data/InventoryData';
import Error from './Error';
import {IoIosHeartEmpty as HeartEmpty, IoIosHeart as Heart} from 'react-icons/io';
import {MdPhone as Phone} from 'react-icons/md';
import Parallax from 'react-rellax'
import {useSelector, useDispatch} from 'react-redux';

function WishlistComponent({code}) {
    const dispatch = useDispatch();
    return (
        <h5 className='product-name wishlist' onClick={() => dispatch({type: "WISHLIST", item: code})}>
            {useSelector(state => state.wishlist.has(code)) ? <Heart className=' heart fill-heart'/> : <HeartEmpty className='heart empty-heart'/>}Wishlist
        </h5>
    )
}

function CartComponent({code}) {
    const dispatch = useDispatch();
    return (
        <h4 className='bag-button' onClick={() => dispatch({type: "CART", item: code})}>{useSelector(state => state.cart[code]) ? "In bag" : "Add to bag"}</h4>
    )
}

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            details: false,
            description: false,
            shipping: false
        };
    }

    handleToggle(toggled) {
        if (toggled === "details") {
            this.setState({details: !this.state.details, description: false, shipping: false});
        } else if (toggled === "description") {
            this.setState({details: false, description: !this.state.description, shipping: false});
        } else if (toggled === "shipping") {
            this.setState({details: false, description: false, shipping: !this.state.shipping});
        }
    }

    render() {
        let code = this.props.match.params.slug;
        let data
        try {
            data = inventory[code];
        } catch(err) {
            data = null;
        }
        if (!data) {
            return (
                <Error/>
            )
        }
        let {productName, blurb, price, details, images} = data;
        images = images.map((link, i) => <img className='item-image' src={link} alt="" key={i}/>)
        details = details.trim('\n').split('\n\n');
        for (let i = 0; i < details.length; i++) {
            details[i] = details[i].split('\n').map((item, i) => <h4 className='text-lines' key={i}>{item}</h4>)
        }
        details = details.map((item, i) => <p className='text-paragraphs' key={i}>{item}</p>)

        let description = null;
        if (data.hasOwnProperty('description')) {
            description = data.description.trim('\n').split('\n\n');
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
                        <CartComponent code={code}/>
                        <WishlistComponent code={code}/>
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