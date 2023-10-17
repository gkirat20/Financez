CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    mfa_enabled BOOLEAN DEFAULT false,
    account_status VARCHAR(50) DEFAULT 'active',
    date_created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    amount DECIMAL(20,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT current_timestamp,
    description TEXT,
    category VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    country VARCHAR(100),
    phone VARCHAR(15),
    alternate_email VARCHAR(100),
    profile_image_url TEXT,
    bio TEXT,
    last_updated TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    parent_role_id INT REFERENCES roles(id)
);

CREATE TABLE account_roles (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    role_id INT REFERENCES roles(id),
    date_assigned TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE role_permissions (
    id SERIAL PRIMARY KEY,
    role_id INT REFERENCES roles(id),
    permission_id INT REFERENCES permissions(id)
);

CREATE TABLE data_listings (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_posted TIMESTAMP DEFAULT current_timestamp,
    price DECIMAL(20,2),
    version DECIMAL(5,2) DEFAULT 1.0,
    license_type VARCHAR(50),
    data_format VARCHAR(50),
    is_public BOOLEAN DEFAULT false
);

CREATE TABLE collaborations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    leader_id INT REFERENCES accounts(id),
    status VARCHAR(50) DEFAULT 'ongoing',
    visibility VARCHAR(50) DEFAULT 'public'
);

CREATE TABLE collaboration_members (
    id SERIAL PRIMARY KEY,
    collaboration_id INT REFERENCES collaborations(id),
    account_id INT REFERENCES accounts(id),
    joined_date TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE collaboration_files (
    id SERIAL PRIMARY KEY,
    collaboration_id INT REFERENCES collaborations(id),
    file_url TEXT,
    description TEXT,
    uploaded_date TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    content TEXT NOT NULL,
    type VARCHAR(50),
    source VARCHAR(50),
    date_sent TIMESTAMP DEFAULT current_timestamp,
    is_read BOOLEAN DEFAULT false
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    activity TEXT NOT NULL,
    type VARCHAR(50),
    ip_address VARCHAR(50),
    date_logged TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE data_insights (
    id SERIAL PRIMARY KEY,
    data_listing_id INT REFERENCES data_listings(id),
    insight TEXT NOT NULL,
    analysis_type VARCHAR(100),
    visual_url TEXT,
    date_generated TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES accounts(id),
    receiver_id INT REFERENCES accounts(id),
    content TEXT NOT NULL,
    date_sent TIMESTAMP DEFAULT current_timestamp,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    status VARCHAR(50) DEFAULT 'pending',
    category VARCHAR(50)
);
