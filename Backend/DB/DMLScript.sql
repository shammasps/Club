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
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'TeamName'AND Object_ID = Object_ID('Users'))
BEGIN
    ALTER TABLE Users
    ADD TeamName VARCHAR(100);
END
GO

IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'ProfileImage' AND Object_ID = Object_ID('Users'))
BEGIN
    ALTER TABLE Users
    ADD ProfileImage NVARCHAR(MAX);
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'FIFAPrediction')
BEGIN

  CREATE TABLE FIFAPrediction
(
    PredictionID INT IDENTITY(1,1) PRIMARY KEY,

    UserID INT NOT NULL,

    MatchID INT NOT NULL,

    HomeScore INT NOT NULL,

    AwayScore INT NOT NULL,

    Winner NVARCHAR(100) NOT NULL,

    CreatedDate DATETIME DEFAULT(GETDATE()),

    UpdatedDate DATETIME NULL
)

END
GO

IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'HomeTeam' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD HomeTeam NVARCHAR(100);
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'AwayTeam' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD AwayTeam NVARCHAR(100);
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'MatchDate' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD MatchDate NVARCHAR(100);
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'MatchType' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD MatchType NVARCHAR(100);
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'Finished' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD Finished NVARCHAR(100);
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'Points' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD Points INT DEFAULT 0;
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'IsEvaluated' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD IsEvaluated BIT DEFAULT 0;
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'WrongPrediction' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD WrongPrediction INT DEFAULT 0;
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'CorrectPrediction' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD CorrectPrediction INT DEFAULT 0;
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'HomePenalty' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD HomePenalty INT NULL
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'AwayPenalty' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD AwayPenalty INT NULL;
END
GO
IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = 'EmailSent' AND Object_ID = Object_ID('FIFAPrediction'))
BEGIN
    ALTER TABLE FIFAPrediction
    ADD EmailSent BIT NOT NULL DEFAULT(0);
END
GO



IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'FIFAMatchSchedule')
BEGIN
CREATE TABLE FIFAMatchSchedule
(
    MatchID INT PRIMARY KEY,

    HomeTeam NVARCHAR(100),

    AwayTeam NVARCHAR(100),

    MatchDate DATETIME,

    MatchType NVARCHAR(50),

    EmailSent BIT DEFAULT 0,

    CreatedDate DATETIME DEFAULT GETDATE()
)
END
GO
--IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'FIFAPredictionEmailLog')
--BEGIN
--CREATE TABLE FIFAPredictionEmailLog
--(
--    MatchID INT PRIMARY KEY,
--    EmailSent BIT NOT NULL DEFAULT(0),
--    SentDate DATETIME NULL
--);
--END
--GO