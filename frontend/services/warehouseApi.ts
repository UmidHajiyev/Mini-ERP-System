import type { Warehouse } from "@/types/warehouse";

const WAREHOUSE_URL = "http://localhost:8000/api/inventory/warehouses/";

export async function getWarehouses(accessToken: string) {
  const response = await fetch(WAREHOUSE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load warehouses");
  }

  const data: Warehouse[] = await response.json();
  return data;
}