import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { ProductCreateData } from "@/types/productCreate";

export type ProductFormModalProps = {
  categories: Category[];
  productToEdit: Product | null;
  error: string;
  onClose: () => void;
  onCreate: (productData: ProductCreateData) => void;
  onUpdate: (productId: number, productData: ProductCreateData) => void;
};