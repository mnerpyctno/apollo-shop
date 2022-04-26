import { gql } from "@apollo/client";

export const CATEGORIES_NAMES = gql`
  query getCategoriesNames {
    categories {
      name
    }
  }`;

export const PRODUCTS_PER_CATEGORY = gql`
  query GetProduct($name: String!) {
    category(input: { title: $name }) { 
      products { 
        id,
        brand,
        name,
        gallery,
        prices {
          currency {
            symbol
          },
          amount
        }
      }
    }
  }`;

export const ALL_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label,
      symbol
    }
  }`;

export const PRODUCT_DATA = gql`
  query getProductData($id: String!) {
    product(id: $id) {
      name,
      inStock,
      gallery,
      description,
      category,
      attributes {
        id,
        name,
        type,
        items {
          displayValue,
          value,
          id,
        },
      },
      prices {
        currency {
          label,
          symbol,
        },
        amount,
      },
      brand,
    },
  },
`;