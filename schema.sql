-- Create database if it does not exist
CREATE DATABASE budgetbae_db;
USE budgetbae_db;

-- Users table with user_type
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Trips table
CREATE TABLE trip (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    purpose VARCHAR(200),
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    approver_id INT,
    user_id INT NOT NULL,
    FOREIGN KEY (approver_id) REFERENCES user(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Expenses table
CREATE TABLE expense (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL, -- Use DECIMAL for monetary values
    description VARCHAR(200),
    category VARCHAR(50),
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    receipt_url VARCHAR(200),
    user_id INT NOT NULL,
    trip_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (trip_id) REFERENCES trip(id) ON DELETE SET NULL
);

-- Policy violations table
CREATE TABLE policy_violation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    count INT DEFAULT 0
);

-- Indexes for better performance
CREATE INDEX idx_expense_user ON expense(user_id);
CREATE INDEX idx_expense_trip ON expense(trip_id);
CREATE INDEX idx_trip_user ON trip(user_id);
CREATE INDEX idx_trip_approver ON trip(approver_id);
CREATE INDEX idx_user_type ON user(user_type);