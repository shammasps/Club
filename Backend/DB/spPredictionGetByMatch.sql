IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spPredictionGetByMatch')
BEGIN
    DROP PROCEDURE spPredictionGetByMatch;
END
GO

CREATE PROCEDURE spPredictionGetByMatch
(
    @MatchID INT
)
AS
BEGIN
    SET NOCOUNT ON;

    
    SET NOCOUNT ON;

    SELECT

        P.PredictionID,

        U.UserID,

        U.UserName,

        U.Email,

        P.MatchID,

        P.HomeTeam,

        P.AwayTeam,

        P.HomeScore,

        P.AwayScore,

        P.HomePenalty,

        P.AwayPenalty,

        P.Winner,

        P.MatchDate,

        P.MatchType,

        P.CreatedDate

    FROM FIFAPrediction P

    INNER JOIN Users U

        ON U.UserID=P.UserID

    WHERE

        P.MatchID=@MatchID

    ORDER BY

        U.UserName;
END
GO