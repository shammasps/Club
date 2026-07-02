namespace Club.Core.DTOs
{
    public class LeaderboardDTO
    {
        public int Rank { get; set; }

        public int UserID { get; set; }

        public string? UserName { get; set; }

        public string ProfileImage { get; set; } = "";
        public int TotalPoints { get; set; }
        public int CorrectPrediction { get; set; }

        public int WrongPrediction { get; set; }

    }
}
