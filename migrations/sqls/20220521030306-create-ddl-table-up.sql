CREATE TABLE IF NOT EXISTS Users (
    UserId      INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email       VARCHAR(50) NOT NULL UNIQUE,
    username    VARCHAR(50) NOT NULL UNIQUE,
    password    VARCHAR(100),
    DATE_CREATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATE_UPDATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Link_Details (
    LinkId      INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    UserId      INT NOT NULL,
    Long_url    VARCHAR(100),
	Domain		VARCHAR(100),
    Backhalf    VARCHAR(100) UNIQUE,
    Click_count INT DEFAULT 0,
    DATE_CREATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATE_UPDATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS User_Link (
    UserId      INT NOT NULL,
    LinkId      INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (LinkId) REFERENCES Link_Details(LinkId)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS History (
    LogId       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    LinkId      INT NOT NULL,
    DATE_ACCESS TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IP          VARCHAR(20),
    FOREIGN KEY (LinkId) REFERENCES Link_Details(LinkId)
) ENGINE = InnoDB;
