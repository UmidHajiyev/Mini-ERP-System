/*
INSERT INTO CATEGORY(name,description)
VALUES(
    'Cleaning', 'Items for cleaning home'
);

INSERT 0 1
*/

/*
INSERT INTO PRODUCT(name,sku,category,unit_price,reorder_level,description)
VALUES('Pas-pas','ASD-3H3-FHS','Clean',12.2,150,'cleaning item to clean floor');

ERROR:  insert or update on table "product" violates foreign key constraint "product_category_fkey"
DETAIL:  Key (category)=(Clean) is not present in table "category".
*/

/*
INSERT INTO PRODUCT(name,sku,category,unit_price,reorder_level,description)
VALUES('Pas-pas','ASD-3H3-FHS','Cleaning',12.2,150,'cleaning item to clean floor');

INSERT 0 1
*/

/*
SELECT * FROM PRODUCT

 id |  name   |     sku     | category | unit_price | reorder_level |         description
----+---------+-------------+----------+------------+---------------+------------------------------
  2 | Pas-pas | ASD-3H3-FHS | Cleaning |      12.20 |        150.00 | cleaning item to clean floor
(1 row)
*/

