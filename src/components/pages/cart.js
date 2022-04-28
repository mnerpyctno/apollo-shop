import React from 'react';
import { useQuery } from '@apollo/client';

import './cart.css';

import { PRODUCT_DATA } from "../server/query";

export function Cart({ cartProducts }) {
    
    // const {loading, error, data} = useQuery(PRODUCT_DATA);
    if(!cartProducts) {
        return (
            <section>
                The shopping cart is in development. Follow the commits to see the result in the near future.
            </section>
        )
    }
    return (
        <>
        <section className="cart">
            <h2>Cart</h2>
            <div className="cart__products-list">

            </div>
        </section>
        </>
    )
}