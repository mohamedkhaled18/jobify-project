create database jobify;

use jobify;


CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive', 'blacklisted') DEFAULT 'active',
    role ENUM('student', 'recruiter', 'alumni', 'university_admin') NOT NULL,
    account_creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Companies (
    company_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    logo_path VARCHAR(255)
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    gpa DECIMAL(3,2),
    major VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Student_Skills (
    student_id INT,
    skill VARCHAR(100),
    PRIMARY KEY (student_id, skill),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

CREATE TABLE Recruiters (
    recruiter_id INT PRIMARY KEY,
    company_id INT NOT NULL, -- ADDED: Link to Company table
    FOREIGN KEY (recruiter_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id) ON DELETE CASCADE
);

CREATE TABLE Alumni (
    alumni_id INT PRIMARY KEY,
    gpa DECIMAL(3,2),
    major VARCHAR(255),
    graduation_year YEAR,
    FOREIGN KEY (alumni_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE University_Admins (
    university_admin_id INT PRIMARY KEY,
    FOREIGN KEY (university_admin_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 3. ADMINISTRATIVE ENTITIES
CREATE TABLE Blacklists (
    blacklist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    admin_id INT NOT NULL,
    reason TEXT,
    is_active BOOLEAN DEFAULT TRUE, -- ADDED: Allow lifting bans without losing history
    blocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES University_Admins(university_admin_id) ON DELETE CASCADE
);

-- 4. VIRTUAL FAIR ENTITIES
CREATE TABLE Fairs (
    fair_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    max_booths INT,
    start_date DATETIME,
    end_date DATETIME,
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES University_Admins(university_admin_id) ON DELETE SET NULL
);

CREATE TABLE Booths (
    booth_id INT PRIMARY KEY AUTO_INCREMENT,
    fair_id INT NOT NULL,
    recruiter_id INT NOT NULL,
    status ENUM('open', 'closed', 'full') DEFAULT 'open',
    max_capacity INT,
    start_time DATETIME,
    end_time DATETIME,
    FOREIGN KEY (fair_id) REFERENCES Fairs(fair_id) ON DELETE CASCADE,
    FOREIGN KEY (recruiter_id) REFERENCES Recruiters(recruiter_id) ON DELETE CASCADE
);

-- ADDED: Manage the waiting room/queue for a booth
CREATE TABLE Booth_Queues (
    queue_id INT PRIMARY KEY AUTO_INCREMENT,
    booth_id INT NOT NULL,
    student_id INT NOT NULL,
    status ENUM('waiting', 'joined_chat', 'left') DEFAULT 'waiting',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booth_id) REFERENCES Booths(booth_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

-- 5. CHAT & COMMUNICATION
CREATE TABLE Chat_Sessions (
    chat_session_id INT PRIMARY KEY AUTO_INCREMENT,
    booth_id INT NOT NULL,
    student_id INT NOT NULL,
    status ENUM('active', 'ended', 'waiting') DEFAULT 'waiting',
    start_time DATETIME,
    end_time DATETIME,
    FOREIGN KEY (booth_id) REFERENCES Booths(booth_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_session_id INT NOT NULL,
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_session_id) REFERENCES Chat_Sessions(chat_session_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 6. FILES & RESUMES
CREATE TABLE Resumes (
    resume_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    version_name VARCHAR(255),
    file_size INT,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ADDED
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

CREATE TABLE Digital_Drops (
    drop_id INT PRIMARY KEY AUTO_INCREMENT,
    booth_id INT NOT NULL, -- CHANGED: Linked to booth instead of chat session
    student_id INT NOT NULL,
    resume_id INT NOT NULL,
    drop_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booth_id) REFERENCES Booths(booth_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES Resumes(resume_id) ON DELETE CASCADE
);

-- 7. RATINGS
CREATE TABLE Student_Ratings (
    student_rating_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_session_id INT NOT NULL,
    recruiter_helpfulness INT CHECK(recruiter_helpfulness BETWEEN 1 AND 5),
    recruiter_clarity INT CHECK(recruiter_clarity BETWEEN 1 AND 5),
    recruiter_friendliness INT CHECK(recruiter_friendliness BETWEEN 1 AND 5),
    FOREIGN KEY (chat_session_id) REFERENCES Chat_Sessions(chat_session_id) ON DELETE CASCADE
);

CREATE TABLE Recruiter_Ratings (
    recruiter_rating_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_session_id INT NOT NULL,
    is_flagged_as_high_priority BOOLEAN DEFAULT FALSE,
    notes TEXT,
    technical_score INT CHECK(technical_score BETWEEN 1 AND 5),
    communication_score INT CHECK(communication_score BETWEEN 1 AND 5),
    cultural_score INT CHECK(cultural_score BETWEEN 1 AND 5),
    FOREIGN KEY (chat_session_id) REFERENCES Chat_Sessions(chat_session_id) ON DELETE CASCADE
);

-- 8. OPERATIONS
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL, -- CHANGED: Companies make payments
    booth_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    paid_at DATETIME,
    university_admin_id INT,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id) ON DELETE CASCADE,
    FOREIGN KEY (booth_id) REFERENCES Booths(booth_id) ON DELETE CASCADE,
    FOREIGN KEY (university_admin_id) REFERENCES University_Admins(university_admin_id) ON DELETE SET NULL
);

CREATE TABLE Complaints (
    complaint_id INT PRIMARY KEY AUTO_INCREMENT,
    complainer_id INT NOT NULL,
    target_user_id INT, -- ADDED: The user the complaint is about (optional)
    university_admin_id INT,
    complaint_type VARCHAR(100),
    description TEXT NOT NULL,
    status ENUM('open', 'investigating', 'resolved') DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complainer_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (target_user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (university_admin_id) REFERENCES University_Admins(university_admin_id) ON DELETE SET NULL
);

CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    notification_type VARCHAR(100),
    message TEXT NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
