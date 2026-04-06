
--CATEGORY TABLE

/*
INSERT INTO CATEGORY(name,description)
VALUES
    ('Cleaning', 'Items for cleaning home'),
    ('Decorating','Home decorating'),
    ('Electronics','Devices and electronic accessoies'),
    ('Clothing', 'Wearable items such as uniforms and garments'),
    ('Footwear', 'Shoes, boots, and other foot-related products'),
    ('Cosmetics', 'Beauty and personal care products'),
    ('Medical Supplies', 'Basic healthcare and medical-use items'),
    ('Tools', 'Hand tools and equipment for repair and maintenance'),
    ('Hardware', 'Physical equipment and mechanical items'),
    ('Automotive Parts', 'Vehicle parts and maintenance components'),
    ('IT Equipment', 'Computers, monitors, printers, and related accessories'),
    ('Safety Equipment', 'Protective equipment for workplace safety'),
    ('Warehouse Supplies', 'Items used for storage and warehouse operations'),
    ('Maintenance Items', 'Products used for repair and facility maintenance'),
    ('Kitchen Supplies', 'Items used in kitchens and food preparation areas');
*/
--INSERT 0 15

/*
SELECT * FROM CATEGORY


 id |        name        |                      description
----+--------------------+--------------------------------------------------------
  4 | Cleaning           | Items for cleaning home
  5 | Decorating         | Home decorating
  6 | Electronics        | Devices and electronic accessoies
  7 | Clothing           | Wearable items such as uniforms and garments
  8 | Footwear           | Shoes, boots, and other foot-related products
  9 | Cosmetics          | Beauty and personal care products
 10 | Medical Supplies   | Basic healthcare and medical-use items
 11 | Tools              | Hand tools and equipment for repair and maintenance
 12 | Hardware           | Physical equipment and mechanical items
 13 | Automotive Parts   | Vehicle parts and maintenance components
 14 | IT Equipment       | Computers, monitors, printers, and related accessories
 15 | Safety Equipment   | Protective equipment for workplace safety
 16 | Warehouse Supplies | Items used for storage and warehouse operations
 17 | Maintenance Items  | Products used for repair and facility maintenance
 18 | Kitchen Supplies   | Items used in kitchens and food preparation areas
(15 rows)
*/




--PRODUCT TABLE

/*
INSERT INTO PRODUCT(name,sku,category,unit_price,reorder_level,description)
VALUES('Pas-pas','ASD-3H3-FHS','XXXXX',12.2,150,'cleaning item to clean floor');

ERROR:  insert or update on table "product" violates foreign key constraint "product_category_fkey"
DETAIL:  Key (category)=(XXXXX) is not present in table "category".





INSERT INTO PRODUCT(name, sku, category, unit_price, reorder_level, description)
VALUES
('Floor Mop', 'CLN-001', 'Cleaning', 12.20, 150, 'Cleaning item used to clean floors'),
('Wall Paint Set', 'DEC-001', 'Decorating', 35.50, 40, 'Basic home decorating paint set'),
('Wireless Mouse', 'ELE-001', 'Electronics', 18.99, 60, 'Wireless mouse for office and personal use'),
('T-Shirt', 'CLT-001', 'Clothing', 9.90, 100, 'Cotton t-shirt for everyday wear'),
('Running Shoes', 'FWT-001', 'Footwear', 49.99, 50, 'Comfortable shoes for running and walking'),
('Face Cream', 'COS-001', 'Cosmetics', 14.75, 70, 'Moisturizing face cream for daily skincare'),
('First Aid Kit', 'MED-001', 'Medical Supplies', 22.00, 30, 'Basic first aid kit for emergencies'),
('Hammer', 'TLS-001', 'Tools', 16.40, 45, 'Steel hammer for repair and construction work'),
('Door Lock', 'HRD-001', 'Hardware', 27.30, 35, 'Metal door lock for home and office use'),
('Brake Pad Set', 'AUT-001', 'Automotive Parts', 65.00, 20, 'Replacement brake pads for vehicles'),
('Laptop', 'ITE-001', 'IT Equipment', 899.99, 10, 'Portable computer for business and study'),
('Safety Helmet', 'SAF-001', 'Safety Equipment', 19.50, 55, 'Protective helmet for workplace safety'),
('Storage Box', 'WHS-001', 'Warehouse Supplies', 11.25, 80, 'Plastic box used for warehouse storage'),
('Drill Machine', 'MNT-001', 'Maintenance Items', 74.90, 25, 'Electric drill for maintenance and repair work'),
('Kitchen Knife Set', 'KIT-001', 'Kitchen Supplies', 29.99, 40, 'Set of knives for kitchen food preparation');

INSERT 0 15



SELECT * FROM PRODUCT


 id |       name        |   sku   |      category      | unit_price | reorder_level |                  description      
----+-------------------+---------+--------------------+------------+---------------+------------------------------------------------
  4 | Floor Mop         | CLN-001 | Cleaning           |      12.20 |        150.00 | Cleaning item used to clean floors
  5 | Wall Paint Set    | DEC-001 | Decorating         |      35.50 |         40.00 | Basic home decorating paint set
  6 | Wireless Mouse    | ELE-001 | Electronics        |      18.99 |         60.00 | Wireless mouse for office and personal use
  7 | T-Shirt           | CLT-001 | Clothing           |       9.90 |        100.00 | Cotton t-shirt for everyday wear
  8 | Running Shoes     | FWT-001 | Footwear           |      49.99 |         50.00 | Comfortable shoes for running and walking
  9 | Face Cream        | COS-001 | Cosmetics          |      14.75 |         70.00 | Moisturizing face cream for daily skincare
 10 | First Aid Kit     | MED-001 | Medical Supplies   |      22.00 |         30.00 | Basic first aid kit for emergencies
 11 | Hammer            | TLS-001 | Tools              |      16.40 |         45.00 | Steel hammer for repair and construction work
 12 | Door Lock         | HRD-001 | Hardware           |      27.30 |         35.00 | Metal door lock for home and office use
 13 | Brake Pad Set     | AUT-001 | Automotive Parts   |      65.00 |         20.00 | Replacement brake pads for vehicles
 14 | Laptop            | ITE-001 | IT Equipment       |     899.99 |         10.00 | Portable computer for business and study
 15 | Safety Helmet     | SAF-001 | Safety Equipment   |      19.50 |         55.00 | Protective helmet for workplace safety
 16 | Storage Box       | WHS-001 | Warehouse Supplies |      11.25 |         80.00 | Plastic box used for warehouse storage
 17 | Drill Machine     | MNT-001 | Maintenance Items  |      74.90 |         25.00 | Electric drill for maintenance and repair work
 18 | Kitchen Knife Set | KIT-001 | Kitchen Supplies   |      29.99 |         40.00 | Set of knives for kitchen food preparation
(15 rows)

*/



