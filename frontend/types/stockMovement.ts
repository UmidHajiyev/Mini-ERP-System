export type StockMovement = {
  id: number;
  product: number;
  warehouse: number;
  quantity: number;
  movement_type: "IN" | "OUT";
  date: string;
  note: string;
};