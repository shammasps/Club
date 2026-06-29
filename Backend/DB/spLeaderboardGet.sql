IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spLeaderboardGet')
BEGIN
    DROP PROCEDURE spLeaderboardGet;
END
GO

CREATE PROCEDURE spLeaderboardGet
AS
BEGIN

    SET NOCOUNT ON;

    SELECT

        ROW_NUMBER() OVER
        (
            ORDER BY ISNULL(SUM(P.Points),0) DESC
        ) AS Rank,

        U.UserID,

        U.UserName,

        ISNULL(SUM(P.Points),0) AS TotalPoints,

        ISNULL(SUM(P.CorrectPrediction),0) AS CorrectPrediction,

        ISNULL(SUM(P.WrongPrediction),0) AS WrongPrediction

    FROM Users U

    LEFT JOIN FIFAPrediction P

        ON U.UserID = P.UserID

    GROUP BY

        U.UserID,
        U.UserName
        --U.ProfileImage,
        --U.TeamName

    ORDER BY TotalPoints DESC;

END
GO