IF EXISTS (SELECT * FROM sys.procedures WHERE Name='spPredictionEmailStatus')
BEGIN
    DROP PROCEDURE spPredictionEmailStatus;
END
GO

CREATE PROCEDURE spPredictionEmailStatus
(
    @MatchID INT
)
AS
BEGIN

    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM FIFAPrediction
        WHERE MatchID=@MatchID
        AND EmailSent=1
    )
    BEGIN

        SELECT CAST(1 AS BIT) AS EmailSent;

    END
    ELSE
    BEGIN

        SELECT CAST(0 AS BIT) AS EmailSent;

    END

END
GO