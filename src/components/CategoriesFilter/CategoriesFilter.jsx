import classNames from 'classnames';

export const CategoriesFilter = ({
  categories, selectedCategories, onChangeCallback,
}) => {
  // const [selectedCategories, setSelectedCategories] = useState([]);

  const handleClick = name => () => {
    if (name === 'all') {
      onChangeCallback([]);

      return;
    }

    const filter = categories.find(category => category.title === name);

    onChangeCallback(prev => [...prev, filter.title]);
  };

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={classNames({ 'button is-success mr-6': true,
          'is-outlined': selectedCategories.length })}
        onClick={handleClick('all')}
      >
        All
      </a>

      {categories.map(category => (
        <a
          data-cy="Category"
          className={classNames({ 'button mr-2 my-1': true,
            'is-info': selectedCategories.includes(category.title) })}
          href="#/"
          key={category.id}
          onClick={handleClick(category.title)}
        >
          {category.title}
        </a>
      ))}

    </div>
  );
};
