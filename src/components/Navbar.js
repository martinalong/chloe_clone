import React, { Component } from 'react'
import data from '../data/NavbarData';
import {FiSearch, FiUser, FiShoppingBag} from 'react-icons/fi';
import {Link, NavLink} from 'react-router-dom';
import logo from '../images/chloe-logo.svg';

function formatSlug(slug) {
    return slug.split(" ").join("-").toLowerCase().replace("é", "e").replace("&", "and").replace("#", "");
  }

/**
 * Dropdown of categories for each navbar link.
 */
class NavElement extends Component {
    constructor(props) {
        super(props);
        this.element = props.element;
        this.handleMouseLeave = props.handleMouseLeave;
    }

    render () {
        return (
            <div onMouseLeave={this.handleMouseLeave}>{this.element.title}</div>
        )
    }
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
        this.state = {
          hover: 0,
          home: props.home,
          scroll: false,
        }
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

    handleScroll(event) {
        let scroll;
        if (this.state.home) {
            scroll = 300;
        } else {
            scroll = 110;
        }
        if (window.scrollY > scroll) {
            this.setState({scroll: true});
        } else {
            this.setState({scroll: false})
        }
    }
      
    render() {
        let brownLinks = data.map((item, index) => (
            <h3 className="navbar-link" onMouseEnter = {() => this.handleMouseEnter({index})}>
                {
                    this.state.home ?
                    <Link to={"/shop/" + formatSlug(item.title)} className="brown">{item.title}</Link>: 
                    <span className="span"><NavLink to={"/shop/" + formatSlug(item.title)} className='brown' activeClassName='underline-nav'>{item.title}</NavLink></span>
                }
            </h3>
        ));
        let beigeLinks = data.map((item, index) => (
            <Link to={"/shop/" + formatSlug(item.title)}>
                <h3 className="navbar-link-home beige-white" onMouseEnter = {() => this.handleMouseEnter({index})}>
                    {
                        this.state.home ?
                        item.title : 
                        <span class="span">{item.title}</span>
                    }
                </h3>
            </Link>
        ));

        let hover = this.state.hover;

        return (
            <div>
                <div className={this.state.home ? "gradient-background": "white-background"}>
                    {this.state.home ? <div></div> : <img src={logo} className="nav-logo" alt=""/>}
                    <div className="navbar-holder">
                        <FiSearch className={"icons " + (this.state.home? "beige-white" : "brown")} id="search"/>
                        <div className="navbar">
                            {this.state.home ? beigeLinks : brownLinks}
                        </div>
                        <Link to="/cart"><FiShoppingBag className={"icons " + (this.state.home? "beige-white" : "brown")} id="cart"/></Link>
                        {/*hover ? <NavElement element={data[hover-1]} handleMouseLeave={this.handleMouseLeave}></NavElement> : <div></div>*/}
                    </div>
                </div>
                <div className={this.state.scroll? "white-background sticky" : "white-background transparent"}>
                    <div className="navbar-holder-sticky"> 
                        <div className="left">
                            <img src={logo} className="nav-logo-sticky" alt=""/>
                            <div className="navbar-sticky">{brownLinks}</div>
                        </div>
                        <div className="right">
                            <FiSearch className="icons brown"/>
                            <Link to="/cart"><FiShoppingBag className="icons icons-sticky brown"/></Link>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
