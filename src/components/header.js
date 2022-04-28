import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import Select from 'react-select';

import './header.css';
import logo from '../logo.svg';
import cart from './cart.svg';
import { ALL_CURRENCIES } from './server/query';

export function Header({ categories = [], currency, cartProducts}) {
    let currencies = [];
    const { loading, data } = useQuery(ALL_CURRENCIES);

    if(loading) return false;

    currencies.push(data.currencies.map((item, i) => {
        return { value: i, "label": item.symbol };
    }));

    const styleSelect = {
        control: base => ({
          ...base,
          border: 0,
          boxShadow: "none"
        })
      };

    const handleChange = (e) => {
        window.location.reload();
        return localStorage.setItem('currrency', e.value);
    }

    return (
        <>
            <section className="navbar">
                <div className="navbar_wrapper">
                    <nav className="navbar__menu">
                        { categories.map((name) => (
                            <Link to={'/' + name} className="navbar__menu-item" key={name}>{name}</Link>
                        )) }
                    </nav>
                    <div className="navbar__brand">
                        <Link to="/"><img src={logo} alt="Brand Name" /></Link>
                    </div>
                    <div className="navbar__actions">
                        <Select 
                            defaultValue={currencies[0][currency]} 
                            options={currencies[0]} 
                            className="navbar__actions-currency"
                            classNamePrefix="navbar__actions-currency"
                            styles={styleSelect}
                            isSearchable={false}
                            onChange={handleChange}
                        /> 
                        <Link to="/cart" className="navbar__actions-cart">
                            <img src={cart} alt="Cart" />
                            <div className="navbar__actions-cart_counter">
                                <p>{cartProducts ? Object.values(cartProducts).length : 0 }</p>
                            </div>
                        </Link>
                    </div>                    
                </div>
            </section>
        </>
    )
}