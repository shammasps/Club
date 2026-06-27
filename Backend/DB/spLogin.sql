IF EXISTS (SELECT * FROM   sys.procedures WHERE  NAME = 'spLogin')
    BEGIN
        DROP PROCEDURE spLogin;
    END

GO
--exec spLogin 'shammas','a'
CREATE PROCEDURE spLogin

@UserName    VARCHAR (150)
--@Password   VARCHAR (100)
AS
BEGIN
    SELECT UserID,UserName,Email,Mobile,Password,TeamName,ProfileImage
    FROM   Users
    WHERE  UserName = @UserName
    --AND    Password = @Password
    AND    IsActive = 1;
END
