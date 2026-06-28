IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spPredictionGetByUser')
BEGIN
    DROP PROCEDURE spPredictionGetByUser;
END
GO

CREATE PROCEDURE spPredictionGetByUser

@UserID INT

AS
BEGIN

    SELECT PredictionID,UserID,MatchID,HomeTeam,AwayTeam,HomeScore,AwayScore,Winner,CreatedDate,UpdatedDate,MatchDate,MatchType,Finished

    FROM FIFAPrediction
    WHERE UserID = @UserID

    ORDER BY MatchDate DESC

END
GO