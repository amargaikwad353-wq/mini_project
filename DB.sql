CREATE DATABASE bloodbank;
USE bloodbank;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    password VARCHAR(100)
);

CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    weight INT,
    infection VARCHAR(20),
    blood VARCHAR(10),
    city VARCHAR(100),
    contact VARCHAR(15),
    created_at DATE
);

CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient VARCHAR(100),
    blood VARCHAR(10),
    city VARCHAR(100),
    contact VARCHAR(15)
);
