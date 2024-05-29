CREATE DATABASE jwtlogin;

-- https://www.timescale.com/learn/postgresql-extensions-uuid-ossp
CREATE TABLE
    users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        username VARCHAR(50) UNIQUE NOT NULL,
        usermail VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    );

INSERT INTO
    users (username, usermail, password)
VALUES
    ('admin', 'admin@a.com', 'admin'),
    ('user', 'user@a.com', 'user');