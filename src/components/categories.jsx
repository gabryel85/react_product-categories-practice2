// import React from 'react';

export const Categories = (
  { categories, onFilterCategory, filterByCategory, resetFilterByCategory },
) => {
  const handleClicke = (id) => {
    onFilterCategory(id);
  };

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={filterByCategory === ''
          ? 'button is-success mr-6 is-outlined'
          : 'button is-success mr-6'}
        onClick={() => resetFilterByCategory}
      >
        All
      </a>
      {categories.map(category => (
        <a
          data-cy="Category"
          href="#/"
          className={filterByCategory === category.id
            ? 'button mr-2 my-1 is-info'
            : 'button mr-2 my-1'}
          key={category.id}
          onClick={() => handleClicke(category.id)}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
