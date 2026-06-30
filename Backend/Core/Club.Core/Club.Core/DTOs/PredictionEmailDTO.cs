namespace Club.Core.DTOs
{
    public class PredictionEmailDTO
    {
        public int PredictionID { get; set; }

        public int UserID { get; set; }

        public string UserName { get; set; } = "";

        public string Email { get; set; } = "";

        public int MatchID { get; set; }

        public string HomeTeam { get; set; } = "";

        public string AwayTeam { get; set; } = "";

        public int HomeScore { get; set; }

        public int AwayScore { get; set; }

        public int HomePenalty { get; set; }

        public int AwayPenalty { get; set; }

        public string Winner { get; set; } = "";

        public string MatchDate { get; set; } = "";

        public string MatchType { get; set; } = "";

        public DateTime CreatedDate { get; set; }
    }
}
