import type { Warehouse } from "@/types/warehouse";
import type { StockMovementCreateData } from "@/types/stockMovementCreate";

export type StockMovementModalProps = {
  productId: number;
  warehouses: Warehouse[];
  error: string;
  onClose: () => void;
  onCreate: (movementData: StockMovementCreateData) => void;
};