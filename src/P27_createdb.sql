create database p27_groundbookingapp;
use p27_groundbookingapp;

CREATE TABLE City (
    cId INT PRIMARY KEY AUTO_INCREMENT,
    cName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Roles (
    rId INT PRIMARY KEY AUTO_INCREMENT,
    rName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Sport (
    sId INT PRIMARY KEY AUTO_INCREMENT,
    sName VARCHAR(100) NOT NULL UNIQUE,
    sRate DECIMAL(10, 2) NOT NULL CHECK (sRate > 0)
);

CREATE TABLE Users (
    uId INT PRIMARY KEY AUTO_INCREMENT,
    rId INT NOT NULL,
    uName VARCHAR(100) NOT NULL,
    uPhoneNo VARCHAR(15) NOT NULL,
    aadhar VARCHAR(12) NOT NULL UNIQUE,
    uAddress TEXT NOT NULL,
    cId INT NOT NULL,
    email VARCHAR(50) UNIQUE,
    username VARCHAR(50) UNIQUE,
    passwords VARCHAR(255) NOT NULL,
    FOREIGN KEY (rId) REFERENCES Roles(rId),
    FOREIGN KEY (cId) REFERENCES City(cId)
);

CREATE TABLE Ground (
    gId INT PRIMARY KEY AUTO_INCREMENT,
    gName VARCHAR(100) NOT NULL,
    gDescription TEXT NOT NULL,
    address TEXT NOT NULL,
    cId INT NOT NULL,
    uId INT NOT NULL,
    sId INT NOT NULL,
    gStatus ENUM('Active', 'Inactive', 'Blocked') DEFAULT 'Active',
    gImages TEXT NOT NULL, -- This could store a comma-separated list of image URLs or paths
    FOREIGN KEY (cId) REFERENCES City(cId),
    FOREIGN KEY (uId) REFERENCES Users(uId),
    FOREIGN KEY (sId) REFERENCES Sport(sId)
);

CREATE TABLE Request (
    rqId INT PRIMARY KEY AUTO_INCREMENT,
    uId INT NOT NULL, 
    gId INT NOT NULL,
    rqDateTime DATETIME,
    rqStatus ENUM('Approved', 'Pending', 'Denied') DEFAULT 'Pending',
    FOREIGN KEY (uId) REFERENCES Users(uId), 
    FOREIGN KEY (gId) REFERENCES Ground(gId)
);

CREATE TABLE Booking (
    bId INT PRIMARY KEY AUTO_INCREMENT,
    uId INT NOT NULL,
    gId INT NOT NULL,
    bDateTime DATE NOT NULL, -- Assuming this is just the date
    timeFrom TIME NOT NULL,
    timeTo TIME NOT NULL,
    bAmt DECIMAL(10, 2) NOT NULL CHECK (bAmt > 0.0),
    FOREIGN KEY (uId) REFERENCES Users(uId),
    FOREIGN KEY (gId) REFERENCES Ground(gId),
    CHECK (timeTo > timeFrom)
);

CREATE TABLE Feedback (
    fId INT PRIMARY KEY AUTO_INCREMENT,
    uId INT NOT NULL,
    bId INT NOT NULL,
    fText TEXT,
    fRating INT NOT NULL,
    fDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uId) REFERENCES Users(uId),
    FOREIGN KEY (bId) REFERENCES Booking(bId),
    CHECK (fRating BETWEEN 1 AND 5)
);

CREATE TABLE Queries (
    qId INT PRIMARY KEY AUTO_INCREMENT,
    bId INT, -- Allowing NULL as a query might not always be related to a specific booking
    qType VARCHAR(50) NOT NULL,
    qText TEXT NOT NULL,
    qDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    qStatus ENUM('New', 'In Progress', 'Resolved') DEFAULT 'New',
    FOREIGN KEY (bId) REFERENCES Booking(bId)
);

CREATE TABLE QueryAnswer (
    qaId INT PRIMARY KEY AUTO_INCREMENT,
    qId INT NOT NULL,
    uId INT NOT NULL, -- Added uId based on the image, assuming the user who answered the query
    qaAnsText TEXT NOT NULL,
    qaAnsDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (qId) REFERENCES Queries(qId),
    FOREIGN KEY (uId) REFERENCES Users(uId)
);

CREATE TABLE Slots (
    slotId INT PRIMARY KEY AUTO_INCREMENT,
    slotTime TIME NOT NULL UNIQUE
);

