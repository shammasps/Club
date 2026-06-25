using Club.Core.DTOs;
using Club.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Club.Core.Helpers;

namespace Club.Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}
        private readonly AuthRepository _repository;

        public AuthController(AuthRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("Register")]
        public IActionResult Register(RegisterDTO obj)
        {
            try
            {
                obj.UserName = obj.UserName.Trim();
                obj.Email = obj.Email.Trim();
                obj.Mobile = obj.Mobile?.Trim();
                obj.Password = obj.Password.Trim();

                obj.Password = PasswordHelper.HashPassword(obj.Password);

                DataTable dt = _repository.Register(obj);

                return Ok(new
                {
                    Status = Convert.ToInt32(dt.Rows[0]["Status"]),
                    Message = dt.Rows[0]["Message"].ToString()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new{Status = -1,Message = ex.Message});
            }
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDTO obj)
        {
            try
            {
                obj.UserName = obj.UserName.Trim();
                obj.Password = obj.Password.Trim();

                DataTable dt = _repository.Login(obj);
                if (dt.Rows.Count == 0 || !PasswordHelper.VerifyPassword(obj.Password, dt.Rows[0]["Password"].ToString()!))
                {
                    return Ok(new
                    {
                        Success = false,
                        UserID = 0,
                        UserName = "",
                        Email = "",
                        Message = "Invalid UserName or Password"
                    });
                }



                return Ok(new
                {
                    Success = true,
                    UserID = dt.Rows[0]["UserID"],
                    UserName = dt.Rows[0]["UserName"],
                    Email = dt.Rows[0]["Email"],
                    Message = "Login Successful"
                });

                //if (dt.Rows.Count == 0)
                //{
                //    return BadRequest(new 
                //    {
                //        Success = false,
                //        Message = "Invalid UserName or Password"
                //    });
                //}

                //return Ok(new
                //{
                //    Success = true,
                //    UserID = dt.Rows[0]["UserID"],
                //    UserName = dt.Rows[0]["UserName"],
                //    Email = dt.Rows[0]["Email"] 
                //});
            }
            catch (Exception ex)
            {
                return BadRequest(new {Success = false,Message = ex.Message});
            }
        }
    }
}
