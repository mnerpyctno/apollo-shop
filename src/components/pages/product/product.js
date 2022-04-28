import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import './product.css';

import { PRODUCT_DATA } from "../../server/query";

export function Product({ currency, getAmount, changeCartProducts, cartProducts }) {
    let params = useParams();
    const [currentImage = 0, setCurrentImage] = useState(0);
    const [selectedAttribute = {}, setSelectedAttribute] = useState({});
    const { loading, error, data } = useQuery(PRODUCT_DATA, {
        variables: {
            id: params.product,
        }
    });

    if(loading) return '...';
    if(error) {
        return (
            <>
                <section className="product">
                    <h2>Something went wrong...</h2>
                    <Link to="/">Back to Home</Link>
                </section>
            </>
        )
    }

    const { product } = data;

    const addToCart = () => {
        if(product.attributes.length > 0 && Object.keys(selectedAttribute).length !== product.attributes.length) {
            alert(`Please, choose the ${product.attributes.map(item => item.name.toUpperCase()).join(', ')}`)
        } else {
            changeCartProducts({ ...cartProducts, 
                                [params.product]: selectedAttribute }); 
        }
    }

    return (
        <>
            <section className="product">
                <div className="product__left-side">
                    <div className="product-gallery__selector">
                        {product.gallery.map((image, i) => (
                            <img src={image} alt={product.name} className="product-gallery__selector-image" onClick={() => setCurrentImage(i)} key={i} />
                        ))}
                    </div>
                    <div className="product-image">
                        <img src={product.gallery[currentImage]} alt={product.name}/>
                    </div>
                </div>
                <div className="product__right-side">
                    <p className="product-data__brand">{product.brand}</p>
                    <p className="product-data__name">{product.name}</p>
                    <div className="product-attributes">
                        {product.attributes.map(({name, items, type}) => (
                            <>
                                <p className="product-attributes__name" key={name}>{name}</p>
                                <div className="product-attributes__list" key={type}>
                                    {items.map(({id, value}) => {
                                        const style = { 
                                            backgroundColor: 'transparent', 
                                            border: '2px solid #1D1F22',
                                            color: '#1D1F22',
                                            cursor: 'pointer',
                                        };
                                        if(selectedAttribute[name] === id && type !== 'swatch') {
                                            style.backgroundColor = '#1D1F22';
                                            style.color = 'white';
                                        } else if(type === 'swatch' && selectedAttribute[name] !== id) {
                                            style.backgroundColor = value;
                                            style.border = 'none';
                                            value = '';
                                        } else if(selectedAttribute[name] === id && type === 'swatch') {
                                            style.backgroundColor = value;
                                            style.border = '2px solid #5ECE7B';
                                            value = '';
                                        }
                                        return (
                                            <button value={id} onClick={() => setSelectedAttribute({...selectedAttribute, [name]: id}) } style={style} key={id}>{value}</button>
                                        )
                                    })}
                                </div>
                            </>
                        ))}
                        <div className="product-price">
                            <p className="product-price__header">Price</p>
                            <p className="product-price__amount">{product.prices[currency].currency.symbol} {getAmount(product.prices[currency].amount)}</p>
                        </div>
                        <button className="product-add" onClick={ addToCart }>Add to cart</button>
                        <div className="product-description" dangerouslySetInnerHTML={{__html: product.description }}/>
                    </div>
                </div>
            </section>
        </>
    )
}