"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PaginationControls from "@/components/PaginationControls";

import { getProductById, getProductStockMovements } from "@/services/productApi";

import type { Product } from "@/types/product";
import type { StockMovement } from "@/types/stockMovement";

import StockMovementModal from "@/components/StockMovementModal";
import { createStockMovement } from "@/services/stockMovementApi";
import { getWarehouses } from "@/services/warehouseApi";

import type { Warehouse } from "@/types/warehouse";
import type { StockMovementCreateData } from "@/types/stockMovementCreate";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();

    const productId = String(params.id);

    const [product, setProduct] = useState<Product | null>(null);
    const [movements, setMovements] = useState<StockMovement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [movementTotalCount, setMovementTotalCount] = useState(0);
    const [nextMovementPageUrl, setNextMovementPageUrl] = useState<string | null>(null);
    const [previousMovementPageUrl, setPreviousMovementPageUrl] = useState<string | null>(null);
    const [movementCurrentPage, setMovementCurrentPage] = useState(1);

    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
    const [movementModalError, setMovementModalError] = useState("");

    function redirectToLogin() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
    }

    function getShortText(text: string, maxLength: number) {
        if (!text) return "-";
        if (text.length <= maxLength) return text;

        return text.slice(0, maxLength) + "...";
    }

    function getPageNumberFromUrl(url: string | null) {
        if (!url) return 1;

        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");

        return page ? Number(page) : 1;
    }

    async function fetchMovementPage(url: string) {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            redirectToLogin();
            return;
        }

        try {
            const movementData = await getProductStockMovements(accessToken, undefined, url);

            setMovements(movementData.results);
            setMovementTotalCount(movementData.count);
            setNextMovementPageUrl(movementData.next);
            setPreviousMovementPageUrl(movementData.previous);
            const warehouseData = await getWarehouses(accessToken);        } catch {
            setError("Could not load stock movements.");
        }
    }

    function goToNextMovementPage() {
        if (!nextMovementPageUrl) return;

        setMovementCurrentPage(getPageNumberFromUrl(nextMovementPageUrl));
        fetchMovementPage(nextMovementPageUrl);
    }

    function goToPreviousMovementPage() {
        if (!previousMovementPageUrl) return;

        setMovementCurrentPage(getPageNumberFromUrl(previousMovementPageUrl));
        fetchMovementPage(previousMovementPageUrl);
    }

    useEffect(() => {
        async function loadProductDetails() {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                redirectToLogin();
                return;
            }

            try {
                const productData = await getProductById(productId, accessToken);
                const movementData = await getProductStockMovements(accessToken, productId);
                const warehouseData = await getWarehouses(accessToken);

                setProduct(productData);
                setMovements(movementData.results);
                setMovementTotalCount(movementData.count);
                setNextMovementPageUrl(movementData.next);
                setPreviousMovementPageUrl(movementData.previous);
                setWarehouses(warehouseData);
            } catch {
                setError("Could not load product details.");
            } finally {
                setIsLoading(false);
            }
        }

        loadProductDetails();
    }, [productId]);

    async function handleCreateMovement(movementData: StockMovementCreateData) {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            redirectToLogin();
            return;
        }

        setMovementModalError("");

        try {
            await createStockMovement(movementData, accessToken);

            const productData = await getProductById(productId, accessToken);
            const movementResponse = await getProductStockMovements(accessToken, productId);

            setProduct(productData);
            setMovements(movementResponse.results);
            setMovementTotalCount(movementResponse.count);
            setNextMovementPageUrl(movementResponse.next);
            setPreviousMovementPageUrl(movementResponse.previous);
            setMovementCurrentPage(1);

            setIsMovementModalOpen(false);
        } catch {
            setMovementModalError("Could not record stock movement.");
        }
    }

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar onLogout={redirectToLogin} />

                {isLoading && <p>Loading product details...</p>}
                {error && <p className="error-message">{error}</p>}

                {!isLoading && product && (
                    <div>
                        <div className="page-title-row">
                            <div className="page-title">
                                <h1>Product Detail</h1>
                                <p>View product information and stock movement history.</p>
                            </div>

                            <div className="detail-actions">
                                <button className="primary-button" onClick={() => setIsMovementModalOpen(true)}>Record Movement</button>
                                <button className="secondary-button" onClick={() => router.push("/")}>Back to Products</button>
                            </div>
                        </div>

                        <div className="product-detail-wrapper">
                            <div className="detail-card product-detail-card">
                                <h2>{product.name}</h2>
                                <p className="product-detail-sku">SKU: {product.sku}</p>

                                <div className="product-detail-info">
                                    <p><strong>Category:</strong> {product.category_name}</p>
                                    <p><strong>Unit Price:</strong> ${Number(product.unit_price).toFixed(2)}</p>
                                    <p><strong>Current Stock:</strong> {product.stock}</p>
                                    <p><strong>Reorder Level:</strong> {product.reorder_level}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="detail-card movement-card">
                            <div className="movement-header">
                                <h2>Stock Movement History</h2>
                                <p>Total movements: {movementTotalCount}</p>
                            </div>

                            {movements.length === 0 && <p>No stock movements found.</p>}

                            {movements.length > 0 && (
                                <>
                                    <div className="table-responsive">
                                        <table className="product-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Type</th>
                                                    <th>Quantity</th>
                                                    <th>Warehouse</th>
                                                    <th>Note</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {movements.map((movement) => (
                                                    <tr key={movement.id}>
                                                        <td>{new Date(movement.date).toLocaleString()}</td>
                                                        <td>
                                                            <span className={`movement-badge ${movement.movement_type === "IN" ? "movement-in" : "movement-out"}`}>
                                                                {movement.movement_type}
                                                            </span>
                                                        </td>
                                                        <td>{movement.quantity}</td>
                                                        <td>{movement.warehouse}</td>
                                                        <td className="movement-note-cell" title={movement.note}>{getShortText(movement.note, 35)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <PaginationControls
                                        totalCount={movementTotalCount}
                                        currentPage={movementCurrentPage}
                                        nextPageUrl={nextMovementPageUrl}
                                        previousPageUrl={previousMovementPageUrl}
                                        onNext={goToNextMovementPage}
                                        onPrevious={goToPreviousMovementPage}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
                {isMovementModalOpen && product && (
                    <StockMovementModal
                        productId={product.id}
                        warehouses={warehouses}
                        error={movementModalError}
                        onClose={() => {
                        setIsMovementModalOpen(false);
                        setMovementModalError("");
                        }}
                        onCreate={handleCreateMovement}
                    />
                )}
            </main>
        </div>
    );
}