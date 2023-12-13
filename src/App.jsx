import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const allProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    category => category.id === product.categoryId,
  );
  const user = usersFromServer.find(user => user.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const allCategories = categoriesFromServer.map(category => category.title);
  const [isSearch, setIsSearch] = useState('');
  const [isUser, setIsUser] = useState('');
  const [isCategories, setIsCategories] = useState(allCategories);
  const [chooseCategories, setChooseCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [products, setProducts] = useState(allProducts);

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Product' },
    { key: 'category.title', label: 'Category' },
    { key: 'user.name', label: 'User' },
  ];

  const filter = (selectedUser, selectedCategories, searchTerm) => {
    setIsUser(selectedUser);
    setIsCategories(selectedCategories);

    const filteredProducts = allProducts.filter((product) => {
      const userCondition
        = selectedUser !== '' ? product.user.name === selectedUser : true;
      const categoryCondition
        = selectedCategories !== ''
          ? selectedCategories.includes(product.category.title)
          : true;
      const searchCondition
        = searchTerm !== ''
          ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true;

      return userCondition && categoryCondition && searchCondition;
    });

    setProducts(filteredProducts);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;

    setIsSearch(searchTerm);
    filter(isUser, isCategories, searchTerm);
  };

  const handleChooseUser = (event) => {
    // Nie moglem tutaj zrobić target.value nie wiem czemu
    const selectedUser = event.target.getAttribute('value') || '';

    setIsUser(selectedUser);
    filter(selectedUser, isCategories, isSearch);
  };

  const handleChooseCategory = (event) => {
    // tutaj tez
    const selectedCategory = event.target.getAttribute('value') || '';

    if (selectedCategory === 'All') {
      setChooseCategories([]);
      filter(isUser, [], isSearch);
    } else {
      const updatedCategories = chooseCategories.includes(selectedCategory)
        ? chooseCategories.filter(category => category !== selectedCategory)
        : [...chooseCategories, selectedCategory];

      setChooseCategories(updatedCategories);
      filter(isUser, updatedCategories, isSearch);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });

    const sortedProducts = [...products].sort((a, b) => {
      const aValue = key.includes('.')
        ? key.split('.').reduce((acc, next) => acc[next], a)
        : a[key];
      const bValue = key.includes('.')
        ? key.split('.').reduce((acc, next) => acc[next], b)
        : b[key];

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }

      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }

      return 0;
    });

    setProducts(sortedProducts);
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
                href="#/"
                value=""
                onClick={event => handleChooseUser(event)}
                className={`${isUser === '' ? 'is-active' : ''}`}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  href="#/"
                  value={user.name}
                  onClick={event => handleChooseUser(event)}
                  className={`${isUser === user.name ? 'is-active' : ''}`}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={isSearch}
                  onChange={event => handleSearch(event)}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                <span className="icon is-right">
                  {isSearch && (
                    <button
                      type="button"
                      className="delete"
                      onClick={() => {
                        setIsSearch('');
                        setProducts(allProducts);
                      }}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                value="All"
                onClick={event => handleChooseCategory(event)}
                className={`button is-success mr-6 is-outlined ${
                  chooseCategories.length === 0 ? 'is-active' : ''
                }`}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  href="#/"
                  value={category.title}
                  onClick={event => handleChooseCategory(event)}
                  className={`button mr-2 my-1 ${
                    chooseCategories.includes(category.title) ? 'is-info' : ''
                  }`}
                >
                  {category.title}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {products.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          <table className="table is-striped is-narrow is-fullwidth">
            <thead>
              <tr>
                {tableColumns.map(column => (
                  <th key={column.key}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {column.label}
                      <a
                        href="#/"
                        onClick={(event) => {
                          event.preventDefault();
                          handleSort(column.key);
                        }}
                      >
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={`fas ${
                              sortConfig.key === column.key
                                ? sortConfig.direction === 'ascending'
                                  ? 'fa-sort-up'
                                  : 'fa-sort-down'
                                : 'fa-sort'
                            }`}
                          />
                        </span>
                      </a>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr key={product.id} data-cy="Product">
                  <td
                    className="has-text-weight-bold"
                    data-cy="ProductId"
                  >
                    {product.id}
                  </td>
                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.category.icon} - ${product.category.title}`}
                  </td>
                  <td
                    data-cy="ProductUser"
                    className={`${
                      product.user.sex === 'f'
                        ? 'has-text-danger'
                        : 'has-text-link'
                    }`}
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

export default App;
