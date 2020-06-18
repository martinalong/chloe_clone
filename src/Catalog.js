import React from 'react'
import Navbar from './components/Navbar';
import Error from './Error';
import catalogData from './data/CatalogData';
import ItemBox from './components/ItemBox';
import Chance from 'chance';

export default function Catalog(props) {
    let collection = props.match.params.collection;
    let category = props.match.params.category;
    let subcategory = props.match.params.subcategory;
    let codes = [];
    var chance1 = new Chance(124);
    if (catalogData.hasOwnProperty(collection) && (collection === "chloe" || collection === "see-by-chloe")) {
        collection = catalogData[collection];
        if (!category) {
            for (let cat in collection) {
                if (cat !== 'title') {
                    codes.push(...(collection[cat]['new-arrivals']['codes']));
                }
            }
            codes = chance1.shuffle(codes);
        }
        else if (collection.hasOwnProperty(category)) {
            category = collection[category];
            if (!subcategory) {
                for (let sub in category) {
                    if (sub !== 'new-arrivals' && sub !== 'title') {
                        codes.push(...(category[sub]['codes']));
                    }
                }
                codes = chance1.shuffle(codes);
            } else if (category.hasOwnProperty(subcategory)) {
                codes = category[subcategory]['codes'];
            }
        }
    }
    if (!codes || codes.length === 0) {
        return (
            <Error/>
        )
    }
    let products = codes.map((code, i) => <ItemBox key={code} className='product-container' code={code}/>)
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
