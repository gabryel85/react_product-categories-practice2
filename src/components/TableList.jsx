export const TableList = (
  {
    products, categories, users, userMode, filterValue,
  },
) => (
  <>
    {products
      .map((product) => {
        const foundCategory = categories.find(
          category => category.id === product.categoryId,
        );
        const foundUser = users.find(user => user.id === foundCategory.ownerId);
        const filterToLower = filterValue.toLocaleLowerCase();
        const productToLower = product.name.toLocaleLowerCase();

        if (
          userMode !== ''
          && userMode !== foundUser.id) {
          return null;
        }

        if (!productToLower.includes(filterToLower)) {
          return null;
        }

        return (
          <tr key={product.id} data-cy="Product">
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>
            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              {foundCategory ? `${foundCategory.icon} - ${foundCategory.title}` : ''}
            </td>
            <td
              data-cy="ProductUser"
              className={foundUser.sex === 'm'
                ? 'has-text-link'
                : 'has-text-danger'
          }
            >
              {foundUser ? foundUser.name : ''}
            </td>
          </tr>
        );
      })}
  </>
);
