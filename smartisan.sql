create database smartisan;
create table smartisan.user(
	user_id int NOT NULL auto_increment,
    user_name varchar(20),
    password varchar(20),
    PRIMARY KEY  (`user_id`)
);
create table smartisan.cart(
	user_id int NOT NULL,
    category_id int NOT NULL,
    count int NOT NULL,
    PRIMARY KEY  (`user_id`)
);