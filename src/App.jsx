import React, { useEffect, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductList, UserPanel } from './components';
import { CategoryPanel } from './components/CategoryPanel';

// function getUser(id) {
//   const foundUser = usersFromServer.find(user => user.id === id);

//   return foundUser || null;
// }

// function getCategory(categoryId) {
//   const foundCategory = categoriesFromServer
//     .filter(category => category.id === categoryId);

//   return foundCategory;
// }

// const products = productsFromServer.map((product) => ({
//   ...product,
//   category: getCategory(product.categoryId),
//   user: getUser(product.id),
// }));

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId);
  const user = usersFromServer.find(u => u.id === category?.ownerId);

  return { ...product, category, user };
});

export const App = () => {
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    const { value } = event.target;

    setQuery(value);
  };

  const searchProduct = visibleProducts.filter(product => {
    const searchWord = query.toLowerCase().trim();
    const nameMatches = product.name.toLowerCase()
      .includes(searchWord);

    return nameMatches;
  });

  const resetSeacrhBar = () => {
    setQuery('');
  };

  useEffect(() => {
    if (searchProduct) {
      setVisibleProducts(searchProduct);
    }
  }, [query]);

  const filterByUser = (name) => {
    setVisibleProducts(visibleProducts
      .filter(product => name === product.name));
  };


  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserPanel
              visibleProducts={visibleProducts}
              users={usersFromServer}
              filterByUser={filterByUser}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={handleSearch}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={resetSeacrhBar}
                  />
                </span>
              </p>
            </div>

            <CategoryPanel categories={categoriesFromServer} />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <ProductList products={visibleProducts} />
        </div>
      </div>
    </div>
  );
};
