CREATE TABLE students_rfid (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rfid VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 1. student_info table with a foreign key reference to students table
CREATE TABLE student_info (
    info_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    dob DATE,
    gender CHAR(1) CHECK (gender IN ('M', 'F')),
    nationality VARCHAR(50),
    UNIQUE(student_id)
);

-- 2. student_contact table linked to student_info
CREATE TABLE student_contact (
    contact_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_info(student_id) ON DELETE CASCADE,
    email VARCHAR(100),
    permanent_address TEXT,
    correspondence_address TEXT,
    emergency_contact_number VARCHAR(15),
    alt_emergency_contact_number VARCHAR(15),
    school_contact_number VARCHAR(15),
    mode_of_transportation VARCHAR(50),
    preferred_language VARCHAR(50)
);


-- 3. student_parent_details table linked to student_info
CREATE TABLE student_parent_details (
    parent_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_info(student_id) ON DELETE CASCADE,
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    father_occupation VARCHAR(100),
    mother_occupation VARCHAR(100),
    guardian_contact_number VARCHAR(15),
    guardian_occupation VARCHAR(100),
    relation_with_guardian VARCHAR(50),
    parent_contact_number VARCHAR(15),
    alt_parent_contact_number VARCHAR(15),
    parent_email VARCHAR(100),
    relation_with_parent CHAR(1) CHECK (relation_with_parent IN ('F', 'M')),
    parent_address TEXT
);


-- 4. student_medical_info table linked to student_info
CREATE TABLE student_medical_info (
    medical_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_info(student_id) ON DELETE CASCADE,
    blood_group VARCHAR(3),
    physical_disability BOOLEAN DEFAULT FALSE,
    health_issues TEXT,
    allergies TEXT,
    medications TEXT,
    height DECIMAL(5,2), -- Height in cm
    weight DECIMAL(5,2), -- Weight in kg
    has_siblings BOOLEAN DEFAULT FALSE
);


-- 5. student_academic_info table linked to student_info
CREATE TABLE student_academic_info (
    academic_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_info(student_id) ON DELETE CASCADE,
    roll_number VARCHAR(20) UNIQUE,
    current_standard VARCHAR(10),
    section VARCHAR(10),
    enrollment_date DATE,
    registration_number VARCHAR(20) UNIQUE,
    previous_school_name VARCHAR(100),
    academic_performance VARCHAR(20),
    scholarship_status VARCHAR(50),
    extracurriculars TEXT
);


-- 6. student_photo table linked to student_info
CREATE TABLE student_photo (
    photo_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_info(student_id) ON DELETE CASCADE,
    photo BYTEA
);
