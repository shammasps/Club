IF DB_ID('DB_Club') IS NULL
BEGIN
    CREATE DATABASE DB_Club
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN

    CREATE TABLE Users
    (
        UserID INT IDENTITY(1,1) PRIMARY KEY,

        UserName VARCHAR(100) NOT NULL,

        Email VARCHAR(150) NOT NULL,

        Password VARCHAR(100) NOT NULL,

        Mobile VARCHAR(20),

        IsActive BIT DEFAULT 1,

        CreatedDate DATETIME DEFAULT GETDATE()
    )

END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UQ_Users_Email')
BEGIN
    ALTER TABLE Users
    ADD CONSTRAINT UQ_Users_Email UNIQUE (Email);
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UQ_Users_UserName')
BEGIN
    ALTER TABLE Users
    ADD CONSTRAINT UQ_Users_UserName UNIQUE (UserName);
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UQ_Users_Mobile')
BEGIN
    ALTER TABLE Users
    ADD CONSTRAINT UQ_Users_Mobile UNIQUE (Mobile);
END
GO
