import classNames from 'classnames';

export const SearchBar = ({ query, onChangeCallback }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value;

    onChangeCallback(inputValue);
  };

  const resetInput = () => {
    onChangeCallback('');
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        <span className="icon is-right">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="ClearButton"
            type="button"
            className={classNames({ delete: true,
              'is-hidden': !query.length })}
            onClick={resetInput}
          />
        </span>
      </p>
    </div>
  );
};
