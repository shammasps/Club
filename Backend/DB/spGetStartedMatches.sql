IF EXISTS (SELECT * FROM sys.procedures WHERE Name='spGetStartedMatches')
DROP PROCEDURE spGetStartedMatches
GO

CREATE PROCEDURE spGetStartedMatches
AS
BEGIN

SET NOCOUNT ON;

SELECT

    S.MatchID,

    S.HomeTeam,

    S.AwayTeam,

    S.MatchDate,

    S.MatchType,

    COUNT(P.PredictionID) PredictionCount

FROM FIFAMatchSchedule S

INNER JOIN FIFAPrediction P
ON S.MatchID=P.MatchID

WHERE

    S.MatchDate <= GETDATE()

    AND P.EmailSent = 0

GROUP BY

    S.MatchID,

    S.HomeTeam,

    S.AwayTeam,

    S.MatchDate,

    S.MatchType

ORDER BY

    S.MatchDate DESC

END
GO