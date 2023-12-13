import React, { useState } from 'react';
import './App.scss';

import { UsersInfo } from './components/User';
import { Categories } from './components/categories';
import { Products } from './components/products';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const App = () => {
  const [filterById, setFilterById] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');

  const onFilterName = (name) => {
    setFilterById(name);
  };

  const resetFilterById = () => {
    setFilterById('');
  };

  const onFilterCategory = (name) => {
    setFilterByCategory(name);
  };

  const resetFilterByCategory = () => {
    setFilterByCategory('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UsersInfo
              users={[...usersFromServer]}
              filterById={filterById}
              onFilterName={onFilterName}
              resetFilterById={resetFilterById}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value=""
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
                  />
                </span>
              </p>
            </div>

            <Categories
              categories={[...categoriesFromServer]}
              filterByCategory={filterByCategory}
              onFilterCategory={onFilterCategory}
              resetFilterByCategory={resetFilterByCategory}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilterByCategory}
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
          <Products
            products={[...productsFromServer]}
            filterById={filterById}
            resetFilterByCategory={resetFilterByCategory}
          />
        </div>
      </div>
    </div>
  );
};
