import cn from 'classnames';

export const Product = ({ product }) => {
  const userClassName = cn({
    'has-text-link': product.user.sex === 'm',
    'has-text-danger': product.user.sex === 'f',
  });

  return (
    <tr
      key={product.id}
      data-cy="Product"
    >
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.id}
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">
        {`${product.category.icon} - ${product.category.title}`}
      </td>

      <td
        data-cy="ProductUser"
        className={userClassName}
      >
        {product.user.name}
      </td>
    </tr>
  );
};
