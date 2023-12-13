import { useState, useEffect } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { ProductList } from './components/ProductList';
import { Filters } from './components/Filters';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => cat.id === product.categoryId);

  const user = usersFromServer
    .find(usr => usr.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUserName, setSelectedUserName] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [queryValue, setQueryValue] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState([]);

  const onSelectUser = (newSelectedUserName) => {
    setSelectedUserName(newSelectedUserName);
  };

  const onChangeQuery = (value) => {
    setQueryValue(value.trimStart());
  };

  const onSelectCategory = (categoryName) => {
    if (categoryName === 'All') {
      setSelectedCategoryName([]);

      return;
    }

    if (selectedCategoryName.includes(categoryName)) {
      setSelectedCategoryName(prev => prev.filter(cat => cat !== categoryName));

      return;
    }

    setSelectedCategoryName(prev => [...prev, categoryName]);
  };

  const onFilterReset = () => {
    setSelectedUserName('All');
    setQueryValue('');
    setFilteredProducts(products);
  };

  // filtering the products
  useEffect(() => {
    let filtered = products;

    if (selectedUserName !== 'All') {
      filtered = filtered.filter(product => (
        product.user.name === selectedUserName
      ));
    }

    if (selectedCategoryName.length > 0) {
      filtered = filtered.filter(product => (
        selectedCategoryName.includes(product.category.title)
      ));
    }

    if (queryValue !== '') {
      filtered = filtered.filter((product) => {
        const productNameLowerCase = product.name.toLocaleLowerCase();
        const queryLowerCase = queryValue.toLocaleLowerCase();

        return productNameLowerCase.includes(queryLowerCase);
      });
    }

    setFilteredProducts(filtered);
  }, [selectedUserName, queryValue, selectedCategoryName]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <Filters
          users={usersFromServer}
          categories={categoriesFromServer}
          selectedUserName={selectedUserName}
          onSelectUser={onSelectUser}
          queryValue={queryValue}
          onChangeQuery={onChangeQuery}
          onFilterReset={onFilterReset}
          onSelectCategory={onSelectCategory}
          selectedCategoryName={selectedCategoryName}
        />
        <ProductList
          products={filteredProducts}
        />
      </div>
    </div>
  );
};
