import type { Product } from "@/types/product";
import Link from "next/link";

type ProductTableProps = {
  products: Product[];
  onEditProduct: (product: Product) => void;
};

const PRODUCT_STATUS = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
} as const;

export default function ProductTable({ products, onEditProduct }: ProductTableProps) {
  function getProductStatus(stock: number, reorderLevel: number) {
    if (stock === 0) return PRODUCT_STATUS.OUT_OF_STOCK;

    if (stock <= reorderLevel) return PRODUCT_STATUS.LOW_STOCK;

    return PRODUCT_STATUS.IN_STOCK;
  }

  function getStatusClass(status: string) {
    if (status === PRODUCT_STATUS.IN_STOCK) return "status-in-stock";

    if (status === PRODUCT_STATUS.LOW_STOCK) return "status-low-stock";

    if (status === PRODUCT_STATUS.OUT_OF_STOCK) return "status-out-of-stock";

    return "";
  }

  return (
    <section className="table-card">
      <table className="product-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Category</th>
            <th>Unit Price</th>
            <th>Stock</th>
            <th>Reorder Level</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const status = getProductStatus(
              product.stock,
              product.reorder_level
            );

            return (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.category_name}</td>
                <td>${Number(product.unit_price).toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.reorder_level}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(status)}`}>
                    {status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="table-action-button" onClick={() => onEditProduct(product)}>
                      Edit
                    </button>

                    <Link className="table-action-button" href={`/products/${product.id}`}>
                      More
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}