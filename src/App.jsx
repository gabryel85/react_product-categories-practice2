import React, { useEffect, useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId);
  const user = usersFromServer.find(usr => usr.id === category?.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [order, setOrder] = useState({
    sortType: 'asc',
    sortBy: 'id',
  });

  const handleReset = () => {
    setSelectedUser('');
    setQuery('');
    setSelectedCategory([]);
    setOrder({
      sortType: 'asc',
      sortBy: 'id',
    });
  };

  const handleCategoryClick = id => () => {
    if (selectedCategory.includes(id)) {
      setSelectedCategory(prev => prev.filter(categoryid => categoryid !== id));

      return;
    }

    setSelectedCategory(prev => [...prev, id]);
  };

  useEffect(() => {
    let tempProducts = [...products];

    if (selectedUser) {
      tempProducts = tempProducts
        .filter(product => product.user.name === selectedUser);
    }

    if (query) {
      tempProducts = tempProducts
        .filter(product => product.name.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()));
    }

    if (selectedCategory.length) {
      tempProducts = tempProducts
        .filter(product => selectedCategory.includes(product.category.id));
    }

    tempProducts.sort((p1, p2) => {
      switch (order.sortBy) {
        case 'id':
          return p1.id - p2.id;
        case 'product':
          return p1.name.localeCompare(p2.name);
        case 'category':
          return p1.category?.title.localeCompare(p2.category?.title);
        case 'user':
          return p1.user?.name.localeCompare(p2.user?.name);
        default:
          return 0;
      }
    });

    if (order.sortType === 'desc') {
      tempProducts = tempProducts.reverse();
    }

    setVisibleProducts(tempProducts);
  }, [selectedUser, query, selectedCategory, order]);

  const handleSort = sortBy => () => {
    setOrder(prev => ({
      sortType: prev.sortBy === sortBy ? "desc" : "asc",
      sortBy,
    }));
  }

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
                className={classNames({
                  'is-active': !selectedUser,
                })}
                onClick={() => setSelectedUser('')}
              >
                All
              </a>
              {
                usersFromServer.map(user => (
                  <a
                    key={user.id}
                    data-cy="FilterUser"
                    href="#/"
                    className={classNames({
                      'is-active': selectedUser === user.name,
                    })}
                    onClick={() => setSelectedUser(user.name)}
                  >
                    {user.name}
                  </a>
                ))
              }
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value.trimStart())}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {
                  query && (
                    <span className="icon is-right">
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={() => setQuery('')}
                      />
                    </span>
                  )
                }

              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
                onClick={() => setSelectedCategory([])}
              >
                All
              </a>
              {
                categoriesFromServer.map(category => (
                  <a
                    key={category.id}
                    data-cy="Category"
                    className={classNames('button mr-2 my-1', {
                      'is-info': selectedCategory.includes(category.id),
                    })}
                    href="#/"
                    onClick={handleCategoryClick(category.id)}
                  >
                    {category.title}
                  </a>
                ))
              }
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {
            !visibleProducts.length && (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
          }

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
                      <span
                        className="icon"
                        onClick={handleSort('id')}
                      >
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
              </th>

              <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon"  onClick={handleSort('product')}>
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
              </th>

              <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon"  onClick={handleSort('category')}>
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
              </th>

              <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon" onClick={handleSort('user')}>
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
              </th>
            </tr>
            </thead>

            <tbody>
            {
              visibleProducts.map(product => (
                <tr
                  key={product.id}
                  data-cy="Product"
                >
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.category.icon} - ${product.category.title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={classNames('has-text-link', {
                      'has-text-danger': product.user.sex === 'f',
                    })}
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))
            }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
