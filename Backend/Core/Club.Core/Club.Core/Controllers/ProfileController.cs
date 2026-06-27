using Club.Core.DTOs;
using Club.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Club.Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileRepository _repository;

        public ProfileController(ProfileRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("GetProfile/{userId}")]
        public IActionResult GetProfile(int userId)
        {
            try
            {
                DataTable dt = _repository.GetProfile(userId);

                if (dt.Rows.Count == 0)
                {
                    return BadRequest(new
                    {
                        Success = false,
                        Message = "User not found"
                    });
                }

                return Ok(new
                {
                    Success = true,

                    UserID = dt.Rows[0]["UserID"],

                    UserName = dt.Rows[0]["UserName"],

                    Email = dt.Rows[0]["Email"],

                    TeamName = dt.Rows[0]["TeamName"],

                    ProfileImage = dt.Rows[0]["ProfileImage"]
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPost("UpdateProfile")]
        public IActionResult UpdateProfile(UpdateProfileDTO obj)
        {
            try
            {
                DataTable dt = _repository.UpdateProfile(obj);

                return Ok(new
                {
                    Status = Convert.ToInt32(dt.Rows[0]["Status"]),

                    Message = dt.Rows[0]["Message"].ToString()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Status = -1,
                    Message = ex.Message
                });
            }
        }
    }
}
