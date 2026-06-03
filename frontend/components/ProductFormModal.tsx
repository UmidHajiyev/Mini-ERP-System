"use client";

import { useState } from "react";
import type { ProductFormModalProps } from "@/types/productFormModal";

export default function ProductFormModal({ categories, productToEdit, error, onClose, onCreate, onUpdate, }: ProductFormModalProps) 
{
  const isEditMode = productToEdit !== null;
  const [name, setName] = useState(productToEdit?.name || "");
  const [sku, setSku] = useState(productToEdit?.sku || "");
  const [description, setDescription] = useState(productToEdit?.description || "");
  const [unitPrice, setUnitPrice] = useState(productToEdit?.unit_price || "");
  const [reorderLevel, setReorderLevel] = useState(productToEdit ? String(productToEdit.reorder_level) : "");
  const [stock, setStock] = useState(productToEdit ? String(productToEdit.stock) : "");
  const [category, setCategory] = useState(productToEdit ? String(productToEdit.category) : "");

  const [formError, setFormError] = useState("");

  function validateForm() {
    if (!name.trim()) return "Product name is required.";
    if (!sku.trim()) return "SKU is required.";
    if (!category) return "Category is required.";
    if (!unitPrice) return "Unit price is required.";
    if (Number(unitPrice) <= 0) return "Unit price must be greater than 0.";
    if (!reorderLevel) return "Reorder level is required.";
    if (Number(reorderLevel) < 0) return "Reorder level cannot be negative.";
    if (!stock) return "Initial stock is required.";
    if (Number(stock) < 0) return "Initial stock cannot be negative.";
    if (!description.trim()) return "Description is required.";

    return "";
  }

  function handleSave() 
  {
    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");

    const productData = {name,sku,description,unit_price: unitPrice,reorder_level: reorderLevel,stock,category,};

    if (productToEdit) {
      onUpdate(productToEdit.id, productData);
      return;
    }

    onCreate(productData);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{isEditMode ? "Edit Product" : "Add Product"}</h2>
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-form">
          <div className="form-group">
            <label>Product Name</label>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter product name" />
          </div>

          <div className="form-group">
            <label>SKU</label>
            <input value={sku} onChange={(event) => setSku(event.target.value)} placeholder="Enter SKU" />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">Select category</option>
              {categories.map((category) => (<option key={category.id} value={String(category.id)}>{category.name}</option>))}
            </select>
          </div>

          <div className="form-group">
            <label>Unit Price</label>
            <input type="number" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Enter unit price" />
          </div>

          <div className="form-group">
            <label>Reorder Level</label>
            <input type="number" value={reorderLevel} onChange={(event) => setReorderLevel(event.target.value)} placeholder="Enter reorder level" />
          </div>

          <div className="form-group">
            <label>Initial Stock</label>
            <input type="number" value={stock} onChange={(event) => setStock(event.target.value)} placeholder="Enter initial stock" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter product description"></textarea>
          </div>
        </div>
        {formError && <p className="error-message">{formError}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>Cancel</button>
          <button className="primary-button" onClick={handleSave}>
            {isEditMode ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}