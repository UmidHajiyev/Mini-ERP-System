export type StockMovementCreateData = {
  product: number;
  warehouse: string;
  quantity: string;
  movement_type: "IN" | "OUT";
  note: string;
};