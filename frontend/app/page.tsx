"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductTable from "@/components/ProductTable";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProductSearchPanel from "@/components/ProductSearchPanel";
import PaginationControls from "@/components/PaginationControls";
import ProductFormModal from "@/components/ProductFormModal";

import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import type { PaginatedResponse } from "@/types/pagination";
import type { ProductCreateData } from "@/types/productCreate";
import { createProduct, updateProduct } from "@/services/productApi";

export default function Home() {
  const router = useRouter();

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [productError, setProductError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [skuFilter, setSkuFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState("");

  const [totalCount, setTotalCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalError, setProductModalError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function redirectToLogin() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  }

  async function fetchProducts(accessToken: string, options?: { queryParams?: URLSearchParams; url?: string }) {
    setIsLoading(true);
    setProductError("");

    const baseUrl = "http://localhost:8000/api/inventory/products/";
    let requestUrl = baseUrl;

    if (options?.url) {
      requestUrl = options.url;
    } else if (options?.queryParams) {
      requestUrl = `${baseUrl}?${options.queryParams.toString()}`;
    }

    try {
      const response = await fetch(requestUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: PaginatedResponse<Product> = await response.json();

      setProducts(data.results);
      setTotalCount(data.count);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
    } catch {
      setProductError("Could not load products");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCategories(accessToken: string) {
    setCategoryError("");

    try {
      const response = await fetch("http://localhost:8000/api/inventory/categories/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch {
      setCategoryError("Could not load categories");
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
      return;
    }

    setIsAuthChecked(true);

    fetchProducts(accessToken);
    fetchCategories(accessToken);
  }, [router]);

  function searchProducts() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
      return;
    }

    const queryParams = new URLSearchParams();

    if (nameFilter) queryParams.append("name", nameFilter);
    if (skuFilter) queryParams.append("sku", skuFilter);
    if (minPriceFilter) queryParams.append("min_price", minPriceFilter);
    if (maxPriceFilter) queryParams.append("max_price", maxPriceFilter);
    if (selectedStockStatus) queryParams.append("stock_status", selectedStockStatus);
    if (selectedCategoryId) queryParams.append("category_id", selectedCategoryId);

    setCurrentPage(1);
    fetchProducts(accessToken, { queryParams });
  }

  function clearFilters() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
      return;
    }

    setNameFilter("");
    setSkuFilter("");
    setMinPriceFilter("");
    setMaxPriceFilter("");
    setSelectedCategoryId("");
    setSelectedStockStatus("");
    setCurrentPage(1);

    fetchProducts(accessToken);
  }

  function goToNextPage() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
      return;
    }

    if (!nextPageUrl) return;

    setCurrentPage(getPageNumberFromUrl(nextPageUrl));
    fetchProducts(accessToken, { url: nextPageUrl });
  }

  function goToPreviousPage() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
      return;
    }

    if (!previousPageUrl) return;

    setCurrentPage(getPageNumberFromUrl(previousPageUrl));
    fetchProducts(accessToken, { url: previousPageUrl });
  }

  function getPageNumberFromUrl(url: string | null) {
    if (!url) return 1;

    const parsedUrl = new URL(url);
    const page = parsedUrl.searchParams.get("page");

    return page ? Number(page) : 1;
  }

  function handleLogout() {
    redirectToLogin();
  }

  async function handleCreateProduct(productData: ProductCreateData) {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      redirectToLogin();
      return;
    }

    try {
      await createProduct(productData, accessToken);

      setIsProductModalOpen(false);
      fetchProducts(accessToken);
    } catch {
      setProductModalError("Could not create product");
    }
  }

  async function handleUpdateProduct(productId: number, productData: ProductCreateData) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      redirectToLogin();
      return;
    }

    setProductModalError("");

    try {
      await updateProduct(productId, productData, accessToken);

      setIsProductModalOpen(false);
      setSelectedProduct(null);
      fetchProducts(accessToken);
    } catch {
      setProductModalError("Could not update product!");
    }
  }

  if (!isAuthChecked) {
    return <p>Loading...</p>;
  }

  function openEditModal(product: Product) {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <Topbar onLogout={handleLogout} />

        <div className="page-title-row">
          <div className="page-title">
            <h1>Products</h1>
            <p>Manage your inventory products here.</p>
          </div>

          <button
            className="primary-button"
            onClick={() => {
              setSelectedProduct(null);
              setIsProductModalOpen(true);
            }}
          >
            Add Product
          </button>
        </div>

        <ProductSearchPanel
          categories={categories}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          skuFilter={skuFilter}
          setSkuFilter={setSkuFilter}
          minPriceFilter={minPriceFilter}
          setMinPriceFilter={setMinPriceFilter}
          maxPriceFilter={maxPriceFilter}
          setMaxPriceFilter={setMaxPriceFilter}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedStockStatus={selectedStockStatus}
          setSelectedStockStatus={setSelectedStockStatus}
          onSearch={searchProducts}
          onClear={clearFilters}
        />

        {isLoading && <p>Loading products...</p>}

        {productError && <p className="error-message">{productError}</p>}

        {categoryError && <p className="error-message">{categoryError}</p>}

        {!isLoading && !productError && products.length === 0 && (
          <p className="empty-message">No products found.</p>
        )}

        {!isLoading && !productError && products.length > 0 && (
          <>
            <ProductTable products={products} onEditProduct={openEditModal} />

            <PaginationControls
              totalCount={totalCount}
              currentPage={currentPage}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
              onNext={goToNextPage}
              onPrevious={goToPreviousPage}
            />
          </>
        )}

        {isProductModalOpen && (
          <ProductFormModal categories={categories} productToEdit={selectedProduct} error={productModalError}
            onClose={() => { setIsProductModalOpen(false); setSelectedProduct(null); setProductModalError("");}}
            onCreate={handleCreateProduct}
            onUpdate={handleUpdateProduct}
          />
        )}
      </main>
    </div>
  );
}