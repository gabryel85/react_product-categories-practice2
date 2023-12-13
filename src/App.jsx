import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductTable } from './components/ProductTable';
import { Filters } from './components/Filters';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    item => item.id === product.categoryId,
  );
  const user = usersFromServer.find(owner => (
    owner.id === category.ownerId
  ));

  return { ...product, category, user };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortType, setSortType] = useState('');
  const [reverseSort, setReverseSort] = useState(false);

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategorySelected = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(cats => cats.filter(c => (
        cat.id !== c.id
      )));
    } else {
      setSelectedCategories(cats => [...cats, cat]);
    }
  };

  const handleResetCategories = () => {
    setSelectedCategories([]);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedUser(null);
  };

  const handleSelectSort = (sortName) => {
    setSortType(sortName);
  };

  const handleReverseSort = (ifReverse) => {
    setReverseSort(ifReverse);
  };

  let filteredProducts = [...products];

  if (selectedUser) {
    filteredProducts = filteredProducts.filter(el => (
      el.user.id === selectedUser.id
    ));
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(el => (
      el.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }

  if (selectedCategories.length) {
    filteredProducts = filteredProducts.filter((el) => {
      let inSelected = false;

      selectedCategories.forEach((category) => {
        if (category.id === el.category.id) {
          inSelected = true;
        }
      });

      return inSelected;
    });
  }

  if (sortType) {
    switch (sortType) {
      case 'id':
        filteredProducts = [...filteredProducts].sort((a, b) => a.id - b.id);
        break;
      case 'product':
        filteredProducts = [...filteredProducts].sort((a, b) => (
          a.name.localeCompare(b.name)
        ));
        break;
      case 'category':
        filteredProducts = [...filteredProducts].sort((a, b) => (
          a.category.title.localeCompare(b.category.title)
        ));
        break;
      case 'user':
        filteredProducts = [...filteredProducts].sort((a, b) => (
          a.user.name.localeCompare(b.user.name)
        ));
        break;
      default:
        break;
    }
  }

  if (reverseSort) {
    filteredProducts = [...filteredProducts].reverse();
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            users={usersFromServer}
            categories={categoriesFromServer}
            onUserSelected={handleUserSelected}
            activeUser={selectedUser}
            currentQuery={searchQuery}
            onQueryChange={handleQueryChange}
            activeCategories={selectedCategories}
            onCategorySelected={handleCategorySelected}
            onCategoryReset={handleResetCategories}
            onFiltersReset={handleResetFilters}
          />
        </div>
        <div className="box table-container">
          {filteredProducts.length
            ? (
              <ProductTable
                products={filteredProducts}
                activeSort={sortType}
                onSortSelected={handleSelectSort}
                isReversed={reverseSort}
                onReverseSort={handleReverseSort}
              />
            )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
      }

        </div>
      </div>
    </div>
  );
};
