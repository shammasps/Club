namespace Club.Core.DTOs
{
    public class PredictionDTO
    {
        public int PredictionID { get; set; }
        public int UserID { get; set; }

        public int MatchID { get; set; }
        public string HomeTeam { get; set; } = string.Empty;

        public string AwayTeam { get; set; } = string.Empty;

        public int HomeScore { get; set; }

        public int AwayScore { get; set; }

        public string Winner { get; set; } = string.Empty;

        public string MatchDate { get; set; } = string.Empty;

        public string MatchType { get; set; } = string.Empty;

        public string Finished { get; set; } = string.Empty;

        public int HomePenalty { get; set; }

        public int AwayPenalty { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}
