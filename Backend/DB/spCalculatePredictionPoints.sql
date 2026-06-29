IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spCalculatePredictionPoints')
BEGIN
    DROP PROCEDURE spCalculatePredictionPoints;
END
GO

CREATE PROCEDURE spCalculatePredictionPoints

@MatchID INT,
@HomeScore INT,
@AwayScore INT,
@Winner NVARCHAR(100)

AS
BEGIN

   SET NOCOUNT ON;

      UPDATE FIFAPrediction
    SET

        Points =
        CASE
            WHEN HomeScore = @HomeScore
             AND AwayScore = @AwayScore
            THEN 5

            WHEN Winner = @Winner
            THEN 3

            ELSE 0
        END,
        CorrectPrediction = CASE WHEN HomeScore = @HomeScore AND AwayScore = @AwayScore THEN 1 WHEN Winner = @Winner THEN 1 ELSE 0 END, 
        WrongPrediction = CASE WHEN HomeScore = @HomeScore AND AwayScore = @AwayScore THEN 0 WHEN Winner = @Winner THEN 0 ELSE 1 END,
        IsEvaluated = 1,UpdatedDate = GETDATE()

    WHERE MatchID = @MatchID
      AND ISNULL(IsEvaluated,0)=0;

END
GO