CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL, 
    department_name VARCHAR(50) NOT NULL, 
    price FLOAT NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Bag", "Accessories", 30.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Pins", "Accessories", 10.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Barrettes", "Accessories", 5.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Sneakers", "Shoes", 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Towels", "Bathroom", 10.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Hand-Soap", "Bathroom", 2.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Lamp", "Bedroom", 15.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Pillows", "Bedroom", 10.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Pan", "Kitchen", 30.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Ice Cream Scooper", "Kitchen", 8.00, 15);