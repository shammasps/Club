IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spProfileGet')
BEGIN
    DROP PROCEDURE spProfileGet;
END
GO

CREATE PROCEDURE spProfileGet

@UserID INT

AS
BEGIN

    SELECT

        UserID,
        UserName,
        Email,
        TeamName,
        ProfileImage

    FROM Users

    WHERE UserID = @UserID;

END
GO