import { TableList } from './TableList';
import categories from '../api/categories';
import users from '../api/users';
import products from '../api/products';

export const ProductsTable = ({ userMode, filterValue }) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            ID

            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Product

            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort-down" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Category

            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort-up" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            User

            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      <TableList
        products={products}
        categories={categories}
        users={users}
        userMode={userMode}
        filterValue={filterValue}
        // i think i went in wrong way in dividing my components
      />
    </tbody>
  </table>
);
