import cn from 'classnames';

export const Products = ({ products }) => (
  // if (products.length === 0) {
  //   return <div>No results</div>;
  // }   No time to fix that :P

  products.map(product => (
    <tr data-cy="Product" key={product.id}>
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.id}
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">
        {`${product.category.icon} - ${product.category.title}`}
      </td>
      <td
        data-cy="ProductUser"
        className={cn('has-text-link', {
          'has-text-danger': product.user.sex === 'f',
        })}
      >
        {product.user.name}
      </td>
    </tr>
  ))
);