--USERS TABLE
/*

INSERT INTO USERS(name)
VALUES
    ('Namiq'),
    ('Aysel'),
    ('Fariz'),
    ('Elnur'),
    ('Ayaz'),
    ('Elman'),
    ('Arif'),
    ('Mary'),
    ('Jimmy'),
    ('Nurlan'),
    ('Rasul'),
    ('Ayan'),
    ('Aytac'),
    ('Vasif'),
    ('Zakir');


SELECT * FROM USERS

 id |  name
----+--------
  1 | Namiq
  2 | Aysel
  3 | Fariz
  4 | Elnur
  5 | Ayaz
  6 | Elman
  7 | Arif
  8 | Mary
  9 | Jimmy
 10 | Nurlan
 11 | Rasul
 12 | Ayan
 13 | Aytac
 14 | Vasif
 15 | Zakir
(15 rows)

*/




--WAREHOUSE TABLE

/*
INSERT INTO WAREHOUSE(name, location, manager_id)
VALUES
    ('Absheron Merkezi Anbari', 'Baku', 16);

ERROR:  insert or update on table "warehouse" violates foreign key constraint "warehouse_manager_id_fkey"
DETAIL:  Key (manager_id)=(16) is not present in table "users".




INSERT INTO WAREHOUSE(name, location, manager_id)
VALUES
('Absheron Merkezi Anbari', 'Baku', 1),
('Khazar Sahil Anbari', 'Sumqayit', 2),
('Ganja Qerb Anbari', 'Ganja', 3),
('Garabagh Techizat Anbari', 'Barda', 4),
('Sheki Bolge Anbari', 'Sheki', 5),
('Lankaran Cenub Anbari', 'Lankaran', 6),
('Quba Shimal Anbari', 'Quba', 7),
('Mingachevir Senaye Anbari', 'Mingachevir', 8),
('Nakhchivan Logistika Anbari', 'Nakhchivan', 9),
('Shirvan Dagitim Anbari', 'Shirvan', 10),
('Zaqatala Ehtiyat Anbari', 'Zaqatala', 11),
('Agjabadi Kend Teserrufati Anbari', 'Agjabadi', 12),
('Masalli Ticaret Anbari', 'Masalli', 13),
('Gabala Regional Anbari', 'Gabala', 14),
('Sabirabad Merkezi Techizat Anbari', 'Sabirabad', 15);

INSERT 0 15


SELECT * FROM WAREHOUSE

 id |               name                |  location   | manager_id
----+-----------------------------------+-------------+------------
  2 | Absheron Merkezi Anbari           | Baku        |          1
  3 | Khazar Sahil Anbari               | Sumqayit    |          2
  4 | Ganja Qerb Anbari                 | Ganja       |          3
  5 | Garabagh Techizat Anbari          | Barda       |          4
  6 | Sheki Bolge Anbari                | Sheki       |          5
  7 | Lankaran Cenub Anbari             | Lankaran    |          6
  8 | Quba Shimal Anbari                | Quba        |          7
  9 | Mingachevir Senaye Anbari         | Mingachevir |          8
 10 | Nakhchivan Logistika Anbari       | Nakhchivan  |          9
 11 | Shirvan Dagitim Anbari            | Shirvan     |         10
 12 | Zaqatala Ehtiyat Anbari           | Zaqatala    |         11
 13 | Agjabadi Kend Teserrufati Anbari  | Agjabadi    |         12
 14 | Masalli Ticaret Anbari            | Masalli     |         13
 15 | Gabala Regional Anbari            | Gabala      |         14
 16 | Sabirabad Merkezi Techizat Anbari | Sabirabad   |         15
(15 rows)

*/




