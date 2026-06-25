IF EXISTS (SELECT * FROM   sys.procedures WHERE  NAME = 'spRegister')
    BEGIN
        DROP PROCEDURE spRegister;
    END

GO
CREATE PROCEDURE spRegister

@UserName   VARCHAR (100),
@Email      VARCHAR (150),
@Password   VARCHAR (100),
@Mobile     VARCHAR (20)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        SELECT 0 AS Status,'Email already exists' AS Message
        RETURN;
    END

    IF EXISTS(SELECT 1 FROM Users WHERE Mobile = @Mobile)
    BEGIN
        SELECT 0 AS Status,'Mobile already exists' AS Message
        RETURN;
    END

    IF EXISTS ( SELECT 1 FROM Users WHERE UserName = @UserName)
    BEGIN
        SELECT 0 AS Status,'Username already exists' AS Message
        RETURN;
    END

    INSERT  INTO Users (UserName, Email, Password, Mobile)
    VALUES   (@UserName, @Email, @Password, @Mobile);
    SELECT 1 AS Status,'Registration Successful' AS Message;
END
GO
