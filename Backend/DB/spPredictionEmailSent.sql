IF EXISTS (SELECT * FROM sys.procedures WHERE Name='spPredictionEmailSent')
BEGIN
    DROP PROCEDURE spPredictionEmailSent;
END
GO

CREATE PROCEDURE spPredictionEmailSent
(
    @MatchID INT
)
AS
BEGIN

    SET NOCOUNT ON;

    UPDATE FIFAPrediction

    SET

        EmailSent=1

    WHERE

        MatchID=@MatchID;

END
GO