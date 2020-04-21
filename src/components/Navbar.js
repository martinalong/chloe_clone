import React, { Component } from 'react'
import inventory from '../data/InventoryData';
import catalog from '../data/CatalogData';
import {FiSearch, FiShoppingBag} from 'react-icons/fi';
import {Link, NavLink} from 'react-router-dom';
import logo from '../images/chloe-logo.svg';

function formatSlug(slug) {
    return slug.split(" ").join("-").toLowerCase().replace("é", "e").replace("&", "and").replace("#", "");
}

/**
 * If hover is null, don't show the dropdown. If it's a specific number, show that one's dropdown. Pass in a nav-element 
 * with the specific object holding the info and a "type" that specifies which class to use for styling
 */
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.untoggleSearch = this.untoggleSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.search = this.search.bind(this);
        this.state = {
          hover: 0,
          home: props.home,
          scroll: false,
          search: false,
          input: null,
          results: null
        }
        let collection, categories, subcategories;
        let content = [];
        let slug, slug2, slug3;
        for (let i = 1; i < 6; i++) {
            switch (i) {
                case 1:
                case 2:
                    if (i == 1) {
                        collection = catalog['chloe'];
                        slug = '/shop/chloe';
                    } else {
                        collection = catalog['see-by-chloe'];
                        slug = '/shop/see-by-chloe';
                    }
                    categories = [];
                    for (let category in collection) {
                        if (category != "title") {
                            slug2 = slug + "/" + category;
                            subcategories = [];
                            category = collection[category];
                            for (let subcategory in category) {
                                if (subcategory != "title") {
                                    slug3 = slug2 + "/" + subcategory;
                                    subcategory = category[subcategory];
                                    subcategories.push(<NavLink to={slug3} activeClassName="dark-link"><h5 className='subcategory'>{subcategory.title}</h5></NavLink>);
                                }
                            }
                            categories.push(<div className='column'><Link to={slug2}><h4 className='category gold-category'>{category.title}</h4></Link><div className='subcategories'>{subcategories}</div></div>);
                        }
                    }
                    content.push(<div className={i == 1 ? 'four-col' : 'three-col'}>{categories}</div>);
                    break;
                case 3:
                    collection = catalog['collections'];
                    slug = '/runway'
                    categories = [];
                    for (let category in collection) {
                        if (category != "title") {
                            slug2 = slug + '/' + category + '/';
                            category = collection[category];
                            subcategories = category['categories'].map((item, i) => <NavLink to={slug2 + formatSlug(item)} activeClassName="dark-link"><h5 className='subcategory' key={i}>{item}</h5></NavLink>);
                            categories.push(<div className='column'><h4 className='category grey-category'>{category.title}</h4><div className='subcategories'>{subcategories}</div><img src={category.image} alt=""/></div>);
                        }
                    }
                    content.push(<div className='two-col'>{categories}</div>)
                    break;
                case 4:
                case 5:
                    if (i == 4) {
                        collection = catalog['maison'];
                        slug = '/maison/'
                    } else {
                        collection = catalog['chloegirls'];
                        slug = '/chloegirls/'
                    }
                    categories = [];
                    for (let category in collection) {
                        if (category != "title") {
                            slug2 = slug + category;
                            category = collection[category];
                            categories.push(<div className='column'><Link to={slug2}><h4 className='category spacer gold-category'>{category.title}</h4><img className='navbar-picture' src={category.image}/></Link></div>);
                        }
                    }
                    content.push(<div className={i == 4 ? 'five-col' : 'three-col'}>{categories}</div>);
                    break;
            }
        }
        this.content = content;
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
        this.textInput.current.focus();
        this.setState({search: true});
    }

    untoggleSearch() {
        this.setState({search: false});
    }

    handleSearch(event) {
        event.preventDefault();
        this.setState({input: event.target.value});
    }

    search() {
        let results = {};
        let name;
        for (let code in inventory) {
            name = inventory[code]['productName'];
            if (name.toLowerCase().indexOf(this.state.input.toLowerCase()) != -1) {
                if (results.hasOwnProperty(name)) {
                    results[name].push(code);
                } else {
                    results[name] = [code];
                }
            }
        }
        return Object.keys(results).map((name) => name + " (" + results[name].length + ")");
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
                this.setState({hover: 0});
            }
            this.setState({scroll: true});
        } else {
            if (this.state.scroll) {
                this.setState({hover: 0});
            }
            this.setState({scroll: false})
        }
    }
      
    render() {
        let links = Object.keys(catalog).map((item, index) => (
            <h3 className={this.state.scroll ? "navbar-link navbar-link-small" : this.state.home ? "navbar-link navbar-link-large" : "navbar-link navbar-link-medium"} onMouseEnter = {() => this.handleMouseEnter({index})}>
                {
                    this.state.home && !this.state.scroll ?
                    <Link to={"/shop/" + item} className="beige-white">{catalog[item]['title']}</Link>: 
                    <NavLink to={"/shop/" + item} className='brown' activeClassName='underline-nav'>{catalog[item]['title']}</NavLink>
                }
            </h3>
        ));
        let dropdownName = "dropdown ";
        if (this.state.home) {
            dropdownName += "home-top-dropdown ";
        }
        return (
            <div onMouseLeave={this.handleMouseLeave} className='nav-element'>
                <div>
                    <div className={this.state.home ? "gradient-background": "white-background"}>
                        {this.state.home ? <div></div> : <Link to="/"><img src={logo} className="nav-logo" alt=""/></Link>}
                        <div className="navbar-holder">
                            <FiSearch className={this.state.home? "icons beige-white" : "icons brown-icons"} id="search" onClick={this.toggleSearch}/>
                            <div className="navbar">
                                {links}
                            </div>
                            <Link to="/cart"><FiShoppingBag className={this.state.home? "icons beige-white" : "icons brown-icons"} id="cart"/></Link>
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
                            <FiSearch className="icons brown-icons" onClick={this.toggleSearch}/>
                            <Link to="/cart"><FiShoppingBag className="icons icons-sticky brown-icons"/></Link>
                        </div>
                    </div>
                </div>

                <div className={this.state.search ? "show-search" : "hide-search"}>
                    <div className="translucent-grey" onClick={this.untoggleSearch}/>
                    <span>
                        <input value={this.state.input} className='search-bar' ref={this.textInput} onChange={this.handleSearch.bind(this)}/>
                        <FiSearch className="grey-icon"/>
                    </span>
                    <div className='results-box'>
                        <div className='search-results'>
                            {this.state.input ? 
                            (this.search().map((name) => <h4 className='result'>{name}</h4>)):
                            <div></div>}
                        </div>
                    </div>
                </div> 
                
                
                <div className={
                    this.state.scroll ? 
                    (this.state.hover ? dropdownName + "sticky-dropdown show-dropdown" : dropdownName + "sticky-dropdown hide-dropdown") : 
                    (this.state.hover ? dropdownName + "top-dropdown show-dropdown" : dropdownName + "top-dropdown hide-dropdown")
                    }>
                    {this.content[this.state.hover-1]}
                </div>
            </div>
        )
    }
}
