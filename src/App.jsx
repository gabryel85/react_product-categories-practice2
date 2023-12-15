import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const App = () => {
  const users = usersFromServer;
  const categories = categoriesFromServer;
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const products = productsFromServer.map((product) => {
    const category = categories.find(categ => categ.id === product.categoryId);
    const user = users.find(element => element.id === category.ownerId);

    return {
      ...product,
      category,
      user,
    };
  });

  const handleFilterReset = () => {
    setSelectedUser(null);
    setSearchValue('');
  };

  const filteredProducts = products.filter((product) => {
    const productFilterInput = searchValue
      ? product.name.toLowerCase().includes(searchValue.toLowerCase())
      : true;

    const userFilterInput = selectedUser
      ? product.user === selectedUser
      : true;

    return productFilterInput && userFilterInput;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={selectedUser === null ? 'is-active' : ''}
                onClick={() => setSelectedUser(null)}
              >
                All
              </a>
              {users.map(user => (
                <a
                  key={user.id}
                  data-cy={`FilterUser${user.id}`}
                  href="#/"
                  className={selectedUser === user ? 'is-active' : ''}
                  onClick={() => setSelectedUser(user)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search by product"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchValue && (
                <span className="icon is-right">
                  <button
                    data-cy="ClearButtonProduct"
                    type="button"
                    className="delete"
                    onClick={() => setSearchValue('')}
                  />
                </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>
              {categories.map(category => (
                <a
                  data-cy="Category"
                  value={category.title}
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
            </div>
            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleFilterReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 && (
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
          )}
          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>

                  <td data-cy="ProductCategory">
                    {product.category.icon}
                    {' '}
                    -
                    {' '}
                    {product.category.title}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={product.user.sex === 'm'
                      ? 'has-text-link'
                      : 'has-text-danger'}
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
