import type { StockMovement } from "@/types/stockMovement";
import type { StockMovementCreateData } from "@/types/stockMovementCreate";

const STOCK_MOVEMENT_URL = "http://localhost:8000/api/inventory/stock-movements/";

export async function createStockMovement(movementData: StockMovementCreateData, accessToken: string) {
  const response = await fetch(STOCK_MOVEMENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(movementData),
  });

  if (!response.ok) {
    throw new Error("Could not create stock movement");
  }

  const data: StockMovement = await response.json();
  return data;
}