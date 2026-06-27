IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spProfileUpdate')
BEGIN
    DROP PROCEDURE spProfileUpdate;
END
GO

CREATE PROCEDURE spProfileUpdate

@UserID INT,
@UserName VARCHAR(100),
@TeamName VARCHAR(100),
@ProfileImage NVARCHAR(MAX)

AS
BEGIN

    UPDATE Users

    SET

        UserName = @UserName,
        TeamName = @TeamName,
        ProfileImage = @ProfileImage

    WHERE UserID = @UserID;

    SELECT

        1 AS Status,
        'Profile Updated Successfully' AS Message;

END
GO