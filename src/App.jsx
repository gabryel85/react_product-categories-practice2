/* eslint-disable */
import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getUser(ownerId) {
  const foundUser = usersFromServer
    .find(user => user.id === ownerId);

  return foundUser || null;
}

function getCategory(categoryId) {
  const foundCategory = categoriesFromServer
    .find(cat => cat.id === categoryId);

  return foundCategory || null;
}

export const products = productsFromServer
  .map(p => ({
    ...p,
    category: getCategory(p.categoryId),
    user: getUser(getCategory(p.categoryId).ownerId),
  }));

export function getReorderOption(
  prods,
  sortType,
  isReversed,
) {
  const visiblepProducts = [...prods];

  switch (sortType) {
    case 'ID':
      visiblepProducts.sort((p1, p2) => p1.id - p2.id);
      break;
    case 'PRODUCT':
      visiblepProducts.sort((p1, p2) => p1.name.localeCompare(p2.name));
      break;
    case 'CATEGORY':
      visiblepProducts
        .sort((p1, p2) => p1.category.title.localeCompare(p2.category.title));
      break;
    case 'USER':
      visiblepProducts
        .sort((p1, p2) => p1.user.name.localeCompare(p2.user.name));
      break;
    default:
      break;
  }

  if (isReversed) {
    visiblepProducts.reverse();
  }

  return visiblepProducts;
}

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [categoryTab, setCategoryTab] = useState([]);
  const [sortType, setSortType] = useState('NONE');
  const [isReversed, setIsReversed] = useState(false);

  const handleUserClick = handlerUserId => () => {
    setUserId(handlerUserId);
  };

  const handleCategoryClick = handlerCategoryId => () => {
    setCategoryTab([...categoryTab, handlerCategoryId]);
  };

  const handleCategoryUnclick = handlerCategoryId => () => {
    setCategoryTab([...categoryTab]
      .filter(cat => cat.id !== handlerCategoryId));
  };

  const handleResetClick = () => () => {
    setIsReversed(false);
    setSortType('NONE');
    setCategoryTab([]);
    setUserId(0);
    setQuery('');
  };

  const handleReveresedClick = () => () => {
    setIsReversed(!isReversed);
  };

  const handleQuery = event => () => {
    setQuery(event.target.value);
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
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={handleQuery}
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

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

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
              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  1
                </td>

                <td data-cy="ProductName">Milk</td>
                <td data-cy="ProductCategory">🍺 - Drinks</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
                >
                  Max
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  2
                </td>

                <td data-cy="ProductName">Bread</td>
                <td data-cy="ProductCategory">🍞 - Grocery</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-danger"
                >
                  Anna
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  3
                </td>

                <td data-cy="ProductName">iPhone</td>
                <td data-cy="ProductCategory">💻 - Electronics</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
                >
                  Roma
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
