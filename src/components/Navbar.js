import React, { Component } from 'react'
import catalog from '../data/CatalogData';
import {FiSearch, FiShoppingBag} from 'react-icons/fi';
import {Link, NavLink} from 'react-router-dom';
import logo from '../images/chloe-logo.svg';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import CartComponent from './Cart';
import content from './NavbarContent';

const searchClient = algoliasearch('ONQFXGBCJV', 'ef41c68fa18504f216ade178c9e6c99d');

function Hit({hit}) {
    return (
        <Link to={"/item/" + hit.productCode}>
            <div className='result'>
                <img className='result-image' src={hit.images[0]} alt=""/>
                <h4 className='result-text'>{hit.productName}</h4>
            </div>
        </Link>
    )
}

/**
 * If hover is null, don't show the dropdown. If it's a specific number, show that one's dropdown. Pass in a nav-element 
 * with the specific object holding the info and a "type" that specifies which class to use for styling
 */
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.toggleCart = this.toggleCart.bind(this);
        this.untoggleCart = this.untoggleCart.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.untoggleSearch = this.untoggleSearch.bind(this);
        this.state = {
          hover: 0,
          home: props.home,
          scroll: false,
          search: false,
          input: null,
          results: null,
          cart: false
        }
        this.content = content();
    }
    
    handleMouseEnter({index}) {
        this.setState({hover: index + 1});
    }
    
    handleMouseLeave() {
        this.setState({hover: 0});
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    toggleSearch() {
        this.setState({search: true});
    }

    untoggleSearch() {
        this.setState({search: false});
    }

    toggleCart() {
        this.setState({cart: true});
    }

    untoggleCart() {
        this.setState({cart: false});
    }

    handleScroll() {
        let scroll;
        if (this.state.home) {
            scroll = 300;
        } else {
            scroll = 110;
        }
        if (window.scrollY > scroll) {
            if (!this.state.scroll) {
                this.setState({hover: 0, cart: false});
            }
            this.setState({scroll: true});
        } else {
            if (this.state.scroll) {
                this.setState({hover: 0, cart: false});
            }
            this.setState({scroll: false})
        }
    }
      
    render() {
        let links = Object.keys(catalog).map((item, index) => (
            <h3 key={index} className={this.state.scroll ? "navbar-link navbar-link-small" : this.state.home ? "navbar-link navbar-link-large" : "navbar-link navbar-link-medium"} onMouseEnter = {() => this.handleMouseEnter({index})}>
                {
                    this.state.home && !this.state.scroll ?
                    <Link to={"/shop/" + item} className="beige-white">{catalog[item]['title']}</Link>: 
                    <NavLink to={"/shop/" + item} className='brown' activeClassName='underline-nav'>{catalog[item]['title']}</NavLink>
                }
            </h3>
        ));
        let dropdownName = "dropdown ";
        let cartName = "cart ";
        if (this.state.home) {
            dropdownName += "home-top-dropdown ";
            cartName += "home-top-cart ";
        }
        return (
            <div onMouseLeave={this.handleMouseLeave} className='nav-element'>
                <div>
                    <div className={this.state.home ? "gradient-background": "white-background"}>
                        {this.state.home ? <div></div> : <Link to="/"><img src={logo} className="nav-logo" alt=""/></Link>}
                        <div className="navbar-holder">
                            <FiSearch className={this.state.home? "icons beige" : "icons gold"} id="search" onClick={this.toggleSearch}/>
                            <div className="navbar">
                                {links}
                            </div>
                            <FiShoppingBag className={this.state.home? "icons beige" : "icons gold"} onMouseEnter={this.toggleCart} onMouseLeave={this.untoggleCart} id="cart"/>
                        </div>
                    </div>
                    {this.state.home? <div className={"triangle triangle" + (this.state.hover).toString()}/> : <div></div>}
                </div>
                
                <div className={this.state.scroll? "white-background sticky" : "white-background transparent"}>
                    <div className="navbar-holder-sticky"> 
                        <div className="left">
                            <Link to="/"><img src={logo} className="nav-logo-sticky" alt=""/></Link>
                            <div className="navbar-sticky">{links}</div>
                        </div>
                        <div className="right">
                            <FiSearch className="icons gold" onClick={this.toggleSearch}/>
                            <FiShoppingBag className="icons icons-sticky gold" onMouseEnter={this.toggleCart} onMouseLeave={this.untoggleCart}/>
                        </div>
                    </div>
                </div>

                <div className={this.state.search ? "show-search" : "hide-search"}>
                    <div className="translucent-grey" onClick={this.untoggleSearch}/>
                    <InstantSearch
                        searchClient={searchClient}
                        apiKey="ef41c68fa18504f216ade178c9e6c99d"
                        appId="ONQFXGBCJV"
                        indexName="Chloe">
                        <SearchBox translations={{placeholder: "Search for products"}}/>
                        <Hits hitComponent={Hit}/>
                    </InstantSearch>
                </div> 
                
                <div className={
                    this.state.scroll ? 
                    (this.state.hover ? dropdownName + "sticky-dropdown show-dropdown" : dropdownName + "sticky-dropdown hide-dropdown") : 
                    (this.state.hover ? dropdownName + "top-dropdown show-dropdown" : dropdownName + "top-dropdown hide-dropdown")
                    }>
                    {this.content[this.state.hover-1]}
                </div>

                <CartComponent name={
                    this.state.scroll ? 
                    (this.state.cart ? cartName + "sticky-cart show-cart" : cartName + "sticky-cart hide-cart") : 
                    (this.state.cart ? cartName + "top-cart show-cart" : cartName + "top-cart hide-cart")
                    }
                    enter={this.toggleCart}
                    leave={this.untoggleCart}    
                    />
            </div>
        )
    }
}
