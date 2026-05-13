# ERP System

This repository contains the development of an ERP System project.

The current main focus is the **Inventory module**.

## Technologies

- PostgreSQL
- Docker
- SQL
- Django

## Progress

## Progress

### Stage 1 — Database setup
- Added `database/` folder
- Added `docker-compose.yml` for PostgreSQL
- Added SQL scripts for creating core inventory tables
- Added SQL script for sample/test data insertion

### Stage 2 — Django models
- Created `inventory` app
- Created core inventory models:
  - `Category`
  - `Product`
  - `Warehouse`
  - `StockMovement`
- Added relationships between models using `ForeignKey`
- Added product stock tracking with `stock_level`
- Added `reorder_level` for low-stock detection
- Added stock movement logic for `IN` and `OUT` operations
- Made stock movements immutable after creation
- Registered models in Django admin

### Stage 3 — Inventory APIs
- Installed and configured Django REST Framework
- Created serializers for:
  - `Product`
  - `StockMovement`
- Created product API endpoints:
  - `GET /api/inventory/products/` — list all products
  - `POST /api/inventory/products/` — create product
  - `GET /api/inventory/products/{id}/` — get product by id
  - `PUT /api/inventory/products/{id}/` — update product
- Created stock movement API endpoints:
  - `POST /api/inventory/stock-movements/` — create stock movement
  - `GET /api/inventory/products/{id}/stock-movements/` — list movements for one product
- Created low-stock API endpoint:
  - `GET /api/inventory/low-stock/` — list products where stock is below or equal to reorder level