namespace Club.Core.DTOs
{
    public class PredictionPointDTO
    {
        public int MatchID { get; set; }

        public int HomeScore { get; set; }

        public int AwayScore { get; set; }

        public string Winner { get; set; } = "";
    }
}
