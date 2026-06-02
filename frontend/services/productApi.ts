import type { ProductCreateData } from "@/types/productCreate";
import type { Product } from "@/types/product";
import type { StockMovement } from "@/types/stockMovement";

const PRODUCT_BASE_URL = "http://localhost:8000/api/inventory/products/";

export async function createProduct(productData: ProductCreateData, accessToken: string) {
  const response = await fetch(PRODUCT_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {throw new Error("Could not create product");}

  return await response.json();
}

export async function updateProduct(productId: number, productData: ProductCreateData, accessToken: string) {
  const response = await fetch(`${PRODUCT_BASE_URL}${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Could not update product");
  }

  return await response.json();
}

export async function getProductById(productId: string, accessToken: string) {
  const response = await fetch(`${PRODUCT_BASE_URL}${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load product");
  }

  const data: Product = await response.json();
  return data;
}

export async function getProductStockMovements(productId: string, accessToken: string) {
  const response = await fetch(`${PRODUCT_BASE_URL}${productId}/stock-movements/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load stock movements");
  }

  const data: StockMovement[] = await response.json();
  return data;
}