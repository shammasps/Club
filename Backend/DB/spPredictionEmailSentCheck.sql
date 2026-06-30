IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spPredictionEmailSentCheck')
BEGIN
    DROP PROCEDURE spPredictionEmailSentCheck;
END
GO

CREATE PROCEDURE spPredictionEmailSentCheck
(
    @MatchID INT
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT EmailSent
    FROM FIFAPredictionEmailLog
    WHERE MatchID=@MatchID;

END
GO