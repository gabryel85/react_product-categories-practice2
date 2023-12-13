import React from 'react';

export const UsersInfo = (
  { users, filterById, onFilterName, resetFilterById },
) => {
  const handleClick = (userId) => {
    onFilterName(userId);
  };

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={resetFilterById}
        className={filterById === '' ? 'is-active' : ''}
      >
        All
      </a>
      {users.map(user => (
        <a
          data-cy="FilterAllUsers"
          href="#/"
          key={user.id}
          onClick={() => handleClick(user.id)}
          className={filterById === user.id ? 'is-active' : ''}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
