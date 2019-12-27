--- password password123456 
-- CREATE USER {username} WITH PASSWORD {password}
-- GRANT {permissions} ON {tables, database} TO {user}

CREATE TABLE author (
    author_id varchar(20) PRIMARY KEY,
    name varchar(20),
    last_name varchar(20),
    password varchar(30),
    age integer CHECK (age > 1), -- constraint, user age should be greater than 1
    created date DEFAULT current_date
);

CREATE TABLE book (
    book_id varchar(20) PRIMARY KEY,
    title varchar(20),
    description varchar(20),
    author_id varchar(20) REFERENCES author ON DELETE CASCADE
);