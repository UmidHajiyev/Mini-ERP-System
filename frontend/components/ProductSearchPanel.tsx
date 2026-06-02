import type { ProductSearchPanelProps } from "@/types/productSearchPanel";

export default function ProductSearchPanel({categories,nameFilter,setNameFilter,skuFilter,setSkuFilter,
  minPriceFilter,setMinPriceFilter,maxPriceFilter,setMaxPriceFilter,selectedCategoryId,setSelectedCategoryId,
  selectedStockStatus,setSelectedStockStatus,onSearch,onClear,}: ProductSearchPanelProps) 
{
  return (
    <section className="search-panel">
      <div className="search-grid">
        <input
          placeholder="Search by name"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
        />

        <input
          placeholder="Search by SKU"
          value={skuFilter}
          onChange={(event) => setSkuFilter(event.target.value)}
        />

        <select
          value={selectedCategoryId}
          onChange={(event) => setSelectedCategoryId(event.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min price"
          value={minPriceFilter}
          onChange={(event) => setMinPriceFilter(event.target.value)}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPriceFilter}
          onChange={(event) => setMaxPriceFilter(event.target.value)}
        />

        <select
          value={selectedStockStatus}
          onChange={(event) => setSelectedStockStatus(event.target.value)}
        >
          <option value="">All Stock Levels</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      <div className="search-actions">
        <div className="search-actions">
            <button className="secondary-button" onClick={onClear}>
                Clear
            </button>
            <button className="primary-button" onClick={onSearch}>
                Search
            </button>
            </div>
      </div>
    </section>
  );
}