namespace Club.Core.DTOs
{
    public class StartedMatchDTO
    {
        public int MatchID { get; set; }

        public string HomeTeam { get; set; } = "";

        public string AwayTeam { get; set; } = "";

        public DateTime MatchDate { get; set; }

        public string MatchType { get; set; } = "";

        public int PredictionCount { get; set; }
    }
}
