    IF EXISTS (SELECT * FROM sys.procedures WHERE Name = 'spPredictionAddUpdate')
    BEGIN
        DROP PROCEDURE spPredictionAddUpdate;
    END
    GO

    CREATE PROCEDURE spPredictionAddUpdate
    (
        @UserID INT,
        @MatchID INT,
        @HomeScore INT,
        @AwayScore INT,
        @Winner NVARCHAR(100),
        @HomeTeam NVARCHAR(100),
        @AwayTeam NVARCHAR(100),
        @HomePenalty INT,
        @AwayPenalty INT,
        @MatchDate NVARCHAR(50),
        @MatchType NVARCHAR(50),
        @Finished NVARCHAR(20)
    )
    AS
    BEGIN

        SET NOCOUNT ON;

        IF EXISTS
        (
            SELECT 1
            FROM FIFAPrediction
            WHERE UserID = @UserID
              AND MatchID = @MatchID
        )
        BEGIN

            UPDATE FIFAPrediction
            SET
                HomeScore = @HomeScore,
                AwayScore = @AwayScore,
                Winner = @Winner,
                 HomeTeam = @HomeTeam,
                    AwayTeam = @AwayTeam,
                    HomePenalty = @HomePenalty,
                        AwayPenalty = @AwayPenalty,
                      MatchDate = @MatchDate,
                    MatchType = @MatchType,
                    Finished = @Finished,
                UpdatedDate = GETDATE()
            WHERE UserID = @UserID
              AND MatchID = @MatchID;

            SELECT
                1 AS Status,
                'Prediction Updated Successfully' AS Message;

        END
        ELSE
        BEGIN

            INSERT INTO FIFAPrediction
            (
                UserID,
                MatchID,
                HomeTeam,
                AwayTeam,   
                HomeScore,
                AwayScore,
                HomePenalty,
                AwayPenalty,
                Winner,
                MatchDate,
    MatchType,
    Finished,
                CreatedDate
            )
            VALUES
            (
                @UserID,
                @MatchID,
                 @HomeTeam,
                @AwayTeam,
                @HomeScore,
                @AwayScore,
                @HomePenalty,
                @AwayPenalty,
                @Winner,
                @MatchDate,
    @MatchType,
    @Finished,
                GETDATE()
            );

            SELECT
                1 AS Status,
                'Prediction Saved Successfully' AS Message;

        END

    END
    GO