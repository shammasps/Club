namespace Club.Core.DTOs
{
    public class UpdateProfileDTO
    {
        public int UserID { get; set; }

        public string UserName { get; set; } = "";

        public string TeamName { get; set; } = "";

        public string ProfileImage { get; set; } = "";
    }
}
