import React from 'react'
import navbarCollectionsChloe from '../images/navbar-collections-chloe.jpg';
import navbarCollectionsSee from '../images/navbar-collections-see.jpg';
import navbarMaisonAlphabet from '../images/navbar-maison-alphabet.jpg';
import navbarMaisonAtelier from '../images/navbar-maison-atelier.jpg';
import navbarMaisonExhibition from '../images/navbar-maison-exhibition.jpg';
import navbarMaisonHistory from '../images/navbar-maison-history.jpg';
import navbarMaisonNatacha from '../images/navbar-maison-natacha.jpeg';
import navbarGirlsCampaign from '../images/navbar-girls-campaign.png';
import navbarGirlsForward from '../images/navbar-girls-forward.png';
import navbarGirlsHighlights from '../images/navbar-girls-highlights.jpg';

export default [
    {
        title: "chloé",
        categories: {
        "bags": ["New Arrivals", "Daria", "Darryl", "Tess", "Marcie", "Chloé C", "Drew", "Faye", "Aby"],
        "shoes": ["New arrivals", "Ballerinas", "Sneakers", "Sandals", "Boots", "Mocassins and slippers", "Pumps"],
        "ready-to-wear": ["New arrivals", "Tops and blouses", "Dresses", "Pants", "Skirts and shorts", "Coats and jackets", "Knitwear", "Chloé Signatures"],
        "accessories": ["New arrivals", "Wallets", "Small leather goods", "Jewellery", "Sunglasses", "More Accessories", "Personalisation"],
        },
        others: ["summer 2020", "new arrivals", "unicef", "children", "fragrances", "personalisation", "chloé signatures"],
        css: "shop-chloe",
    },
    {
        title: "see by chloé",
        categories: {
        "ready-to-wear": ["New arrivals", "Tops & blouses", "Dresses", "Pants", "Skirts & shorts", "Coats & jackets", "Knitwear"],
        "bags": ["New arrivals", "Crossbody bags", "Tote bags", "Mini bags", "Backpacks"],
        "accessories": ["New arrivals", "Wallets", "Small leather goods", "Shoes"],
        "new arrivals": [],
        },
        css: "shop-see",
    },
    {
        title: "collections",
        categories: {
        "chloé": {
            collections: ["Fall Winter 2020 Runway", "Spring Summer 2020 Runway", "Spring 2020"],
            image: navbarCollectionsChloe,
        },
        "see by chloé": {
            collections: ["Summer 2020", "Spring 2020", "Winter 2019"],
            image: navbarCollectionsSee,
        },
        }
    },
    {
        title: "maison",
        categories: [ 
            {
                title: "natacha ramsay-levi",
                image: navbarMaisonNatacha,
            },
            {
                title: "atelier",
                image: navbarMaisonAtelier,
            },
            {
                title: "history",
                image: navbarMaisonHistory,
            },
            {
                title: "alphabet",
                image: navbarMaisonAlphabet,
            },
            {
                title: "exhibition",
                image: navbarMaisonExhibition,
            },
        ]
    },
    {
        title: "#chloégirls",
        categories: [
            {
                title: "highlights from the fall winter 2020 show",
                image: navbarGirlsHighlights, 
            },
            {
                title: "raising awareness for girls forward",
                image: navbarGirlsForward,
            },
            {
                title: "the spring summer 2020 campaign",
                image: navbarGirlsCampaign,
            },
        ]
    }
]
