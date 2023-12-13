export const Filters = ({
  users, categories,
  onUserSelected, activeUser,
  currentQuery, onQueryChange,
  activeCategories, onCategorySelected, onCategoryReset,
  onFiltersReset,
}) => {
  const onSelectUser = (user) => {
    onUserSelected(user);
  };

  const onSelectCategory = (category) => {
    onCategorySelected(category);
  };

  const onResetCategories = () => {
    onCategoryReset();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          onClick={() => onSelectUser(null)}
          className={!activeUser
            ? 'is-active'
            : ''
          }
        >
          All
        </a>
        {users.map(user => (
          <a
            data-cy="FilterUser"
            href="#/"
            key={user.id}
            className={!!activeUser && activeUser.id === user.id
              ? 'is-active'
              : ''
            }
            onClick={() => onSelectUser(user)}
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
            value={currentQuery}
            onChange={event => onQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {currentQuery && (
            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => onQueryChange('')}
              />
            </span>
          )}

        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className={`button is-success mr-6 ${activeCategories.length
            ? 'is-outlined'
            : ''}`}
          onClick={onResetCategories}
        >
          All
        </a>

        {categories.map(category => (
          <a
            data-cy="Category"
            className={`button mr-2 my-1 ${
              activeCategories.includes(category)
                ? 'is-info'
                : ''
            }`}
            href="#/"
            key={category.id}
            onClick={() => onSelectCategory(category)}
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
          onClick={() => onFiltersReset()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
