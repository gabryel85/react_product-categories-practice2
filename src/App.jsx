/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useRef, useState } from 'react';
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
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener('input', () => {
      setInputValue(inputRef.current.value);
    });
  }, []);

  const addCategory = (category) => {
    if (selectedCategories.includes(category) && category !== 'All') {
      const filtered = selectedCategories
        .filter(title => title !== category);

      setSelectedCategories(filtered.length > 0 ? filtered : ['All']);

      return;
    }

    if (category === 'All') {
      setSelectedCategories(['All']);

      return;
    }

    const copyCategories = selectedCategories[0] === 'All'
      ? []
      : [...selectedCategories];

    copyCategories.push(category);

    setSelectedCategories(copyCategories);
  };

  const resetFilters = () => {
    setSelectedUser('All');
    setSelectedCategories(['All']);
  };

  const resetInput = () => {
    setInputValue('');
    inputRef.current.value = '';
  };

  const findUser = id => usersFromServer.find(user => user.id === id);

  const findCategory = id => categoriesFromServer
    .find(category => category.id === id);

  const getCategoryString = (id) => {
    const category = findCategory(id);

    return `${category.icon} - ${category.title}`;
  };

  const isViable = (product) => {
    const category = findCategory(product.categoryId);
    const user = findUser(category.ownerId).name;

    if ((selectedUser === 'All' || selectedUser === user)
      && (selectedCategories.includes('All')
      || selectedCategories.includes(category.title))) {
      if (product.name.toLowerCase().includes(inputValue.toLowerCase())) {
        return true;
      }
    }

    return false;
  };

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
                className={selectedUser === 'All' ? 'is-active' : ''}
                onClick={() => setSelectedUser('All')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={selectedUser === user.name ? 'is-active' : ''}
                  onClick={() => setSelectedUser(user.name)}
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
                  placeholder="Search"
                  ref={inputRef}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {inputValue !== ''
                    ? (
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={resetInput}
                      />
                    )
                    : null}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
                onClick={() => addCategory('All')}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  href="#/"
                  className={selectedCategories.includes(category.title)
                    ? 'button mr-2 my-1 is-info'
                    : 'button mr-2 my-1'}
                  onClick={() => addCategory(category.title)}
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
                onClick={resetFilters}
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
              {productsFromServer.map(product => (
                <>
                  {isViable(product)
                    ? (
                      <tr data-cy="Product">
                        {/* eslint-disable-next-line max-len */}
                        <td className="has-text-weight-bold" data-cy="ProductId">
                          {product.id}
                        </td>

                        <td data-cy="ProductName">{product.name}</td>
                        <td data-cy="ProductCategory">
                          {getCategoryString(product.categoryId)}
                        </td>

                        <td
                          data-cy="ProductUser"
                          className={findUser(
                            findCategory(product.categoryId).ownerId,
                          ).sex === 'm'
                            ? 'has-text-link'
                            : 'has-text-danger'
                          }
                        >
                          {findUser(findCategory(
                            product.categoryId,
                          ).ownerId).name}
                        </td>
                      </tr>
                    )
                    : null}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
