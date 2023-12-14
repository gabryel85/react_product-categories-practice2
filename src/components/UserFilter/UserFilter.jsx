export const UserFilter = ({ users, activeUser, onChangeCallback }) => {
  const handleClick = name => () => {
    if (name === 'all') {
      onChangeCallback('all');

      return;
    }

    const selectedUser = users.find(user => user.name === name);

    onChangeCallback(selectedUser.name);
  };

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={activeUser === 'all' ? 'is-active' : ''}
        onClick={handleClick('all')}
      >
        All
      </a>
      {users.map(user => (
        <a
          data-cy="FilterUser"
          href="#/"
          key={user.id}
          className={activeUser === user.name ? 'is-active' : ''}
          onClick={handleClick(user.name)}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
