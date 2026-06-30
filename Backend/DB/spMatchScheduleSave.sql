IF EXISTS
(
    SELECT *
    FROM sys.procedures
    WHERE Name='spMatchScheduleSave'
)
DROP PROCEDURE spMatchScheduleSave
GO

CREATE PROCEDURE spMatchScheduleSave
(
    @MatchID INT,

    @HomeTeam NVARCHAR(100),

    @AwayTeam NVARCHAR(100),

    @MatchDate DATETIME,

    @MatchType NVARCHAR(50)
)
AS
BEGIN

SET NOCOUNT ON;

IF EXISTS
(
    SELECT 1
    FROM FIFAMatchSchedule
    WHERE MatchID=@MatchID
)

BEGIN

    UPDATE FIFAMatchSchedule

    SET

        HomeTeam=@HomeTeam,

        AwayTeam=@AwayTeam,

        MatchDate=@MatchDate,

        MatchType=@MatchType

    WHERE MatchID=@MatchID;

END

ELSE

BEGIN

    INSERT INTO FIFAMatchSchedule
    (
        MatchID,

        HomeTeam,

        AwayTeam,

        MatchDate,

        MatchType
    )
    VALUES
    (
        @MatchID,

        @HomeTeam,

        @AwayTeam,

        @MatchDate,

        @MatchType
    );

END

END
GO