import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';

import { CATEGORIES_NAMES } from './components/server/query';
import { Header } from './components/header';
import { Category } from './components/pages/category/category';
import { Product } from './components/pages/product/product';
import { Cart } from './components/pages/cart';

export default function App() {
  const { loading, data } = useQuery(CATEGORIES_NAMES);
  const [categories = ['all'], setCategories] = useState();
  const [currency, setCurrency] = useState();
  const [cartProducts, changeCartProducts] = useState();

  useEffect(() => {
    if(!loading) {
      setCategories(data.categories.map(({name}) => name));
    }
    if(!currency) {
      setCurrency(0);
    }
    setCurrency(localStorage.getItem('currrency'));
  }, [currency, loading, data])

  function getAmount(amount) {
    return amount.toLocaleString('ru-RU');
  }

  return (
    <>
      <Header 
        categories={categories} 
        currency={currency}
        cartProducts={cartProducts}
      />
      <Routes>
          <Route 
            index path="/" 
          />
          <Route 
            path=":page" 
            component="{Page}" 
            element={<Category 
                        currency={currency} 
                        getAmount={getAmount}
                    />} 
          />
          <Route 
            path="product/:product" 
            component="{Products}" 
            element={<Product 
                        currency={currency} 
                        getAmount={getAmount} 
                        cartProducts={cartProducts}
                        changeCartProducts={changeCartProducts}
                      />}
          />
          <Route 
            path="cart" 
            element={<Cart 
                        cartProducts={cartProducts}
                    />}
          />
      </Routes>
    </>
  );
}

// eslint-disable-next-line no-unused-vars
function Products() {
  return (
    <>
      {this.props.match.params.product}
    </>
  )
}

// eslint-disable-next-line no-unused-vars
function Page() {
  return (
    <>
      {this.props.match.params.page}
    </>
  )
}