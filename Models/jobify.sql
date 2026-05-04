-- ============================================================
--  Jobify Database Schema  (Corrected v2)
--  Fixes applied:
--    #1  Booth_Queues & Chat_Sessions: student_id -> applicant_id
--    #2  Resumes: student_id -> applicant_id
--    #3  Digital_Drops: student_id -> applicant_id
--    #4  Added Applicant_Skills (replaces Student_Skills)
--    #5  UNIQUE constraint on Booth_Queues(booth_id, applicant_id)
--    #6  UNIQUE constraint on Chat_Sessions(booth_id, applicant_id)
--    #7  UNIQUE constraint on Student_Ratings & Recruiter_Ratings
--    #8  Payments.booth_id made nullable (payment can precede booth)
--    #9  Notifications.is_read added
--   #10  Blacklists comment: only student/alumni/recruiter can be blocked
--   #11  Complaints linked to chat_session_id (nullable)
--   #12  Student_Skills renamed to Applicant_Skills
-- ============================================================

CREATE DATABASE IF NOT EXISTS jobify;
USE jobify;

-- ============================================================
-- 1. CORE USER ENTITIES
-- ============================================================

CREATE TABLE Users (
    user_id              INT          PRIMARY KEY AUTO_INCREMENT,
    name                 VARCHAR(255) NOT NULL,
    email                VARCHAR(255) UNIQUE NOT NULL,
    password             VARCHAR(255) NOT NULL,
    status               ENUM('active', 'inactive', 'blacklisted') DEFAULT 'active',
    role                 ENUM('student', 'recruiter', 'alumni', 'university_admin') NOT NULL,
    account_creation_date DATETIME    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Companies (
    company_id   INT          PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    industry     VARCHAR(255),
    logo_path    VARCHAR(255)
);

-- Sub-types of User (ISA hierarchy)

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    gpa        DECIMAL(3,2),
    major      VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Alumni (
    alumni_id       INT PRIMARY KEY,
    gpa             DECIMAL(3,2),
    major           VARCHAR(255),
    graduation_year YEAR,
    FOREIGN KEY (alumni_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Recruiters (
    recruiter_id INT NOT NULL PRIMARY KEY,
    company_id   INT NOT NULL,
    FOREIGN KEY (recruiter_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id)   REFERENCES Companies(company_id) ON DELETE CASCADE
);

CREATE TABLE University_Admins (
    university_admin_id INT PRIMARY KEY,
    FOREIGN KEY (university_admin_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ============================================================
-- 2. SKILLS
--    FIX #4 & #12 — Renamed from Student_Skills to Applicant_Skills
--    and references Users(user_id) scoped to role IN ('student','alumni')
-- ============================================================

CREATE TABLE Applicant_Skills (
    -- applicant_id must belong to a user whose role is 'student' or 'alumni'
    -- Enforced at application level (no native ENUM check on FK in MySQL)
    applicant_id INT          NOT NULL,
    skill        VARCHAR(100) NOT NULL,
    PRIMARY KEY (applicant_id, skill),
    FOREIGN KEY (applicant_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ============================================================
-- 3. ADMINISTRATIVE ENTITIES
-- ============================================================

CREATE TABLE Blacklists (
    blacklist_id INT      PRIMARY KEY AUTO_INCREMENT,
    -- FIX #10 — Only students, alumni, or recruiters should be blocked.
    -- Enforce role check at the application level before inserting.
    user_id      INT      NOT NULL COMMENT 'Must be role: student | alumni | recruiter',
    admin_id     INT      NOT NULL,
    reason       TEXT,
    is_active    BOOLEAN  DEFAULT TRUE,
    blocked_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES Users(user_id)                             ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES University_Admins(university_admin_id)     ON DELETE CASCADE
);

-- ============================================================
-- 4. VIRTUAL FAIR ENTITIES
-- ============================================================

CREATE TABLE Fairs (
    fair_id     INT          PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    max_booths  INT,
    start_date  DATETIME,
    end_date    DATETIME,
    created_by  INT,
    created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES University_Admins(university_admin_id) ON DELETE SET NULL
);

CREATE TABLE Booths (
    booth_id     INT                              PRIMARY KEY AUTO_INCREMENT,
    fair_id      INT                              NOT NULL,
    recruiter_id INT                              NOT NULL,
    status       ENUM('open', 'closed', 'full')  DEFAULT 'open',
    max_capacity INT,
    start_time   DATETIME,
    end_time     DATETIME,
    FOREIGN KEY (fair_id)      REFERENCES Fairs(fair_id)              ON DELETE CASCADE,
    FOREIGN KEY (recruiter_id) REFERENCES Recruiters(recruiter_id)    ON DELETE CASCADE
);

-- FIX #1 — student_id → applicant_id  (Alumni can now join queues)
-- FIX #5 — UNIQUE prevents duplicate queue entries for same applicant+booth
CREATE TABLE Booth_Queues (
    queue_id     INT                                         PRIMARY KEY AUTO_INCREMENT,
    booth_id     INT                                         NOT NULL,
    -- applicant_id: role must be 'student' or 'alumni' (enforced in app)
    applicant_id INT                                         NOT NULL COMMENT 'Must be role: student | alumni',
    status       ENUM('waiting', 'joined_chat', 'left')     DEFAULT 'waiting',
    joined_at    DATETIME                                    DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_booth_applicant (booth_id, applicant_id),
    FOREIGN KEY (booth_id)     REFERENCES Booths(booth_id)     ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES Users(user_id)       ON DELETE CASCADE
);

-- ============================================================
-- 5. CHAT & COMMUNICATION
-- ============================================================

-- FIX #1 — student_id → applicant_id  (Alumni can now chat)
-- FIX #6 — UNIQUE prevents multiple active sessions for same applicant+booth
CREATE TABLE Chat_Sessions (
    chat_session_id INT                                  PRIMARY KEY AUTO_INCREMENT,
    booth_id        INT                                  NOT NULL,
    -- applicant_id: role must be 'student' or 'alumni' (enforced in app)
    applicant_id    INT                                  NOT NULL COMMENT 'Must be role: student | alumni',
    status          ENUM('active', 'ended', 'waiting')  DEFAULT 'waiting',
    start_time      DATETIME,
    end_time        DATETIME,
    UNIQUE KEY uq_active_chat (booth_id, applicant_id),
    FOREIGN KEY (booth_id)     REFERENCES Booths(booth_id)  ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES Users(user_id)    ON DELETE CASCADE
);

CREATE TABLE Messages (
    message_id      INT                                     PRIMARY KEY AUTO_INCREMENT,
    chat_session_id INT                                     NOT NULL,
    sender_id       INT                                     NOT NULL,
    message         TEXT                                    NOT NULL,
    status          ENUM('sent', 'delivered', 'read')       DEFAULT 'sent',
    sent_at         DATETIME                                DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_session_id) REFERENCES Chat_Sessions(chat_session_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id)       REFERENCES Users(user_id)                 ON DELETE CASCADE
);

-- ============================================================
-- 6. FILES & RESUMES
-- ============================================================

-- FIX #2 — student_id → applicant_id  (Alumni can now upload resumes)
CREATE TABLE Resumes (
    resume_id    INT          PRIMARY KEY AUTO_INCREMENT,
    -- applicant_id: role must be 'student' or 'alumni' (enforced in app)
    applicant_id INT          NOT NULL COMMENT 'Must be role: student | alumni',
    version_name VARCHAR(255),
    file_size    INT,
    file_path    VARCHAR(255) NOT NULL,
    uploaded_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (applicant_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- FIX #3 — student_id → applicant_id  (Alumni can now drop resumes)
CREATE TABLE Digital_Drops (
    drop_id      INT      PRIMARY KEY AUTO_INCREMENT,
    booth_id     INT      NOT NULL,
    -- applicant_id: role must be 'student' or 'alumni' (enforced in app)
    applicant_id INT      NOT NULL COMMENT 'Must be role: student | alumni',
    resume_id    INT      NOT NULL,
    drop_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booth_id)     REFERENCES Booths(booth_id)    ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES Users(user_id)      ON DELETE CASCADE,
    FOREIGN KEY (resume_id)    REFERENCES Resumes(resume_id)  ON DELETE CASCADE
);

-- ============================================================
-- 7. RATINGS
-- ============================================================

-- FIX #7 — UNIQUE on chat_session_id prevents duplicate ratings
CREATE TABLE Student_Ratings (
    student_rating_id    INT PRIMARY KEY AUTO_INCREMENT,
    chat_session_id      INT NOT NULL,
    recruiter_helpfulness INT CHECK (recruiter_helpfulness BETWEEN 1 AND 5),
    recruiter_clarity     INT CHECK (recruiter_clarity     BETWEEN 1 AND 5),
    recruiter_friendliness INT CHECK (recruiter_friendliness BETWEEN 1 AND 5),
    UNIQUE KEY uq_student_rating_session (chat_session_id),
    FOREIGN KEY (chat_session_id) REFERENCES Chat_Sessions(chat_session_id) ON DELETE CASCADE
);

-- FIX #7 — UNIQUE on chat_session_id prevents duplicate ratings
CREATE TABLE Recruiter_Ratings (
    recruiter_rating_id         INT     PRIMARY KEY AUTO_INCREMENT,
    chat_session_id             INT     NOT NULL,
    is_flagged_as_high_priority BOOLEAN DEFAULT FALSE,
    notes                       TEXT,
    technical_score             INT CHECK (technical_score     BETWEEN 1 AND 5),
    communication_score         INT CHECK (communication_score BETWEEN 1 AND 5),
    cultural_score              INT CHECK (cultural_score      BETWEEN 1 AND 5),
    UNIQUE KEY uq_recruiter_rating_session (chat_session_id),
    FOREIGN KEY (chat_session_id) REFERENCES Chat_Sessions(chat_session_id) ON DELETE CASCADE
);

-- ============================================================
-- 8. OPERATIONS
-- ============================================================

-- FIX #8 — booth_id made nullable: a company can pay before a booth is assigned
CREATE TABLE Payments (
    payment_id          INT                                       PRIMARY KEY AUTO_INCREMENT,
    company_id          INT                                       NOT NULL,
    booth_id            INT                                       NULL, -- nullable: booth assigned after payment
    amount              DECIMAL(10,2)                             NOT NULL,
    status              ENUM('pending', 'completed', 'failed')   DEFAULT 'pending',
    paid_at             DATETIME,
    university_admin_id INT,
    FOREIGN KEY (company_id)          REFERENCES Companies(company_id)                         ON DELETE CASCADE,
    FOREIGN KEY (booth_id)            REFERENCES Booths(booth_id)                              ON DELETE SET NULL,
    FOREIGN KEY (university_admin_id) REFERENCES University_Admins(university_admin_id)        ON DELETE SET NULL
);

-- FIX #11 — Added optional chat_session_id so complaints can reference a specific chat
CREATE TABLE Complaints (
    complaint_id        INT                                         PRIMARY KEY AUTO_INCREMENT,
    complainer_id       INT                                         NOT NULL,
    target_user_id      INT,
    university_admin_id INT,
    chat_session_id     INT                                         NULL, -- FIX #11: optional chat reference
    complaint_type      VARCHAR(100),
    description         TEXT                                        NOT NULL,
    status              ENUM('open', 'investigating', 'resolved')  DEFAULT 'open',
    created_at          DATETIME                                    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complainer_id)       REFERENCES Users(user_id)                           ON DELETE CASCADE,
    FOREIGN KEY (target_user_id)      REFERENCES Users(user_id)                           ON DELETE SET NULL,
    FOREIGN KEY (university_admin_id) REFERENCES University_Admins(university_admin_id)   ON DELETE SET NULL,
    FOREIGN KEY (chat_session_id)     REFERENCES Chat_Sessions(chat_session_id)           ON DELETE SET NULL
);

-- FIX #9 — Added is_read flag to track notification read state
CREATE TABLE Notifications (
    notification_id   INT          PRIMARY KEY AUTO_INCREMENT,
    user_id           INT          NOT NULL,
    notification_type VARCHAR(100),
    message           TEXT         NOT NULL,
    is_read           BOOLEAN      DEFAULT FALSE, -- FIX #9
    sent_at           DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
