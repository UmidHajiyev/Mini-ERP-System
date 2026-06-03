"use client";

import { useState } from "react";
import type { StockMovementModalProps } from "@/types/stockMovementModal";

export default function StockMovementModal({ productId, warehouses, error, onClose, onCreate }: StockMovementModalProps) {
  const [warehouse, setWarehouse] = useState("");
  const [quantity, setQuantity] = useState("");
  const [movementType, setMovementType] = useState<"IN" | "OUT">("IN");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");

  function validateForm() {
    if (!warehouse) return "Warehouse is required.";
    if (!quantity) return "Quantity is required.";
    if (Number(quantity) <= 0) return "Quantity must be greater than 0.";
    if (!movementType) return "Movement type is required.";
    if (!note.trim()) return "Note is required.";

    return "";
  }

  function handleCreate() {
    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");

    onCreate({
      product: productId,
      warehouse,
      quantity,
      movement_type: movementType,
      note,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Record Stock Movement</h2>
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-form">
          <div className="form-group">
            <label>Warehouse</label>
            <select value={warehouse} onChange={(event) => setWarehouse(event.target.value)}>
              <option value="">Select warehouse</option>
              {warehouses.map((item) => (
                <option key={item.id} value={String(item.id)}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Enter quantity" />
          </div>

          <div className="form-group">
            <label>Movement Type</label>
            <select value={movementType} onChange={(event) => setMovementType(event.target.value as "IN" | "OUT")}>
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </div>

          <div className="form-group">
            <label>Note</label>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Enter movement note"></textarea>
          </div>
        </div>

        {formError && <p className="error-message">{formError}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>Cancel</button>
          <button className="primary-button" onClick={handleCreate}>Save Movement</button>
        </div>
      </div>
    </div>
  );
}