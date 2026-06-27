namespace Club.Core.DTOs
{
    public class LoginDTO
    {
        public string UserName { get; set; } = string.Empty;
        //public string? Email { get; set; }
        //public string? TeamName { get; set; }
        //public string? ProfileImage { get; set; }
        public string Password { get; set; } = string.Empty;
    }
}
