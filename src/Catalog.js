import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Error from './Error';
import catalogData from './data/CatalogData';
import ItemBox from './components/ItemBox';
import Chance from 'chance';

export default class Catalog extends Component {
    constructor(props) {
        super(props);
        let collection = this.props.match.params.collection;
        let category = this.props.match.params.category;
        let subcategory = this.props.match.params.subcategory;
        this.codes = [];
        var chance1 = new Chance(124);
        if (catalogData.hasOwnProperty(collection) && (collection == "chloe" || collection == "see-by-chloe")) {
            console.log("made it");
            collection = catalogData[collection];
            if (!category) {
                for (let cat in collection) {
                    if (cat != 'title') {
                        
                        this.codes.push(...(collection[cat]['new-arrivals']['codes']));
                    }
                }
                this.codes = chance1.shuffle(this.codes);
            }
            else if (collection.hasOwnProperty(category)) {
                category = collection[category];
                if (!subcategory) {
                    for (let sub in category) {
                        if (sub != 'new-arrivals' && sub != 'title') {
                            this.codes.push(...(category[sub]['codes']));
                        }
                    }
                    this.codes = chance1.shuffle(this.codes);
                } else if (category.hasOwnProperty(subcategory)) {
                    this.codes = category[subcategory]['codes'];
                }
            }
        }
    }

    render() {
        console.log(this.codes);
        if (!this.codes || this.codes.length == 0) {
            return (
                <Error/>
            )
        }
        let products = this.codes.map((code, i) => <ItemBox className='product-container' code={code}/>)
        return (
            <div>
                <Navbar home={false}/>
                {/*<Hero home={false} caption={this.caption} image={this.image}/>*/}
                <div className='catalog-products'>
                    {products}
                </div>
            </div>
        )
    }
}
