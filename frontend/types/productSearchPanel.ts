import type { Category } from "@/types/category";

export type ProductSearchPanelProps = {
  categories: Category[];

  nameFilter: string;
  setNameFilter: (value: string) => void;

  skuFilter: string;
  setSkuFilter: (value: string) => void;

  minPriceFilter: string;
  setMinPriceFilter: (value: string) => void;

  maxPriceFilter: string;
  setMaxPriceFilter: (value: string) => void;

  selectedCategoryId: string;
  setSelectedCategoryId: (value: string) => void;

  selectedStockStatus: string;
  setSelectedStockStatus: (value: string) => void;

  onSearch: () => void;
  onClear: () => void;
};