--STOCK_MOVEMENT TABLE

/*
INSERT INTO stock_movement(product_id, warehouse_id, quantity, movement_type, movement_date, note)
VALUES
(20, 2, 120.00, 'in',  '2026-04-01 09:00:00', 'Initial stock added for floor mop')

ERROR:  insert or update on table "stock_movement" violates foreign key constraint "stock_movement_product_id_fkey"
DETAIL:  Key (product_id)=(20) is not present in table "product".



INSERT INTO stock_movement(product_id, warehouse_id, quantity, movement_type, movement_date, note)
VALUES
(4, 111, 120.00, 'in',  '2026-04-01 09:00:00', 'Initial stock added for floor mop')

ERROR:  insert or update on table "stock_movement" violates foreign key constraint "stock_movement_warehouse_id_fkey"
DETAIL:  Key (warehouse_id)=(111) is not present in table "warehouse".



INSERT INTO stock_movement(product_id, warehouse_id, quantity, movement_type, movement_date, note)
VALUES
(4, 2, 120.00, 'in',  '2026-04-01 09:00:00', 'Initial stock added for floor mop'),
(5, 3, 40.00,  'in',  '2026-04-01 10:30:00', 'Wall paint sets received from supplier'),
(6, 4, 25.00,  'out', '2026-04-02 11:15:00', 'Wireless mouse sent to branch office'),
(7, 5, 80.00,  'in',  '2026-04-02 14:00:00', 'T-shirts added to warehouse stock'),
(8, 6, 15.00,  'out', '2026-04-03 09:45:00', 'Running shoes sold to customer'),
(9, 7, 50.00,  'in',  '2026-04-03 13:20:00', 'Face cream shipment received'),
(10, 8, 10.00, 'out', '2026-04-04 08:10:00', 'First aid kits transferred to clinic'),
(11, 9, 35.00, 'in',  '2026-04-04 15:40:00', 'Hammers added for maintenance team'),
(12, 10, 12.00, 'out', '2026-04-05 10:00:00', 'Door locks delivered to construction site'),
(13, 11, 20.00, 'in', '2026-04-05 16:25:00', 'Brake pad sets received from supplier'),
(14, 12, 5.00, 'out', '2026-04-06 09:30:00', 'Laptop assigned to new employee'),
(15, 13, 45.00, 'in', '2026-04-06 12:50:00', 'Safety helmets added to stock'),
(16, 14, 30.00, 'in', '2026-04-07 11:00:00', 'Storage boxes received for warehouse use'),
(17, 15, 8.00, 'out', '2026-04-07 14:35:00', 'Drill machine issued to repair team'),
(18, 16, 18.00, 'in', '2026-04-08 10:20:00', 'Kitchen knife sets added to inventory');

INSERT 0 15



SELECT * FROM STOCK_MOVEMENT

 id | product_id | warehouse_id | quantity | movement_type |    movement_date    |                   note               
----+------------+--------------+----------+---------------+---------------------+-------------------------------------------
  3 |          4 |            2 |   120.00 | in            | 2026-04-01 09:00:00 | Initial stock added for floor mop
  4 |          5 |            3 |    40.00 | in            | 2026-04-01 10:30:00 | Wall paint sets received from supplier
  5 |          6 |            4 |    25.00 | out           | 2026-04-02 11:15:00 | Wireless mouse sent to branch office
  6 |          7 |            5 |    80.00 | in            | 2026-04-02 14:00:00 | T-shirts added to warehouse stock
  7 |          8 |            6 |    15.00 | out           | 2026-04-03 09:45:00 | Running shoes sold to customer
  8 |          9 |            7 |    50.00 | in            | 2026-04-03 13:20:00 | Face cream shipment received
  9 |         10 |            8 |    10.00 | out           | 2026-04-04 08:10:00 | First aid kits transferred to clinic
 10 |         11 |            9 |    35.00 | in            | 2026-04-04 15:40:00 | Hammers added for maintenance team
 11 |         12 |           10 |    12.00 | out           | 2026-04-05 10:00:00 | Door locks delivered to construction site
 12 |         13 |           11 |    20.00 | in            | 2026-04-05 16:25:00 | Brake pad sets received from supplier
 13 |         14 |           12 |     5.00 | out           | 2026-04-06 09:30:00 | Laptop assigned to new employee
 14 |         15 |           13 |    45.00 | in            | 2026-04-06 12:50:00 | Safety helmets added to stock
 15 |         16 |           14 |    30.00 | in            | 2026-04-07 11:00:00 | Storage boxes received for warehouse use
 16 |         17 |           15 |     8.00 | out           | 2026-04-07 14:35:00 | Drill machine issued to repair team
 17 |         18 |           16 |    18.00 | in            | 2026-04-08 10:20:00 | Kitchen knife sets added to inventory
(15 rows)

*/