
CREATE TABLE STOCK_MOVEMENT(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id BIGINT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES PRODUCT(id),
    warehouse_id BIGINT NOT NULL,
    FOREIGN KEY (warehouse_id) REFERENCES WAREHOUSE(id),
    quantity DECIMAL(10,2) NOT NULL,
    movement_type VARCHAR(3) NOT NULL CHECK(movement_type in ('in', 'out')),
    movement_date TIMESTAMP NOT NULL, 
    note TEXT NOT NULL
)
