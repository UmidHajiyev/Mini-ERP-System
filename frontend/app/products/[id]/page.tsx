"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import { getProductById, getProductStockMovements } from "@/services/productApi";

import type { Product } from "@/types/product";
import type { StockMovement } from "@/types/stockMovement";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();

    const productId = String(params.id);

    const [product, setProduct] = useState<Product | null>(null);
    const [movements, setMovements] = useState<StockMovement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

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

    useEffect(() => {
        async function loadProductDetails() {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                redirectToLogin();
                return;
            }

            try {
                const productData = await getProductById(productId, accessToken);
                const movementData = await getProductStockMovements(productId, accessToken);

                setProduct(productData);
                setMovements(movementData);
            } catch {
                setError("Could not load product details.");
            } finally {
                setIsLoading(false);
            }
        }

        loadProductDetails();
    }, [productId]);

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
                                <h1>{product.name}</h1>
                                <p>SKU: {product.sku}</p>
                            </div>

                            <button className="secondary-button" onClick={() => router.push("/")}>Back to Products</button>
                        </div>

                        <div className="detail-grid">
                            <div className="detail-card">
                                <h2>Product Information</h2>

                                <p><strong>Category:</strong> {product.category_name}</p>
                                <p><strong>Unit Price:</strong> ${Number(product.unit_price).toFixed(2)}</p>
                                <p><strong>Current Stock:</strong> {product.stock}</p>
                                <p><strong>Reorder Level:</strong> {product.reorder_level}</p>
                                <p><strong>Description:</strong> {product.description}</p>
                            </div>

                            <div className="detail-card">
                                <h2>Stock Movement History</h2>

                                {movements.length === 0 && <p>No stock movements found.</p>}

                                {movements.length > 0 && (
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
                                                    <td>{movement.movement_type}</td>
                                                    <td>{movement.quantity}</td>
                                                    <td>{movement.warehouse}</td>
                                                    <td className="movement-note-cell" title={movement.note}>{getShortText(movement.note, 35)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}