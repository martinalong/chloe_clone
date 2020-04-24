import React from 'react'
import catalog from '../data/CatalogData';
import {Link, NavLink} from 'react-router-dom';

function formatSlug(slug) {
    return slug.split(" ").join("-").toLowerCase().replace("é", "e").replace("&", "and").replace("#", "");
}

export default function NavbarContent() {
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
                                subcategories.push(<h5><NavLink to={slug3} className='subcategory' activeClassName="dark-link">{subcategory.title}</NavLink></h5>);
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
                        subcategories = category['categories'].map((item, i) => <h5 key={i}><NavLink to={slug2 + formatSlug(item)} className='subcategory' activeClassName="dark-link">{item}</NavLink></h5>);
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
    return content;
}
