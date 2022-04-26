import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import './category.css';

import { CategoryHeader } from "./categoryHeader";
import { PRODUCTS_PER_CATEGORY } from "../../server/query";

export function Category({ currency, getAmount }) {
    let params = useParams();
    const [currentCategory, setCurrentCategory] = useState([]);

    const { loading, error, data } = useQuery(PRODUCTS_PER_CATEGORY, {
        variables: { 
            name: params.page,
        },
    });

    useEffect(() => {
        if(!loading) {
          setCurrentCategory(data.category.products)
        }
      }, [data]); 

    return (
        <>
            <CategoryHeader/>
            <section className="category-content">
                { currentCategory.map(({brand, name, gallery, id, prices}) => (
                    <Link to={'/product/' + id} key={id} className="category-content__card_container">
                        <div className="category-content__card">
                            <div className="product-gallery">
                                <img src={gallery[0]} alt={name}/>
                            </div>
                            <div className="product-data">
                                <p className="product-data__title">{brand + ' ' + name}</p>
                                <p className="product-data__price">{prices[currency].currency.symbol} {getAmount(prices[currency].amount)}</p>
                            </div>
                        </div>
                    </Link>
                )) }
            </section>
        </>
    )
}