import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import homeImage from './images/home-hero-large.jpg';
import homeImage2 from './images/home-hero-2.jpg';
import featured1 from './images/home-featured-1.jpg';
import featured2 from './images/home-featured-2.jpg';
import lookbook1 from './images/lookbook-1.webp';
import lookbook2 from './images/lookbook-2.webp';
import lookbook3 from './images/lookbook-3.webp';
import lookbook4 from './images/lookbook-4.webp';
import lookbook5 from './images/lookbook-5.webp';
import lookbook6 from './images/lookbook-6.webp';
import lookbook7 from './images/lookbook-7.webp';
import lookbook8 from './images/lookbook-8.webp';
import lookbook9 from './images/lookbook-9.webp';
import lookbook10 from './images/lookbook-10.webp';
import lookbook11 from './images/lookbook-11.webp';
import lookbook12 from './images/lookbook-12.webp';
import Carousel from './components/Carousel';
import {Link} from 'react-router-dom';


class FeaturedSection extends Component {
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
            <div className="featured-items">
                <div>
                    <img className="featured-item" src={featured1} alt="denise cup chain necklace"/>
                    <span id="pulsing-plus-1" onClick={() => this.handlePulseClick(1)}>
                        <div className="pulse"/>
                        <div className="plus-sign" id="plus-sign-1"/>
                        {this.state.f1toggle ? <h3 id="f1popup" className="white-popup"><Link to="/item/cod50240141dh">Denise cup chain necklace</Link><div className="price">$ 790</div></h3> : <></>}
                    </span>
                </div>
                <div>
                    <img className="featured-item" src={featured2} alt="chloe c item"/>
                    <span id="pulsing-plus-2" onClick={() => this.handlePulseClick(2)}>
                        <div className="pulse"/>
                        <div className="plus-sign" id="plus-sign-2"/>
                        {this.state.f2toggle ? <h3 id="f2popup" className="white-popup"><Link to="/item/cod45504974kj">Chloé c item</Link><div className="price">$ 520</div></h3> : <></>}
                    </span>
                </div>
            </div>
        )
    }
}

function StatementSection() {
    return (
        <div className="statement-pieces">
            <h4 className="statement">Accent your summer wardrobe with new statement pieces</h4>
            <Link to="/shop/chloe"><h3 className="link-button button-transparent">Shop now</h3></Link>
        </div>
    )
}

function HeroSection() {
    return (
        <div className="hero2">
            <div className="hero2-content">
                <h4 className="hero2-caption">Welcome Spring with new accessories in fresh palettes</h4>
                <Link to="/shop/chloe/accessories"><h3 id="accessories-button" className="link-button">Shop now</h3></Link>
            </div>
            <img className="hero2-image" src={homeImage2}/>
        </div>
    )
}

function RunwayCarousel() {
    let images = [lookbook1, lookbook2, lookbook3, lookbook4, lookbook5, lookbook6, lookbook7, 
        lookbook8, lookbook9, lookbook10, lookbook11, lookbook12];
    return (
        <div className="runway-carousel">
            <Carousel
                options={{
                freeScroll: false,
                pageDots: false,
                wrapAround: true,
                adaptiveHeight: true
                }}
            >
                {images.map((image, index) => (
                <div className="runway-carousel-container" key={index}>
                    <img className="runway-carousel-image" src={image} alt="" />
                </div>
                ))}
            </Carousel>
            <div className="white-box">
                <h4 className="runway-caption">Spring Summer <span id="runway-number">2020</span> Collection</h4>
                <span ><Link to="/runway/chloe/spring-summer-2020-runway"><h5 className="carousel-button link-button button-transparent">Discover the collection</h5></Link></span>
            </div>
        </div>
    )
}

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar home={true}/>
                <Hero home={true} caption="Create timeless allure with the Spring Summer 2020 collection" image={homeImage}/>
                <FeaturedSection/>
                <StatementSection/>
                <HeroSection/>
                <RunwayCarousel/>
            </div>
        )
    }
}
