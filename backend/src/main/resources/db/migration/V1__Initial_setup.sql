-- Version: 1.0.0
-- Description: Initial setup of the database
-- Date: 2024-20-05

CREATE TABLE tb_reservations
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,
    phone_number     VARCHAR(255) NOT NULL,
    email            VARCHAR(255) NOT NULL,
    reservation_date TIMESTAMP    NOT NULL,
    number_of_people INT          NOT NULL,
    description      VARCHAR(255),
    checked_in       BOOLEAN      NOT NULL
);



CREATE TABLE tb_menu_categories
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);



CREATE TABLE tb_menus
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)   NOT NULL,
    description VARCHAR(255),
    price       DECIMAL(10, 2) NOT NULL,
    state       BOOLEAN        NOT NULL,
    image_url  VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES tb_menu_categories (id)
);



CREATE TABLE tb_users
(
    id             INT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(255),
    lastname       VARCHAR(255),
    identification VARCHAR(255),
    cellphone      BIGINT,
    username       VARCHAR(255) UNIQUE,
    password       VARCHAR(255),
    role           ENUM('ADMIN', 'SUB_ADMIN', 'WAITRESS', 'BARTENDER', 'COOK')
);



CREATE TABLE tb_events
(
    id          INT AUTO_INCREMENT,
    title       VARCHAR(255),
    description VARCHAR(1000),
    discount    INT,
    image_url   VARCHAR(255),
    PRIMARY KEY (id)
);
