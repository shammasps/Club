namespace Club.Core.DTOs
{
    public class MatchScheduleDTO
    {
        public int MatchID { get; set; }

        public string HomeTeam { get; set; } = "";

        public string AwayTeam { get; set; } = "";

        public DateTime MatchDate { get; set; }

        public string MatchType { get; set; } = "";
    }
}
