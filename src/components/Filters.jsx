export const Filters = ({
  users,
  categories,
  selectedUserName,
  onSelectUser,
  queryValue,
  onChangeQuery,
  onFilterReset,
  onSelectCategory,
  selectedCategoryName,
}) => {
  const allUsrClassName = selectedUserName === 'All' ? 'is-active' : '';

  const handleUserClick = (userName) => {
    if (userName === selectedUserName) {
      return;
    }

    onSelectUser(userName);
  };

  const handleQueryChange = (value) => {
    onChangeQuery(value);
  };

  const handleCategoryClick = (categoryName) => {
    onSelectCategory(categoryName);
  };

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            name="All"
            data-cy="FilterAllUsers"
            href="#/"
            className={allUsrClassName}
            onClick={event => handleUserClick(event.target.name)}
          >
            All
          </a>

          {
            users.map(user => (
              <a
                key={user.id}
                data-cy="FilterUser"
                href="#/"
                className={
                  user.name === selectedUserName
                    ? 'is-active'
                    : ''
                  }
                onClick={() => handleUserClick(user.name)}
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
              value={queryValue}
              onChange={event => handleQueryChange(event.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            <span className="icon is-right">
              {
                queryValue !== ''
                && (
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => handleQueryChange('')}
                  />
                )
              }
            </span>
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className={"button is-success mr-6 is-outlined"}
            onClick={() => handleCategoryClick('All')}
          >
            All
          </a>

          {
            categories.map(category => (
              <a
                key={category.id}
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
                onClick={() => handleCategoryClick(category.title)}
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
            onClick={onFilterReset}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
