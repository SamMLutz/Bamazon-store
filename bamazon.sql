DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE Bamazon_inventory (
    position INTEGER NOT NULL,
    PRIMARY KEY (position),
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INT NULL,
    stock_quantity INT NULL
);